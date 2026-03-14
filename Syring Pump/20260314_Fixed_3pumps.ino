//=====================================================
// Independent 3-pump syringe pump control program
// Sub programm of syringe pump
// Electronic for Chemists Project
// ---------------------------------------
// Design by SciencExpert
// Version 5.02– Mars 2026
// Author : Gerard Bacquet
//=====================================================
//
// ___/   SHORT DESCRIPTION   \____________________________________________________________________________
//      Independent 3-pump syringe pump controller
//      Each pump has its own flow rate set individually through the menu.
//      All three run simultaneously until the syringe is empty.
//      Sensor logging via PLX-DAQ to Excel (serial 9600 baud).

// ______________________________/   Libraries \_____________________________________________________________
#include <SPI.h>
#include <AccelStepper.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_PCD8544.h>

// _________________________________________/   Pin Assignments \__________________________________________

// Nokia PCD8544 LCD: CLK=5, DIN=6, DC=7, CE=8, RST=9
Adafruit_PCD8544 display = Adafruit_PCD8544(5, 6, 7, 8, 9);

#define UP     2    // Scroll up / increase value
#define SELECT 3    // Validate selection
#define DOWN   4    // Scroll down / decrease value

#define Sensor0 A0
#define Sensor1 A1
#define Sensor2 A2
#define Sensor3 A3
#define Sensor4 A4
#define Sensor5 A5

// Three pumps on EasyDriver boards, shared DIR pin 9
AccelStepper stepper1(1, 10, 9);  // Pump 1 - STEP=10, DIR=9
AccelStepper stepper2(1, 11, 9);  // Pump 2 - STEP=11, DIR=9
AccelStepper stepper3(1, 12, 9);  // Pump 3 - STEP=12, DIR=9

// ____________________________________________________/   Variables \_______________________________
byte contraste   = 60;      // LCD contrast (0-127, optimum ~60)
byte dualtime    = 255;     // Debounce / inter-action delay (ms)
byte i;                     // General-purpose byte counter
int  j;                     // General-purpose int counter
float x;                    // Temporary sensor voltage
long Vcc         = 5;       // Sensor supply voltage (V)

unsigned long currentTime  = 0;
unsigned long previousTime = 0;
float NbMesure   = 10.0;    // Number of serial measurements per pump cycle

// _______________________________________________________________/   Sensor Data \______________________
float SensorV[6];           // Voltage readings from A0..A5

// Linear conversion: physical_value = a_coef * voltage + b_coef
// Edit these arrays to match your sensor calibration
float a_coef[6] = {1.0, 1.0, 1.0, 1.0, 1.0, 1.0};
float b_coef[6] = {1.0, 2.0, 3.0, 4.0, 5.0, 6.0};

float F_convert(int idx, float volt) {
  return a_coef[idx] * volt + b_coef[idx];
}

char* Data[6]  = {"Temp", "Pot",  "Cond", "Turb", "S4",  "S5"};

// __________________________________________________________________________/   Pump Data \___________
// VPump[0] = reference speed (fastest pump, computed in Run())
// VPump[1..3] = individual pump flow rates set by the user (ml/min)
// VPump[4] = reset speed used when returning to zero
float VPump[5]  = {0.0, 0.0, 0.0, 0.0, 50.0};

// Preset selectable flow rates in ml/min
// Index 7 is modified by Adjust() for fine manual setting
float SelectV[9] = {0, 0.05, 0.1, 0.2, 0.5, 0.75, 1.0, 2.0, 5.0};

// Which pump is currently being configured (1, 2 or 3)
byte Pump_Number = 1;

// Cumulative step target for the reference pump during a run
long  pos0 = 0;

float Delay_Pump;     // Duration of the pump cycle (minutes)
float Delay_Mesure;   // Interval between two serial measurements (ms)
bool  RUN = false;    // True while steppers are running

// __________________________________________________________________________________/   Stepper Motor Data \_
int   gearbox      = 16;      // Gearbox reduction ratio
int   acceleration = 1000000; // Stepper acceleration (steps/s^2)
float V_total      = 19.0;    // Syringe volume (ml)
long  step_Tour    = 1600;    // Steps per motor revolution (set by M1/M2 on EasyDriver)
long  Long_Max     = 60;      // Number of revolutions to empty the syringe
float Rtour_mm     = 1.0 / 16;// mm per motor revolution (lead screw pitch / gearbox)

// Conversion: flow rate (ml/min) -> stepper speed (steps/sec)
long  Conversion   = (long)(step_Tour * Long_Max / (Rtour_mm * V_total * 60.0));

// Maximum step count = full syringe stroke
long  tour_max     = step_Tour * Long_Max / Rtour_mm;

// ___/   Menu Data \________________________________________________________________________________
// Menu levels:
//   0 - Main menu    : select pump 1, 2 or 3; go to recap; run; reset
//   1 - Pump select  : choose which pump to configure
//   2 - Flow rate p1 : preset speeds SelectV[1..4]
//   3 - Flow rate p2 : preset speeds SelectV[5..7] + fine Adjust
//   4 - Recap        : summary of all three pump speeds; launch or return

byte k1_max[] = {5, 5, 5, 4, 5};   // Max selectable item per level
byte k1[5]    = {1, 1, 1, 1, 1};   // Default first selectable item per level
byte Niveau   = 0;                  // Current menu level
byte Choice   = 0;                  // Highlighted item (1-based; 0 = none)

// Pump speed strings updated live via dtostrf when a speed is selected
char spd1[8] = "0.00";  // Display text for pump 1 speed
char spd2[8] = "0.00";  // Display text for pump 2 speed
char spd3[8] = "0.00";  // Display text for pump 3 speed

// Menu text table [level][line]
// Line 0 = title (never highlighted), lines 1..5 = selectable items
char* Txt[5][6] = {
  // Level 0 - main menu
  {"  3-PUMP FIXED", " >Set Pump 1", " >Set Pump 2", " >Set Pump 3", " >Recap/Run", " >Reset"},
  // Level 1 - pump selection (updated dynamically to show current speeds)
  {"SELECT PUMP",    spd1,           spd2,           spd3,           " >Recap",     "Run"},
  // Level 2 - flow rate presets page 1 (SelectV[1..4])
  {"FLOW RATE",      "VAL1",         "VAL2",         "VAL3",         "VAL4",        " >More..."},
  // Level 3 - flow rate presets page 2 (SelectV[5..7]) + fine adjust
  {"FLOW RATE",      "VAL5",         "VAL6",         "VAL7",         " >Adjust",    " <Back"},
  // Level 4 - recap
  {"  RECAP",        spd1,           spd2,           spd3,           " >Run",       " >Menu"}
};

// =====================================================================
//                         DISPLAY HELPERS
// =====================================================================

// Clear display and reset text settings
void format() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(BLACK, WHITE);
  display.setCursor(0, 0);
}

// Change menu level, reset selection index, refresh LCD
// mirrors transit() from original code
void transit(byte a, byte b) {
  Niveau = a;
  k1[Niveau] = 0;
  Choice = b;
  Affiche_menu(Niveau);
  delay(dualtime);
}

// Print 6 menu lines; invert the selected line (white on black)
// mirrors Affiche_menu() from original code
void Affiche_menu(int niv) {
  format();
  for (i = 0; i < 6; i++) {
    if (i == Choice - 1) {
      display.setTextColor(WHITE, BLACK);  // Selected line - inverted
    } else {
      display.setTextColor(BLACK, WHITE);
    }
    display.println(Txt[niv][i]);
  }
  display.display();
}

// =====================================================================
//                         STEPPER HELPERS
// =====================================================================

// Apply VPump[1..3] speeds to steppers and command them toward tour_max
// mirrors Stepper_setting() from original code
void Stepper_setting() {
  stepper1.setMaxSpeed(VPump[1] * Conversion);
  stepper2.setMaxSpeed(VPump[2] * Conversion);
  stepper3.setMaxSpeed(VPump[3] * Conversion);
  stepper1.setAcceleration(acceleration);
  stepper2.setAcceleration(acceleration);
  stepper3.setAcceleration(acceleration);
  stepper1.moveTo(tour_max);
  stepper2.moveTo(tour_max);
  stepper3.moveTo(tour_max);
}

// Advance all three steppers one step and check for emergency stop
// mirrors active() from original code
void active() {
  RUN = true;
  stepper1.run();
  stepper2.run();
  stepper3.run();
  emergency();
}

// =====================================================================
//                         SAFETY
// =====================================================================

// Emergency stop: UP + SELECT pressed simultaneously
// Stops all motors immediately and returns to main menu
void emergency() {
  if (digitalRead(UP) == LOW && digitalRead(SELECT) == HIGH) {
    RUN = false;
    stepper1.stop();
    stepper2.stop();
    stepper3.stop();
    format();
    display.println(F("!! STOP !!"));
    display.println(F("Emergency stop"));
    display.display();
    delay(2000);
    transit(0, 0);
  }
}

// =====================================================================
//                         SENSOR FUNCTIONS
// =====================================================================

// Read the six analog inputs and store voltages in SensorV[]
void lire_capteurs() {
  SensorV[0] = analogRead(A0) * Vcc / 1023.0;
  SensorV[1] = analogRead(A1) * Vcc / 1023.0;
  SensorV[2] = analogRead(A2) * Vcc / 1023.0;
  SensorV[3] = analogRead(A3) * Vcc / 1023.0;
  SensorV[4] = analogRead(A4) * Vcc / 1023.0;
  SensorV[5] = analogRead(A5) * Vcc / 1023.0;
}

// =====================================================================
//                         SERIAL LOGGING  (PLX-DAQ)
// =====================================================================

// Send one CSV measurement row when the interval has elapsed
// mirrors impression() from original code
void impression() {
  currentTime = millis();
  if ((currentTime - previousTime) > Delay_Mesure) {
    previousTime = currentTime;
    lire_capteurs();
    Serial.print(F("DATA,TIME,"));
    Serial.print(VPump[1], 2); Serial.print(",");
    Serial.print(VPump[2], 2); Serial.print(",");
    Serial.print(VPump[3], 2); Serial.print(",");
    for (i = 0; i < 6; i++) {
      x = SensorV[i];
      Serial.print(F_convert(i, x), 2); Serial.print(",");
    }
    Serial.print(Delay_Pump,   2); Serial.print(",");
    Serial.println(Delay_Mesure, 2);
  }
}

// =====================================================================
//                         PUMP UTILITIES
// =====================================================================

// Return all three syringes to their physical zero position
void Return_to_zero() {
  RUN = true;
  format();
  display.println(F("Back to zero"));
  display.display();
  delay(1000);
  for (i = 1; i < 4; i++) VPump[i] = VPump[4];  // set all pumps to reset speed
  Stepper_setting();
  stepper1.moveTo(-stepper1.currentPosition());
  stepper2.moveTo(-stepper2.currentPosition());
  stepper3.moveTo(-stepper3.currentPosition());
  transit(0, 0);
}

// Full software reset: clear all pump speeds and return to main menu
void Reset() {
  RUN = false;
  for (i = 0; i < 4; i++) VPump[i] = 0.0;
  // Reset speed display strings
  strcpy(spd1, "0.00");
  strcpy(spd2, "0.00");
  strcpy(spd3, "0.00");
  format();
  display.println(F("Reset done"));
  display.println(F("Menu in 10s..."));
  display.display();
  delay(10000);
  transit(0, 0);
}

// Fine manual adjustment of SelectV[7] with UP / DOWN
// SELECT confirms; value is saved to the current pump
// mirrors Adjust() from original code
void Adjust() {
  float delta = 0.05;
  for (j = 0; j < 20; j++) {
    delay(dualtime);

    // Auto-scale step to current value range
    if (SelectV[7] <= 0.10 && SelectV[7] >  0.0)  delta = 0.05;
    if (SelectV[7] <= 2.0  && SelectV[7] >  0.1)  delta = 0.1;
    if (SelectV[7] >  2.0  && SelectV[7] < 20.0)  delta = 0.5;

    if (digitalRead(UP) == LOW && digitalRead(DOWN) == HIGH && digitalRead(SELECT) == LOW) {
      j = 0; SelectV[7] -= delta;
    }
    if (digitalRead(UP) == HIGH && digitalRead(DOWN) == LOW && digitalRead(SELECT) == LOW) {
      j = 0; SelectV[7] += delta;
    }

    // Show current value on LCD
    format();
    display.println(F(" Adjust Speed"));
    display.println(F("  UP / DOWN"));
    display.println();
    display.print(F("  <= "));
    display.print(SelectV[7], 2);
    display.println(F(" =>"));
    display.println();
    display.println(F(" Press SELECT"));
    display.display();

    // SELECT pressed: save value to the current pump and go back to menu 1
    if (digitalRead(SELECT) == HIGH) {
      VPump[Pump_Number] = SelectV[7];
      // Update the speed display string for the correct pump
      if (Pump_Number == 1) dtostrf(VPump[1], 4, 2, spd1);
      if (Pump_Number == 2) dtostrf(VPump[2], 4, 2, spd2);
      if (Pump_Number == 3) dtostrf(VPump[3], 4, 2, spd3);
      transit(1, 0);
      j = 20;   // exit loop
    }
  }
}

// =====================================================================
//                         RUN - Fixed independent mode
// =====================================================================
// All three pumps run at their individually set flow rates simultaneously.
// The fastest pump is used as the timing reference.
// Each pump is speed-limited by setMaxSpeed so it delivers the correct
// proportional volume before the reference pump finishes.
// mirrors the Synchro==0 block from original Run()

void Run() {
  format();
  display.println(F("   RUNNING"));
  display.println(F("   pumps"));

  // Find the fastest pump to use as the timing reference
  if (VPump[1] >= VPump[2] && VPump[1] >= VPump[3]) {
    VPump[0] = VPump[1];
  } else if (VPump[2] >= VPump[3]) {
    VPump[0] = VPump[2];
  } else {
    VPump[0] = VPump[3];
  }

  // Calculate run duration and measurement interval
  Delay_Pump   = V_total / VPump[0];                          // minutes
  Delay_Mesure = 1000.0 * 60.0 * Delay_Pump / NbMesure;      // ms
  // Target step count for the reference pump
  pos0 = (long)(Delay_Pump * VPump[0] * step_Tour * Rtour_mm * Long_Max / V_total);

  // Show pump speeds on LCD
  for (i = 1; i < 4; i++) {
    display.print(F("Pump")); display.print(i);
    display.print(F(" => "));
    display.println(VPump[i], 2);
  }
  display.display();

  // Apply speeds to steppers
  Stepper_setting();

  // Run until every pump has reached the reference position
  // Each pump is already limited by setMaxSpeed so they stop naturally
  while (stepper1.currentPosition() <= pos0 ||
         stepper2.currentPosition() <= pos0 ||
         stepper3.currentPosition() <= pos0) {
    active();
    impression();
  }

  // Cycle complete
  RUN = false;
  impression();   // send final measurement row
  format();
  display.println(F("   DONE !"));
  display.print(F("   ")); display.print(V_total, 1);
  display.println(F(" ml done"));
  display.display();
  delay(3000);
  transit(0, 0);
}

// =====================================================================
//                       MENU NAVIGATION
// =====================================================================

// Execute the action linked to the current Niveau / Choice combination
void Programme() {

  // ---- Level 0 : main menu ----
  if (Niveau == 0) {
    if (Choice == 1) { Pump_Number = 1; transit(2, 0); }  // Set Pump 1
    if (Choice == 2) { Pump_Number = 2; transit(2, 0); }  // Set Pump 2
    if (Choice == 3) { Pump_Number = 3; transit(2, 0); }  // Set Pump 3
    if (Choice == 4) { transit(4, 0); }                   // Recap/Run
    if (Choice == 5) { Reset(); }                         // Reset
  }

  // ---- Level 1 : pump selection with live speed display ----
  // Choosing pump 1/2/3 here goes directly to flow rate selection
  if (Niveau == 1) {
    if (Choice == 1) { Pump_Number = 1; transit(2, 0); }
    if (Choice == 2) { Pump_Number = 2; transit(2, 0); }
    if (Choice == 3) { Pump_Number = 3; transit(2, 0); }
    if (Choice == 4) { transit(4, 0); }   // Go to recap
    if (Choice == 5) { Run(); }           // Run immediately
  }

  // ---- Level 2 : flow rate presets page 1 (SelectV[1..4]) ----
  if (Niveau == 2) {
    for (i = 1; i < 5; i++) {
      if (Choice == i) {
        VPump[Pump_Number] = SelectV[i];
        // Update the speed display string for the configured pump
        if (Pump_Number == 1) dtostrf(VPump[1], 4, 2, spd1);
        if (Pump_Number == 2) dtostrf(VPump[2], 4, 2, spd2);
        if (Pump_Number == 3) dtostrf(VPump[3], 4, 2, spd3);
        transit(1, 0);   // return to pump selection to configure next pump
      }
    }
    if (Choice == 5) { transit(3, 0); }   // More values - go to page 2
  }

  // ---- Level 3 : flow rate presets page 2 (SelectV[5..7]) + Adjust ----
  if (Niveau == 3) {
    for (i = 1; i < 4; i++) {
      if (Choice == i) {
        VPump[Pump_Number] = SelectV[i + 4];
        if (Pump_Number == 1) dtostrf(VPump[1], 4, 2, spd1);
        if (Pump_Number == 2) dtostrf(VPump[2], 4, 2, spd2);
        if (Pump_Number == 3) dtostrf(VPump[3], 4, 2, spd3);
        transit(1, 0);
      }
    }
    if (Choice == 4) { Adjust(); }          // Fine manual adjustment
    if (Choice == 5) { transit(2, 0); }     // Back to page 1
  }

  // ---- Level 4 : recap ----
  // Displays all three pump speeds; user launches run or returns to menu
  if (Niveau == 4) {
    if (Choice == 0) { transit(4, 0); }     // Refresh recap
    if (Choice == 4) { Run(); }             // Launch
    if (Choice == 5) { transit(0, 0); }     // Return to main menu
  }
}

// UP / DOWN scroll through items; UP+DOWN+SELECT validates
// mirrors Select_menu() from original code
void Select_menu() {
  if (digitalRead(UP) == LOW && digitalRead(DOWN) == HIGH && digitalRead(SELECT) == LOW) {
    if (Choice >= k1_max[Niveau]) { Choice = k1[Niveau]; }
    else                          { Choice = Choice + 1; }
    Affiche_menu(Niveau);
  }

  if (digitalRead(DOWN) == LOW && digitalRead(UP) == HIGH && digitalRead(SELECT) == LOW) {
    if (Choice <= 1)  { Choice = k1_max[Niveau]; }
    else              { Choice = Choice - 1; }
    Affiche_menu(Niveau);
  }

  if (digitalRead(UP) == LOW && digitalRead(DOWN) == LOW && digitalRead(SELECT) == HIGH) {
    delay(dualtime);
    Programme();
  }

  delay(dualtime);
}

// =====================================================================
//                            SETUP
// =====================================================================
void setup() {

  // Open serial at 9600 baud for PLX-DAQ data logging to Excel
  Serial.begin(9600);

  // Initialise LCD
  display.begin();
  display.setContrast(contraste);
  display.setRotation(0);

  // Navigation buttons
  pinMode(UP,     INPUT);
  pinMode(DOWN,   INPUT);
  pinMode(SELECT, INPUT);

  // Sensor pins
  pinMode(Sensor0, INPUT);
  pinMode(Sensor1, INPUT);
  pinMode(Sensor2, INPUT);
  pinMode(Sensor3, INPUT);
  pinMode(Sensor4, INPUT);
  pinMode(Sensor5, INPUT);

  // Send PLX-DAQ column headers to Excel
  Serial.print(F("LABEL,Temps,Pump1,Pump2,Pump3,"));
  for (i = 0; i < 6; i++) {
    Serial.print(Data[i]);
    Serial.print(F(","));
  }
  Serial.println(F("Duree,DelaiMes"));

  // Initialise steppers at zero speed (motors stationary at startup)
  for (i = 1; i < 4; i++) VPump[i] = 0.0;
  Stepper_setting();

  // Populate flow rate preset text into menus 2 and 3
  for (i = 1; i < 5; i++) {
    dtostrf(SelectV[i],     4, 2, Txt[2][i]);   // Level 2: SelectV[1..4]
  }
  for (i = 1; i < 4; i++) {
    dtostrf(SelectV[i + 4], 4, 2, Txt[3][i]);   // Level 3: SelectV[5..7]
  }

  // Splash screen
  format();
  display.println(F("3-PUMP FIXED"));
  display.println(F("  v1.0"));
  display.println(F("  Ready !"));
  display.display();
  delay(2000);

  transit(0, 0);
}

// =====================================================================
//                            LOOP
// =====================================================================
void loop() {
  // Any button press stops the active run and enters menu navigation
  if (digitalRead(UP) == HIGH || digitalRead(DOWN) == HIGH || digitalRead(SELECT) == HIGH) {
    RUN = false;
    Select_menu();
  }

  // Keep steppers running between menu checks when a run is active
  if (RUN == true) {
    stepper1.run();
    stepper2.run();
    stepper3.run();
  }
}
