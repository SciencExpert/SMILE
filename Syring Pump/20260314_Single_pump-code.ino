// ___/   SHORT DESCRIPTION   \____________________________________________________________________________
//      Single syringe pump control program
//      Based on the original 3-pump program - simplified for 1 pump
//      Modes: Fixed flow rate | Manual adjustment | Sensor display | Reset

// ______________________________/   Libraries \_____________________________________________________________
#include <SPI.h>
#include <AccelStepper.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_PCD8544.h>

// _________________________________________/   Pin Assignments \__________________________________________

Adafruit_PCD8544 display = Adafruit_PCD8544(5, 6, 7, 8, 9);

#define UP        2       // Button to increase value / scroll up
#define SELECT    3       // Button to validate selection
#define DOWN      4       // Button to decrease value / scroll down

#define Sensor0   A0      // Sensor 0
#define Sensor1   A1      // Sensor 1
#define Sensor2   A2      // Sensor 2
#define Sensor3   A3      // Sensor 3
#define Sensor4   A4      // Sensor 4
#define Sensor5   A5      // Sensor 5

// Pump 1 - EasyDriver mode, pin 10 = STEP, pin 9 = DIR
AccelStepper stepper1(1, 10, 9);

// ____________________________________________________/   Variables \_______________________________
byte contraste    = 60;     // LCD screen contrast
byte dualtime     = 255;    // Debounce / inter-action delay (ms)
byte i;                     // General counter (byte: 0-255)
int  j;                     // General counter (int)
float x;                    // Temporary sensor voltage value
long Vcc          = 5;      // Sensor supply voltage (V)

unsigned long currentTime  = 0;   // Timestamp for timed measurements
unsigned long previousTime = 0;   // Previous timestamp for interval check
float NbMesure    = 10.0;         // Number of measurements taken per pump cycle

// _______________________________________________________________/   Sensor Data \______________________
float SensorV[6];                 // Raw voltage readings from A0..A5

// Sensor conversion: physical_value = a * voltage + b
// Edit a_coef[] and b_coef[] to match your sensor calibration
float a_coef[6] = {1.0, 1.0, 1.0, 1.0, 1.0, 1.0};
float b_coef[6] = {1.0, 2.0, 3.0, 4.0, 5.0, 6.0};

float F_convert(int idx, float volt) {
  return a_coef[idx] * volt + b_coef[idx];
}

// Sensor labels and units for serial output and LCD
char* Data[6]  = {"Temp", "Pot",  "Cond", "Turb", "S4",  "S5"};
char* Unite[6] = {"degC", "mV",   "mS",   "NTU",  "u",   "u"};

// __________________________________________________________________________/   Pump Data \___________
float VPump         = 0.0;    // Current pump flow rate (ml/min)
float VPump_reset   = 50.0;   // Flow rate used during return-to-zero

// Preset selectable flow rates in ml/min (indices 1..8 used in menus)
float SelectV[9] = {0, 0.05, 0.1, 0.2, 0.5, 0.75, 1.0, 2.0, 5.0};

float Delay_Pump;             // Calculated pump cycle duration (min)
float Delay_Mesure;           // Delay between two serial measurements (ms)
bool  RUN = false;            // True while pump is running

// __________________________________________________________________________________/   Stepper Motor Data \_
int   gearbox      = 16;      // Gearbox reduction ratio
int   acceleration = 1000000; // Stepper acceleration (steps/s^2)
float V_total      = 19.0;    // Syringe volume (ml)
long  step_Tour    = 1600;    // Steps per motor revolution (set by M1/M2 on EasyDriver)
long  Long_Max     = 60;      // Number of revolutions to empty the syringe
float Rtour_mm     = 1.0 / 16;// mm per motor revolution (depends on lead screw pitch and gearbox)

// Conversion factor: flow rate (ml/min) -> steps/sec
long  Conversion   = (long)(step_Tour * Long_Max / (Rtour_mm * V_total * 60.0));

// Maximum step count corresponding to a full syringe stroke
long  tour_max     = step_Tour * Long_Max / Rtour_mm;

// ___/   Menu Data \________________________________________________________________________________
byte k1_max[] = {4, 5, 5, 5};    // Number of selectable items at each menu level
byte k1[4]    = {1, 1, 1, 1};    // Default highlighted item at each level
byte Niveau   = 0;                // Current menu level (0 = main)
byte Choice   = 0;                // Currently highlighted menu item

// Menu text table [level][line]
// Line 0 = menu title, lines 1..5 = selectable items
char* Txt[4][6] = {
  // Level 0 : main menu
  {"  1-PUMP",    " >Fixed",   " >Adjust",   " >Sensors",  " >Reset",    ""},
  // Level 1 : flow rate selection page 1 (SelectV 1..4) + access to page 2
  {"FLOW RATE",   "VAL1",      "VAL2",       "VAL3",       "VAL4",       " >More..."},
  // Level 2 : flow rate selection page 2 (SelectV 5..7) + fine adjust + back
  {"FLOW RATE",   "VAL5",      "VAL6",       "VAL7",       " >Adjust",   " <Back"},
  // Level 3 : summary before run
  {"  RECAP",     "",          "",           "",           " >Run",      " >Menu"}
};

// =====================================================================
//                         DISPLAY HELPERS
// =====================================================================

// Clear display and reset text settings ready for new content
void format() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(BLACK, WHITE);
  display.setCursor(0, 0);
}

// Change menu level and selection, refresh display, short pause
void transit(byte a, byte b) {
  Niveau = a;
  k1[Niveau] = 0;
  Choice = b;
  Affiche_menu(Niveau);
  delay(dualtime);
}

// Print the 6 lines of the current menu level; highlight the selected line
void Affiche_menu(int niv) {
  format();
  for (i = 0; i < 6; i++) {
    if (i == Choice - 1) {
      display.setTextColor(WHITE, BLACK);   // Inverted = selected
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

// Apply current VPump flow rate to stepper and command it toward tour_max
void Stepper_setting() {
  stepper1.setMaxSpeed(VPump * Conversion);
  stepper1.setAcceleration(acceleration);
  stepper1.moveTo(tour_max);
}

// Run stepper one step and check for emergency stop
void active() {
  RUN = true;
  stepper1.run();
  emergency();
}

// =====================================================================
//                         SAFETY
// =====================================================================

// Emergency stop: press UP + SELECT simultaneously during a run
// Stops the motor immediately and returns to the main menu
void emergency() {
  if (digitalRead(UP) == LOW && digitalRead(SELECT) == HIGH) {
    RUN = false;
    stepper1.stop();
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

// Display all six sensor converted values on the LCD
// Stays on screen until SELECT is pressed or timeout (~8 s)
void Show_sensors() {
  for (j = 0; j < 30; j++) {
    delay(dualtime);
    lire_capteurs();
    format();
    display.println(F(" SENSORS"));
    for (i = 0; i < 6; i++) {
      display.print(Data[i]);
      display.print(F(":"));
      display.println(F_convert(i, SensorV[i]), 1);
    }
    display.display();
    if (digitalRead(SELECT) == HIGH) { break; }
  }
  transit(0, 0);
}

// =====================================================================
//                         SERIAL LOGGING  (PLX-DAQ)
// =====================================================================

// Send one CSV data row over serial if enough time has elapsed
// Format: DATA, TIME, VPump, S0..S5, cycle_duration, measurement_interval
void impression() {
  currentTime = millis();
  if ((currentTime - previousTime) > Delay_Mesure) {
    previousTime = currentTime;
    lire_capteurs();
    Serial.print(F("DATA,TIME,"));
    Serial.print(VPump, 2);   Serial.print(",");
    for (i = 0; i < 6; i++) {
      x = SensorV[i];
      Serial.print(F_convert(i, x), 2);
      Serial.print(",");
    }
    Serial.print(Delay_Pump, 2);    Serial.print(",");
    Serial.println(Delay_Mesure, 2);
  }
}

// =====================================================================
//                         PUMP CONTROL
// =====================================================================

// Return the syringe to its initial position at reset speed
void Return_to_zero() {
  RUN = true;
  format();
  display.println(F("Back to zero"));
  display.display();
  delay(1000);
  VPump = VPump_reset;
  Stepper_setting();
  stepper1.moveTo(-stepper1.currentPosition());
  transit(0, 0);
}

// Reset all variables and return to main menu after 10 s confirmation
void Reset() {
  VPump = 0.0;
  RUN   = false;
  format();
  display.println(F("Reset done"));
  display.println(F("Menu in 10s..."));
  display.display();
  delay(10000);
  transit(0, 0);
}

// Fine-speed adjustment with UP / DOWN buttons; SELECT confirms
// Delta is auto-scaled to the current speed range for comfortable control
void Adjust() {
  float delta = 0.05;
  for (j = 0; j < 20; j++) {
    delay(dualtime);

    // Scale increment to current speed range
    if (SelectV[7] <= 0.10 && SelectV[7] >  0.0)  delta = 0.05;
    if (SelectV[7] <= 2.0  && SelectV[7] >  0.1)  delta = 0.1;
    if (SelectV[7] >  2.0  && SelectV[7] < 20.0)  delta = 0.5;

    if (digitalRead(UP) == LOW && digitalRead(DOWN) == HIGH && digitalRead(SELECT) == LOW) {
      j = 0;
      SelectV[7] = SelectV[7] - delta;
    }
    if (digitalRead(UP) == HIGH && digitalRead(DOWN) == LOW && digitalRead(SELECT) == LOW) {
      j = 0;
      SelectV[7] = SelectV[7] + delta;
    }

    // Show current adjusted value on LCD
    format();
    display.println(F(" Adjust Speed"));
    display.println(F("  UP / DOWN"));
    display.println();
    display.print(F("  "));
    display.print(SelectV[7], 2);
    display.println(F(" ml/min"));
    display.println();
    display.println(F(" SELECT = OK"));
    display.display();

    // SELECT pressed: save value and go to recap
    if (digitalRead(SELECT) == HIGH) {
      VPump = SelectV[7];
      dtostrf(VPump, 4, 2, Txt[3][1]);   // Update recap display text
      transit(3, 0);
      j = 20;                             // Exit adjustment loop
    }
  }
}

// Show running status on LCD during a pump cycle
void affiche_running() {
  format();
  display.println(F(" RUNNING"));
  display.print(F(" Pump => "));
  display.print(VPump, 2);
  display.println(F(" ml/m"));
  display.println();
  display.print(F(" Pos: "));
  display.println(stepper1.currentPosition());
  display.display();
}

// Run the pump at VPump ml/min until the syringe is empty
// Calculates timing, drives stepper, logs data, then returns to main menu
void Run() {
  format();
  display.println(F("  RUNNING"));
  display.print(F("  Pump => "));
  display.print(VPump, 2);
  display.println(F(" ml/m"));
  display.display();

  // Time to empty the full syringe at the chosen flow rate
  Delay_Pump   = V_total / VPump;
  // Interval between two serial measurements (ms)
  Delay_Mesure = 1000.0 * 60.0 * Delay_Pump / NbMesure;
  // Target step position for a complete syringe stroke
  long pos_cible = (long)(Delay_Pump * VPump * step_Tour * Long_Max / (V_total * Rtour_mm));

  Stepper_setting();

  // Drive stepper until target position is reached
  while (stepper1.currentPosition() <= pos_cible) {
    active();
    affiche_running();
    impression();
  }

  // Cycle complete
  RUN = false;
  format();
  display.println(F("  DONE !"));
  display.print(F("  "));
  display.print(V_total, 1);
  display.println(F(" ml injected"));
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
  // Each choice selects an operating mode or utility function
  if (Niveau == 0) {
    if (Choice == 1) { transit(1, 0); }    // Go to flow rate selection
    if (Choice == 2) { Adjust(); }         // Open fine-speed adjustment
    if (Choice == 3) { Show_sensors(); }   // Display live sensor readings
    if (Choice == 4) { Reset(); }          // Reset everything
  }

  // ---- Level 1 : flow rate page 1 (SelectV[1..4]) ----
  // Choices 1-4 set VPump to a preset value and jump to recap
  // Choice 5 goes to page 2
  if (Niveau == 1) {
    for (i = 1; i < 5; i++) {
      if (Choice == i) {
        VPump = SelectV[i];
        dtostrf(VPump, 4, 2, Txt[3][1]);   // Store value text for recap screen
        transit(3, 0);
      }
    }
    if (Choice == 5) { transit(2, 0); }    // Go to flow rate page 2
  }

  // ---- Level 2 : flow rate page 2 (SelectV[5..7]) + Adjust + Back ----
  if (Niveau == 2) {
    for (i = 1; i < 4; i++) {
      if (Choice == i) {
        VPump = SelectV[i + 4];
        dtostrf(VPump, 4, 2, Txt[3][1]);
        transit(3, 0);
      }
    }
    if (Choice == 4) { Adjust(); }         // Fine adjustment
    if (Choice == 5) { transit(1, 0); }    // Back to page 1
  }

  // ---- Level 3 : recap ----
  // Shows chosen flow rate; user can launch run or return to main menu
  if (Niveau == 3) {
    if (Choice == 0) {
      // Populate recap lines with current settings
      Txt[3][0] = "  RECAP";
      Txt[3][2] = "Pump:";
      Txt[3][3] = Txt[3][1];              // Flow rate text set by previous levels
      transit(3, 0);
    }
    if (Choice == 4) { Run(); }           // Start the pump
    if (Choice == 5) { transit(0, 0); }   // Return to main menu
  }
}

// Handle button presses to scroll through and validate menu choices
// UP   => Choice + 1 (wraps at max)
// DOWN => Choice - 1 (wraps at 1)
// UP + DOWN together => validate current choice (calls Programme)
void Select_menu() {

  // Scroll down the list
  if (digitalRead(UP) == LOW && digitalRead(DOWN) == HIGH && digitalRead(SELECT) == LOW) {
    if (Choice >= k1_max[Niveau]) {
      Choice = k1[Niveau];
    } else {
      Choice = Choice + 1;
    }
    Affiche_menu(Niveau);
  }

  // Scroll up the list
  if (digitalRead(DOWN) == LOW && digitalRead(UP) == HIGH && digitalRead(SELECT) == LOW) {
    if (Choice <= 1) {
      Choice = k1_max[Niveau];
    } else {
      Choice = Choice - 1;
    }
    Affiche_menu(Niveau);
  }

  // Validate selection (UP + DOWN pressed while SELECT active)
  if (digitalRead(UP) == LOW && digitalRead(DOWN) == LOW && digitalRead(SELECT) == HIGH) {
    delay(dualtime);
    Programme();
  }

  delay(dualtime);   // Short pause to avoid double-triggers
}

// =====================================================================
//                            SETUP
// =====================================================================
void setup() {

  // Open serial at 9600 baud for PLX-DAQ data logging to Excel
  Serial.begin(9600);

  // Initialise LCD display
  display.begin();
  display.setContrast(contraste);
  display.setRotation(0);    // 0 = normal orientation

  // Configure navigation buttons as inputs
  pinMode(UP,     INPUT);
  pinMode(DOWN,   INPUT);
  pinMode(SELECT, INPUT);

  // Configure sensor pins as inputs
  pinMode(Sensor0, INPUT);
  pinMode(Sensor1, INPUT);
  pinMode(Sensor2, INPUT);
  pinMode(Sensor3, INPUT);
  pinMode(Sensor4, INPUT);
  pinMode(Sensor5, INPUT);

  // Send column header row to Excel via PLX-DAQ
  Serial.print(F("LABEL,Temps,Pump1,"));
  for (i = 0; i < 6; i++) {
    Serial.print(Data[i]);
    Serial.print(F(","));
  }
  Serial.println(F("Duree,DelaiMes"));

  // Initialise stepper with zero speed (pump does not move at startup)
  stepper1.setMaxSpeed(0);
  stepper1.setAcceleration(acceleration);

  // Convert preset flow rate values to text strings for menu display
  for (i = 1; i < 5; i++) {
    dtostrf(SelectV[i],     4, 2, Txt[1][i]);   // Level 1: SelectV[1..4]
  }
  for (i = 1; i < 4; i++) {
    dtostrf(SelectV[i + 4], 4, 2, Txt[2][i]);   // Level 2: SelectV[5..7]
  }

  // Splash screen
  format();
  display.println(F("  1-PUMP v1.0"));
  display.println(F("  Ready !"));
  display.display();
  delay(2000);

  // Go to main menu
  transit(0, 0);
}

// =====================================================================
//                            LOOP
// =====================================================================
void loop() {

  // Any button pressed: stop automatic run and enter menu navigation
  if (digitalRead(UP) == HIGH || digitalRead(DOWN) == HIGH || digitalRead(SELECT) == HIGH) {
    RUN = false;
    Select_menu();
  }

  // Keep stepper running toward its target when a run is active
  if (RUN == true) {
    stepper1.run();
  }
}
