// ___/   SHORT DESCRIPTION   \____________________________________________________________________________
//      Synchronised 2 or 3 syringe pump control program
//      Constant total flow rate across all pumps (triangular formulation pattern)
//      Based on the original 3-pump program - Synchro == 1 mode only

// ______________________________/   Libraries \_____________________________________________________________
#include <SPI.h>
#include <AccelStepper.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_PCD8544.h>

// _________________________________________/   Pin Assignments \__________________________________________

Adafruit_PCD8544 display = Adafruit_PCD8544(5, 6, 7, 8, 9);

#define UP      2     // Button to scroll up / increase value
#define SELECT  3     // Button to validate selection
#define DOWN    4     // Button to scroll down / decrease value

#define Sensor0 A0
#define Sensor1 A1
#define Sensor2 A2
#define Sensor3 A3
#define Sensor4 A4
#define Sensor5 A5

// Pump 1 — EasyDriver, STEP=pin10, DIR=pin9
AccelStepper stepper1(1, 10, 9);
// Pump 2 — EasyDriver, STEP=pin11, DIR=pin9
AccelStepper stepper2(1, 11, 9);
// Pump 3 — EasyDriver, STEP=pin12, DIR=pin9  (not used when Dim=false)
AccelStepper stepper3(1, 12, 9);

// ____________________________________________________/   Variables \_______________________________
byte contraste    = 60;       // LCD contrast
byte dualtime     = 255;      // Inter-button debounce delay (ms)
byte i;                       // General-purpose counter
int  j;                       // General-purpose counter
byte k;                       // General-purpose counter
float x;                      // Temporary sensor voltage
long Vcc          = 5;        // Sensor supply voltage (V)

unsigned long currentTime  = 0;
unsigned long previousTime = 0;
float NbMesure    = 10.0;     // Number of serial measurements per step

// _______________________________________________________________/   Sensor Data \______________________
float SensorV[6];             // Voltage readings A0..A5

// Conversion: physical = a * voltage + b  — edit to match your sensors
float a_coef[6] = {1.0, 1.0, 1.0, 1.0, 1.0, 1.0};
float b_coef[6] = {1.0, 2.0, 3.0, 4.0, 5.0, 6.0};

float F_convert(int idx, float volt) {
  return a_coef[idx] * volt + b_coef[idx];
}

char* Data[6]  = {"Temp", "Pot",  "Cond", "Turb", "S4",  "S5"};
char* Unite[6] = {"degC", "mV",   "mS",   "NTU",  "u",   "u"};

// __________________________________________________________________________/   Pump Data \___________
// VPump[0] = total flow rate (set by user)
// VPump[1..3] = individual pump rates (computed each step)
float VPump[4]   = {0.0, 0.0, 0.0, 0.0};
float VPump_reset = 50.0;     // Speed used during return-to-zero

// Preset total flow rates available in the menu (ml/min)
float SelectV[9] = {0, 0.05, 0.1, 0.2, 0.5, 0.75, 1.0, 2.0, 5.0};

bool  Dim = true;             // true = 3 pumps, false = 2 pumps
byte  N   = 6;                // Number of synchronisation steps

long  pos[4]      = {0, 0, 0, 0};  // Cumulative step positions
float Delay_Pump;             // Duration of one synchronisation step (min)
float Delay_Mesure;           // Interval between serial measurements (ms)
bool  RUN = false;

// __________________________________________________________________________________/   Stepper Motor Data \_
int   acceleration = 1000000; // Steps/s²
float V_total      = 19.0;    // Syringe volume (ml)
long  step_Tour    = 1600;    // Steps per motor revolution
long  Long_Max     = 60;      // Revolutions for full syringe stroke
int   gearbox      = 16;      // Gearbox reduction ratio
float Rtour_mm     = 1.0 / 16;// mm per motor revolution
long  Conversion   = (long)(step_Tour * Long_Max / (Rtour_mm * V_total * 60.0));
long  tour_max     = step_Tour * Long_Max / Rtour_mm;

// ___/   Menu Data \________________________________________________________________________________
// Menu levels:
//   0 = Main menu   (choose 2-pump or 3-pump mode, set total flow, return to zero)
//   1 = Total flow rate selection  (preset values)
//   2 = Step count selection       (density of synchronisation steps)
//   3 = Recap + launch
byte k1_max[] = {4, 5, 4, 5};  // Number of selectable items per level
byte k1[4]    = {1, 1, 1, 1};  // Default first item per level
byte Niveau   = 0;
byte Choice   = 0;

char* Txt[4][6] = {
  // Level 0 — main menu
  {"SYNCHRO PUMP",  " >2 Pumps",  " >3 Pumps",  " >Set Flow",  " >Reset",    ""},
  // Level 1 — total flow rate selection
  {"TOTAL FLOW",    "VAL1",       "VAL2",        "VAL3",        "VAL4",       " >More..."},
  // Level 2 — step count (synchronisation density)
  {"STEP COUNT",    "N=4  (33%)", "N=6  (20%)", "N=11 (5%)",  "N=21 (5%)",  ""},
  // Level 3 — recap before run
  {"  RECAP",       "",           "",            "",            " >Run",      " >Menu"}
};

// =====================================================================
//                         DISPLAY HELPERS
// =====================================================================

void format() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(BLACK, WHITE);
  display.setCursor(0, 0);
}

void transit(byte a, byte b) {
  Niveau = a;
  k1[Niveau] = 0;
  Choice = b;
  Affiche_menu(Niveau);
  delay(dualtime);
}

// Print 6 menu lines; highlight the selected one (inverted colours)
void Affiche_menu(int niv) {
  format();
  for (i = 0; i < 6; i++) {
    if (i == Choice - 1) {
      display.setTextColor(WHITE, BLACK);
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

// Set speeds for all three steppers and send them to tour_max
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

// Advance all active steppers by one step and check emergency
void active() {
  RUN = true;
  stepper1.run();
  stepper2.run();
  if (Dim) stepper3.run();   // stepper3 only used in 3-pump mode
  emergency();
}

// =====================================================================
//                         SAFETY
// =====================================================================

// Emergency stop: UP + SELECT pressed simultaneously
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

// Send one CSV row — mirrors impression() from original code
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
    Serial.print(Delay_Pump, 2);    Serial.print(",");
    Serial.println(Delay_Mesure, 2);
  }
}

// =====================================================================
//                         PUMP CONTROL
// =====================================================================

// Return to physical zero position at reset speed
void Return_to_zero() {
  RUN = true;
  format();
  display.println(F("Back to zero"));
  display.display();
  delay(1000);
  for (i = 1; i < 4; i++) VPump[i] = VPump_reset;
  Stepper_setting();
  stepper1.moveTo(-stepper1.currentPosition());
  stepper2.moveTo(-stepper2.currentPosition());
  stepper3.moveTo(-stepper3.currentPosition());
  transit(0, 0);
}

// Reset all variables and return to main menu
void Reset() {
  RUN = false;
  for (i = 0; i < 4; i++) VPump[i] = 0.0;
  format();
  display.println(F("Reset done"));
  display.println(F("Menu in 10s..."));
  display.display();
  delay(10000);
  transit(0, 0);
}

// Fine manual adjustment of VPump[0] (total flow rate)
// UP / DOWN scroll the value; SELECT confirms
void Adjust() {
  float delta = 0.05;
  for (j = 0; j < 20; j++) {
    delay(dualtime);

    if (SelectV[7] <= 0.10 && SelectV[7] >  0.0)  delta = 0.05;
    if (SelectV[7] <= 2.0  && SelectV[7] >  0.1)  delta = 0.1;
    if (SelectV[7] >  2.0  && SelectV[7] < 20.0)  delta = 0.5;

    if (digitalRead(UP) == LOW && digitalRead(DOWN) == HIGH && digitalRead(SELECT) == LOW) {
      j = 0; SelectV[7] -= delta;
    }
    if (digitalRead(UP) == HIGH && digitalRead(DOWN) == LOW && digitalRead(SELECT) == LOW) {
      j = 0; SelectV[7] += delta;
    }

    format();
    display.println(F("Total flow rate"));
    display.println(F("  UP / DOWN"));
    display.println();
    display.print(F("  "));
    display.print(SelectV[7], 2);
    display.println(F(" ml/min"));
    display.println();
    display.println(F(" SELECT = OK"));
    display.display();

    if (digitalRead(SELECT) == HIGH) {
      VPump[0] = SelectV[7];
      dtostrf(VPump[0], 4, 2, Txt[3][1]);
      transit(2, 0);   // go to step-count selection
      j = 20;
    }
  }
}

// ___/   Synchronised Run  \___________________________________________________________
// Mirrors Synchro==1 block from original Run()
//
// The triangular formulation pattern sweeps the composition space:
//   - Outer loop j:   fraction of pump 1  (r2 = j/(N-1))
//   - Inner loop k:   fraction of pump 3  (r1 = (k+j)/(N-1) when Dim=true)
//   - Pump 2 gets the remainder: VPump[2] = VPump[0] - VPump[1] - VPump[3]
//
// For 2-pump mode (Dim=false): r1=0 so VPump[3]=0 always; only pumps 1 and 2 run.
// Total flow VPump[0] stays constant throughout.

void Run() {
  // Reset cumulative positions
  for (i = 1; i < 4; i++) pos[i] = 0;

  // Outer loop — increases pump 1 fraction from 0 to 1
  for (j = 0; j < N; j++) {

    // Inner loop — decreases pump 3 fraction from max to 0
    for (k = 0; k < N - j; k++) {

      // r1: fraction for pump 3 (0 when Dim=false = 2-pump mode)
      float r1 = Dim * 1.0 * (k + j) / (N - 1);
      // Correct k indexing to match original triangular sweep logic
      k = Dim * (k - N) + N;

      // Duration of this synchronisation step (min)
      // Derived from total volume, number of steps and total flow
      Delay_Pump   = (2 + Dim) * V_total / ((1 + Dim * ((N / 2.0) - 1)) * (N + 1) * VPump[0]);
      Delay_Mesure = 1000.0 * 60.0 * Delay_Pump / NbMesure;

      // r2: fraction for pump 1
      float r2 = 1.0 * j / (N - 1);

      // Compute individual pump flow rates from total VPump[0]
      VPump[1] = VPump[0] * r2;
      VPump[3] = Dim * VPump[0] * (1.0 - r1);
      VPump[2] = VPump[0] - VPump[1] - VPump[3];

      // Display current state
      format();
      if (Dim) {
        display.println(F("Synchro 3 Pumps"));
      } else {
        display.println(F("Synchro 2 Pumps"));
      }
      display.println();
      for (i = 1; i < 4; i++) {
        display.print(F("P")); display.print(i);
        display.print(F(" => "));
        display.println(VPump[i], 2);
        // Accumulate target position for this pump
        pos[i] = pos[i] + (long)(Delay_Pump * VPump[i] * step_Tour * Long_Max / (V_total * Rtour_mm));
      }
      display.display();

      // Apply new speeds to stepper motors
      Stepper_setting();

      // Drive the fastest pump until it reaches its target;
      // the others are limited by their own setMaxSpeed so they
      // naturally reach the correct relative position.
      if (VPump[1] >= VPump[2] && VPump[1] >= VPump[3]) {
        while (stepper1.currentPosition() <= pos[1]) {
          active();
          impression();
        }
      } else if (VPump[2] >= VPump[1] && VPump[2] >= VPump[3]) {
        while (stepper2.currentPosition() <= pos[2]) {
          active();
          impression();
        }
      } else {
        while (stepper3.currentPosition() <= pos[3]) {
          active();
          impression();
        }
      }

      impression();  // Final measurement at end of step
    }
  }

  RUN = false;
  format();
  display.println(F("  RUN DONE!"));
  display.println();
  display.print(F("  ")); display.print(V_total, 1);
  display.println(F(" ml done"));
  display.display();
  delay(3000);
  transit(0, 0);
}

// =====================================================================
//                       MENU NAVIGATION
// =====================================================================

// Execute action linked to current Niveau / Choice
void Programme() {

  // ── Level 0 : main menu ──
  if (Niveau == 0) {
    if (Choice == 1) {
      // 2-pump mode
      Dim = false;
      setStatus_LCD(F("Mode: 2 Pumps"));
      transit(1, 0);
    }
    else if (Choice == 2) {
      // 3-pump mode
      Dim = true;
      setStatus_LCD(F("Mode: 3 Pumps"));
      transit(1, 0);
    }
    else if (Choice == 3) {
      // Fine-adjust total flow rate
      Adjust();
    }
    else if (Choice == 4) {
      Reset();
    }
  }

  // ── Level 1 : total flow rate presets ──
  if (Niveau == 1) {
    for (i = 1; i < 5; i++) {
      if (Choice == i) {
        VPump[0] = SelectV[i];
        dtostrf(VPump[0], 4, 2, Txt[3][1]);
        transit(2, 0);   // go to step-count selection
      }
    }
    if (Choice == 5) {
      transit(1, 0);   // "More" not implemented — stay on page 1
    }
  }

  // ── Level 2 : step count selection ──
  if (Niveau == 2) {
    if (Choice == 1) { N = 4;  Dim = true;  updateRecap(); transit(3, 0); }
    if (Choice == 2) { N = 6;  Dim = true;  updateRecap(); transit(3, 0); }
    if (Choice == 3) { N = 11; Dim = false; updateRecap(); transit(3, 0); }
    if (Choice == 4) { N = 21; Dim = false; updateRecap(); transit(3, 0); }
  }

  // ── Level 3 : recap ──
  if (Niveau == 3) {
    if (Choice == 0) { transit(3, 0); }
    if (Choice == 4) { Run(); }
    if (Choice == 5) { transit(0, 0); }
  }
}

// Build recap lines from current settings
void updateRecap() {
  Txt[3][1] = Dim ? "3 Pumps" : "2 Pumps";
  dtostrf(VPump[0], 4, 2, Txt[3][2]);
  // Txt[3][3] will show N value — use a static buffer
  static char nbuf[8];
  sprintf(nbuf, "N=%d", N);
  Txt[3][3] = nbuf;
}

// Brief info message on LCD
void setStatus_LCD(const __FlashStringHelper* msg) {
  format();
  display.println(msg);
  display.display();
  delay(800);
}

// UP / DOWN scroll menu items; UP+DOWN+SELECT validates
void Select_menu() {
  if (digitalRead(UP) == LOW && digitalRead(DOWN) == HIGH && digitalRead(SELECT) == LOW) {
    if (Choice >= k1_max[Niveau]) {
      Choice = k1[Niveau];
    } else {
      Choice = Choice + 1;
    }
    Affiche_menu(Niveau);
  }

  if (digitalRead(DOWN) == LOW && digitalRead(UP) == HIGH && digitalRead(SELECT) == LOW) {
    if (Choice <= 1) {
      Choice = k1_max[Niveau];
    } else {
      Choice = Choice - 1;
    }
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
  Serial.begin(9600);

  display.begin();
  display.setContrast(contraste);
  display.setRotation(0);

  pinMode(UP,     INPUT);
  pinMode(DOWN,   INPUT);
  pinMode(SELECT, INPUT);
  pinMode(Sensor0, INPUT);
  pinMode(Sensor1, INPUT);
  pinMode(Sensor2, INPUT);
  pinMode(Sensor3, INPUT);
  pinMode(Sensor4, INPUT);
  pinMode(Sensor5, INPUT);

  // PLX-DAQ column headers
  Serial.print(F("LABEL,Temps,Pump1,Pump2,Pump3,"));
  for (i = 0; i < 6; i++) {
    Serial.print(Data[i]);
    Serial.print(F(","));
  }
  Serial.println(F("Duree,DelaiMes"));

  // Initialise steppers at zero speed
  for (i = 1; i < 4; i++) VPump[i] = 0.0;
  Stepper_setting();

  // Populate preset flow rate values into menu text
  for (i = 1; i < 5; i++) {
    dtostrf(SelectV[i],     4, 2, Txt[1][i]);
  }

  // Splash screen
  format();
  display.println(F("SYNCHRO PUMPS"));
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
  // Any button press stops the run and enters the menu
  if (digitalRead(UP) == HIGH || digitalRead(DOWN) == HIGH || digitalRead(SELECT) == HIGH) {
    RUN = false;
    Select_menu();
  }

  // Keep steppers running between menu interactions
  if (RUN == true) {
    stepper1.run();
    stepper2.run();
    if (Dim) stepper3.run();
  }
}
