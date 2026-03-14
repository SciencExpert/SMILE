//=====================================================
//  Design of Experiments (DoE) syringe pump control program
// Sub programm of syringe pump
// Electronic for Chemists Project
// ---------------------------------------
// Design by SciencExpert
// Version 5.04– Mars 2026
// Author : Gerard Bacquet
//=====================================================
//
// ___/   SHORT DESCRIPTION   \____________________________________________________________________________
//      Design of Experiments (DoE) syringe pump control program
//      Supports 2^3 (8 runs) and 3^3 (27 runs) full factorial designs
//      Three pumps deliver combinations of Low / Mid / High flow rates
//      automatically, with sensor logging via PLX-DAQ to Excel.

// ______________________________/   Libraries \_____________________________________________________________
#include <SPI.h>
#include <AccelStepper.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_PCD8544.h>

// _________________________________________/   Pin Assignments \__________________________________________

// Nokia PCD8544 LCD — CLK, DIN, DC, CE, RST
Adafruit_PCD8544 display = Adafruit_PCD8544(5, 6, 7, 8, 9);

#define UP      2     // Menu scroll up / value increase
#define SELECT  3     // Validate selection
#define DOWN    4     // Menu scroll down / value decrease

#define Sensor0 A0
#define Sensor1 A1
#define Sensor2 A2
#define Sensor3 A3
#define Sensor4 A4
#define Sensor5 A5

// Three pumps on EasyDriver boards — shared DIR pin 9
AccelStepper stepper1(1, 10, 9);  // Pump 1 — STEP=pin10, DIR=pin9
AccelStepper stepper2(1, 11, 9);  // Pump 2 — STEP=pin11, DIR=pin9
AccelStepper stepper3(1, 12, 9);  // Pump 3 — STEP=pin12, DIR=pin9

// ____________________________________________________/   General Variables \_______________________________
byte contraste    = 60;       // LCD contrast (0-127, optimum ~40-60)
byte dualtime     = 255;      // Debounce / inter-action delay (ms)
byte i;                       // General-purpose byte counter
int  j;                       // General-purpose int counter
float x;                      // Temporary sensor voltage value
long Vcc          = 5;        // Sensor supply voltage (V)

unsigned long currentTime  = 0;   // Current timestamp (millis)
unsigned long previousTime = 0;   // Previous measurement timestamp
float NbMesure    = 10.0;         // Serial measurements per DoE run

// _______________________________________________________________/   Sensor Data \______________________
float SensorV[6];   // Voltage readings from A0..A5

// Linear conversion:  physical_value = a_coef * voltage + b_coef
// Edit these arrays to match your sensor calibration
float a_coef[6] = {1.0, 1.0, 1.0, 1.0, 1.0, 1.0};
float b_coef[6] = {1.0, 2.0, 3.0, 4.0, 5.0, 6.0};

float F_convert(int idx, float volt) {
  return a_coef[idx] * volt + b_coef[idx];
}

char* Data[6]  = {"Temp", "Pot",  "Cond", "Turb", "S4",  "S5"};
char* Unite[6] = {"degC", "mV",   "mS",   "NTU",  "u",   "u"};

// __________________________________________________________________________/   DoE Pump Data \___________
// DoE type: 2 = 2^3 (8 runs, two levels per factor)
//           3 = 3^3 (27 runs, three levels per factor)
byte DoE_type = 2;            // Set in menu; default 2^3

// Low and High flow rate bounds for each pump (ml/min)
// [0] unused  [1]=Pump1  [2]=Pump2  [3]=Pump3
float VPumpLV[4] = {0.0, 0.1, 0.1, 0.1};   // Low  level (-1)
float VPumpHV[4] = {0.0, 1.0, 1.0, 1.0};   // High level (+1)

// Current individual pump flow rates (computed by doMode)
float VPump[4]   = {0.0, 0.0, 0.0, 0.0};

// Reference speed = max of all pump speeds; used to compute step timing
float VPump_ref  = 0.0;

// Preset selectable flow rate values (ml/min) — used in LV/HV menus
float SelectV[9] = {0, 0.05, 0.1, 0.2, 0.5, 0.75, 1.0, 2.0, 5.0};

// Flags tracking whether LV and HV have been set for each pump
bool LV_set[4] = {false, false, false, false};
bool HV_set[4] = {false, false, false, false};

// Pump currently being configured in the LV/HV setup menu
byte Pump_Number = 1;

// Cumulative step targets for each pump
long  pos[4]     = {0, 0, 0, 0};

float Delay_Pump;     // Duration of one DoE run (minutes)
float Delay_Mesure;   // Interval between two serial measurements (ms)
bool  RUN = false;    // True while steppers are running

// ___/   Reset speed used when returning to zero \_
float VPump_reset = 50.0;

// __________________________________________________________________________________/   Stepper Motor Data \_
int   acceleration = 1000000; // Stepper acceleration (steps/s²)
float V_total      = 19.0;    // Syringe volume (ml)
long  step_Tour    = 1600;    // Steps per motor revolution (depends on M1/M2 jumpers)
long  Long_Max     = 60;      // Motor revolutions to empty the syringe
int   gearbox      = 16;      // Gearbox reduction ratio
float Rtour_mm     = 1.0 / 16;// mm per motor revolution (lead screw pitch / gearbox)

// Conversion factor: flow rate (ml/min) → stepper speed (steps/sec)
long  Conversion   = (long)(step_Tour * Long_Max / (Rtour_mm * V_total * 60.0));

// Maximum step count = complete syringe stroke
long  tour_max     = step_Tour * Long_Max / Rtour_mm;

// ___/   Menu Data \________________________________________________________________________________
// Menu levels:
//   0 — Main menu       : choose DoE type (2^3 / 3^3) or reset
//   1 — LV/HV setup     : assign Low and High values for each pump
//   2 — Flow rate page 1: choose a preset value (SelectV 1..4)
//   3 — Flow rate page 2: choose a preset value (SelectV 5..7) or fine-adjust
//   4 — Recap           : summary of settings, launch or return to menu

byte k1_max[] = {3, 3, 5, 4, 5};  // Max selectable item count per level
byte k1[5]    = {1, 1, 1, 1, 1};  // Default first selectable item per level
byte Niveau   = 0;                 // Current menu level
byte Choice   = 0;                 // Currently highlighted item (1-based; 0 = none)

// Writable text buffers used by dtostrf to store float→string conversions
char buf_lv1[8], buf_lv2[8], buf_lv3[8];
char buf_hv1[8], buf_hv2[8], buf_hv3[8];
char buf_doe[12];
char buf_N[8];

char* Txt[5][6] = {
  // Level 0 — main menu
  {"  DoE PUMPS",   " >DoE 2^3",   " >DoE 3^3",   " >Reset",    "",           ""},
  // Level 1 — select pump to configure LV then HV
  {"SET LV / HV",   "=>Pump 1",    "=>Pump 2",    "=>Pump 3",   "",           ""},
  // Level 2 — flow rate presets page 1 (SelectV[1..4])
  {"FLOW RATE",     "VAL1",        "VAL2",         "VAL3",       "VAL4",       " >More..."},
  // Level 3 — flow rate presets page 2 (SelectV[5..7]) + fine adjust
  {"FLOW RATE",     "VAL5",        "VAL6",         "VAL7",       " >Adjust",   " <Back"},
  // Level 4 — recap before launch
  {"  RECAP",       "",            "",             "",            " >Run",      " >Menu"}
};

// =====================================================================
//                    FORWARD DECLARATIONS
// =====================================================================
void Affiche_menu(int niv);
void Programme();
void doMode(int run_index);
void Run();

// =====================================================================
//                         DISPLAY HELPERS
// =====================================================================

// Clear display and reset text settings — mirrors format() in original
void format() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(BLACK, WHITE);
  display.setCursor(0, 0);
}

// Change menu level, reset selection, refresh LCD — mirrors transit()
void transit(byte a, byte b) {
  Niveau = a;
  k1[Niveau] = 0;
  Choice = b;
  Affiche_menu(Niveau);
  delay(dualtime);
}

// Print all 6 lines of the current menu; invert the selected line
void Affiche_menu(int niv) {
  format();
  for (i = 0; i < 6; i++) {
    if (i == Choice - 1) {
      display.setTextColor(WHITE, BLACK);   // Highlighted line — inverted
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

// Apply VPump[1..3] speeds to steppers and command them to tour_max
// mirrors Stepper_setting() from original
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
// mirrors active() from original
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

// Emergency stop: press UP + SELECT simultaneously during a run
// Stops all motors immediately and returns to recap menu
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

// Read all six analog inputs and store voltages in SensorV[]
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

// Send one CSV measurement row if the measurement interval has elapsed
// mirrors impression() from original
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
//                         PUMP UTILITIES
// =====================================================================

// Return all three pumps to their physical zero position
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

// Full software reset: clear all values and return to main menu
void Reset() {
  RUN = false;
  for (i = 0; i < 4; i++) VPump[i] = 0.0;
  for (i = 1; i < 4; i++) { LV_set[i] = false; HV_set[i] = false; }
  format();
  display.println(F("Reset done"));
  display.println(F("Menu in 10s..."));
  display.display();
  delay(10000);
  transit(0, 0);
}

// Fine manual adjustment of a flow rate value stored in SelectV[7]
// UP / DOWN change the value; SELECT saves and exits
// Used when setting LV or HV bounds for a pump
void Adjust() {
  float delta = 0.05;
  for (j = 0; j < 20; j++) {
    delay(dualtime);

    // Auto-scale increment to current value range
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
    display.println(F(" Adjust value"));
    display.println(F("  UP / DOWN"));
    display.println();
    display.print(F("  "));
    display.print(SelectV[7], 2);
    display.println(F(" ml/min"));
    display.println();
    display.println(F(" SELECT = OK"));
    display.display();

    if (digitalRead(SELECT) == HIGH) {
      // Save to the appropriate LV or HV slot for the current pump
      if (!LV_set[Pump_Number]) {
        VPumpLV[Pump_Number] = SelectV[7];
        LV_set[Pump_Number]  = true;
        dtostrf(VPumpLV[Pump_Number], 4, 2, Txt[1][Pump_Number]);
        // Prompt user for HV value
        format();
        display.print(F("P")); display.print(Pump_Number);
        display.println(F(" LV saved"));
        display.println(F("Now set HV"));
        display.display();
        delay(1000);
        transit(2, 0);   // back to flow rate page 1 to pick HV
      } else if (!HV_set[Pump_Number]) {
        VPumpHV[Pump_Number] = SelectV[7];
        HV_set[Pump_Number]  = true;
        // Build a "DONE" marker in the pump selection menu
        format();
        display.print(F("P")); display.print(Pump_Number);
        display.println(F(" HV saved"));
        display.display();
        delay(1000);
        // Check if all pumps are configured; if so, go to recap
        bool all_done = true;
        for (byte p = 1; p < 4; p++) {
          if (!LV_set[p] || !HV_set[p]) { all_done = false; break; }
        }
        if (all_done) {
          buildRecap();
          transit(4, 0);
        } else {
          transit(1, 0);   // back to pump selection
        }
      }
      j = 20;   // exit loop
    }
  }
}

// =====================================================================
//                    DoE FLOW RATE ASSIGNMENT
// =====================================================================

// Assign VPump[1..3] according to the run index of the DoE plan
// mirrors doMode() from the original code exactly
//
// For 2^3: run_index 1..8   — each factor takes Low (-1) or High (+1)
// For 3^3: run_index 1..27  — each factor takes Low (-1), Mid (0) or High (+1)

void doMode(int run_index) {

  // Helper macros for mid-point calculation
  #define MID(p) ((VPumpHV[p] + VPumpLV[p]) / 2.0)

  switch (run_index) {

    // ── 2^3 : 8 runs ──────────────────────────────────────────────
    // Notation: L=Low(VPumpLV)  H=High(VPumpHV)
    case  1: VPump[1]=VPumpLV[1]; VPump[2]=VPumpLV[2]; VPump[3]=VPumpLV[3]; break; // [-,-,-]
    case  2: VPump[1]=VPumpHV[1]; VPump[2]=VPumpLV[2]; VPump[3]=VPumpLV[3]; break; // [+,-,-]
    case  3: VPump[1]=VPumpLV[1]; VPump[2]=VPumpHV[2]; VPump[3]=VPumpLV[3]; break; // [-,+,-]
    case  4: VPump[1]=VPumpHV[1]; VPump[2]=VPumpHV[2]; VPump[3]=VPumpLV[3]; break; // [+,+,-]
    case  5: VPump[1]=VPumpLV[1]; VPump[2]=VPumpLV[2]; VPump[3]=VPumpHV[3]; break; // [-,-,+]
    case  6: VPump[1]=VPumpHV[1]; VPump[2]=VPumpLV[2]; VPump[3]=VPumpHV[3]; break; // [+,-,+]
    case  7: VPump[1]=VPumpLV[1]; VPump[2]=VPumpHV[2]; VPump[3]=VPumpHV[3]; break; // [-,+,+]
    case  8: VPump[1]=VPumpHV[1]; VPump[2]=VPumpHV[2]; VPump[3]=VPumpHV[3]; break; // [+,+,+]

    // ── 3^3 : 27 runs (Taguchi L27) ───────────────────────────────
    // Notation: L=Low  M=Mid  H=High
    case  9: VPump[1]=VPumpLV[1]; VPump[2]=VPumpLV[2]; VPump[3]=VPumpLV[3]; break; // [-,-,-]
    case 10: VPump[1]=VPumpLV[1]; VPump[2]=VPumpLV[2]; VPump[3]=MID(3);     break; // [-,-,0]
    case 11: VPump[1]=VPumpLV[1]; VPump[2]=VPumpLV[2]; VPump[3]=VPumpHV[3]; break; // [-,-,+]
    case 12: VPump[1]=VPumpLV[1]; VPump[2]=MID(2);     VPump[3]=VPumpLV[3]; break; // [-,0,-]
    case 13: VPump[1]=VPumpLV[1]; VPump[2]=MID(2);     VPump[3]=MID(3);     break; // [-,0,0]
    case 14: VPump[1]=VPumpLV[1]; VPump[2]=MID(2);     VPump[3]=VPumpHV[3]; break; // [-,0,+]
    case 15: VPump[1]=VPumpLV[1]; VPump[2]=VPumpHV[2]; VPump[3]=VPumpLV[3]; break; // [-,+,-]
    case 16: VPump[1]=VPumpLV[1]; VPump[2]=VPumpHV[2]; VPump[3]=MID(3);     break; // [-,+,0]
    case 17: VPump[1]=VPumpLV[1]; VPump[2]=VPumpHV[2]; VPump[3]=VPumpHV[3]; break; // [-,+,+]
    case 18: VPump[1]=MID(1);     VPump[2]=VPumpLV[2]; VPump[3]=VPumpLV[3]; break; // [0,-,-]
    case 19: VPump[1]=MID(1);     VPump[2]=VPumpLV[2]; VPump[3]=MID(3);     break; // [0,-,0]
    case 20: VPump[1]=MID(1);     VPump[2]=VPumpLV[2]; VPump[3]=VPumpHV[3]; break; // [0,-,+]
    case 21: VPump[1]=MID(1);     VPump[2]=MID(2);     VPump[3]=VPumpLV[3]; break; // [0,0,-]
    case 22: VPump[1]=MID(1);     VPump[2]=MID(2);     VPump[3]=MID(3);     break; // [0,0,0]
    case 23: VPump[1]=MID(1);     VPump[2]=MID(2);     VPump[3]=VPumpHV[3]; break; // [0,0,+]
    case 24: VPump[1]=MID(1);     VPump[2]=VPumpHV[2]; VPump[3]=VPumpLV[3]; break; // [0,+,-]
    case 25: VPump[1]=MID(1);     VPump[2]=VPumpHV[2]; VPump[3]=MID(3);     break; // [0,+,0]
    case 26: VPump[1]=MID(1);     VPump[2]=VPumpHV[2]; VPump[3]=VPumpHV[3]; break; // [0,+,+]
    case 27: VPump[1]=VPumpHV[1]; VPump[2]=VPumpLV[2]; VPump[3]=VPumpLV[3]; break; // [+,-,-]
    case 28: VPump[1]=VPumpHV[1]; VPump[2]=VPumpLV[2]; VPump[3]=MID(3);     break; // [+,-,0]
    case 29: VPump[1]=VPumpHV[1]; VPump[2]=VPumpLV[2]; VPump[3]=VPumpHV[3]; break; // [+,-,+]
    case 30: VPump[1]=VPumpHV[1]; VPump[2]=MID(2);     VPump[3]=VPumpLV[3]; break; // [+,0,-]
    case 31: VPump[1]=VPumpHV[1]; VPump[2]=MID(2);     VPump[3]=MID(3);     break; // [+,0,0]
    case 32: VPump[1]=VPumpHV[1]; VPump[2]=MID(2);     VPump[3]=VPumpHV[3]; break; // [+,0,+]
    case 33: VPump[1]=VPumpHV[1]; VPump[2]=VPumpHV[2]; VPump[3]=VPumpLV[3]; break; // [+,+,-]
    case 34: VPump[1]=VPumpHV[1]; VPump[2]=VPumpHV[2]; VPump[3]=MID(3);     break; // [+,+,0]
    case 35: VPump[1]=VPumpHV[1]; VPump[2]=VPumpHV[2]; VPump[3]=VPumpHV[3]; break; // [+,+,+]

    default: break;
  }
  #undef MID
}

// =====================================================================
//                         RUN — DoE execution
// =====================================================================
// Iterates through all runs of the selected DoE plan.
// For each run:
//   1. doMode() sets VPump[1..3] to the correct combination.
//   2. Delay_Pump is computed so that every run delivers the same volume
//      (2 * V_total / total_runs / VPump_ref).
//   3. Stepper_setting() applies the new speeds.
//   4. The fastest pump drives the timing; the others are speed-limited.
//   5. impression() logs sensor data at regular intervals.
//
// mirrors the Synchro==2/3 block from original Run()

void Run() {

  // Number of runs: 8 for 2^3, 27 for 3^3
  int total_runs = (DoE_type == 2) ? 8 : 27;
  // Run indices: 2^3 uses 1..8, 3^3 uses 9..35 (offset avoids collision)
  int base_idx   = (DoE_type == 2) ? 1 : 9;

  // Reset cumulative positions
  for (i = 1; i < 4; i++) pos[i] = 0;

  // Find reference speed = max(LV+HV) across all pumps
  // This ensures Delay_Pump is always positive and consistent
  VPump_ref = 0.0;
  for (i = 1; i < 4; i++) {
    float sum = VPumpHV[i] + VPumpLV[i];
    if (sum > VPump_ref) VPump_ref = sum;
  }

  // Duration of each run (minutes): equal volume share per run
  Delay_Pump   = 2.0 * V_total / ((float)total_runs * VPump_ref);
  Delay_Mesure = 1000.0 * 60.0 * Delay_Pump / NbMesure;   // ms

  // ── Loop over every run of the DoE plan ──
  for (j = 0; j < total_runs; j++) {

    // Set pump flow rates for this run
    doMode(base_idx + j);

    // Display current run number and pump speeds on LCD
    format();
    if (DoE_type == 2) { display.println(F("DoE 2^3 RUNNING")); }
    else               { display.println(F("DoE 3^3 RUNNING")); }
    display.print(F("Run ")); display.print(j + 1);
    display.print(F("/")); display.println(total_runs);
    for (i = 1; i < 4; i++) {
      display.print(F("P")); display.print(i);
      display.print(F("=>"));
      display.println(VPump[i], 2);
      // Accumulate target position for this pump
      pos[i] = pos[i] + (long)(Delay_Pump * VPump[i] * step_Tour * Long_Max / (V_total * Rtour_mm));
    }
    display.display();

    // Apply new speeds to steppers
    Stepper_setting();

    // Drive the fastest pump until it reaches its cumulative target.
    // The slower pumps are constrained by their own setMaxSpeed so they
    // automatically reach the correct proportional position.
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

    impression();   // Final measurement at end of this run
  }

  // All runs complete
  RUN = false;
  format();
  display.println(F("  DoE DONE !"));
  display.print(F("  ")); display.print(total_runs);
  display.println(F(" runs done"));
  display.display();
  delay(3000);
  transit(0, 0);
}

// =====================================================================
//                     RECAP SCREEN BUILDER
// =====================================================================
// Populate level-4 recap menu lines with current DoE settings
void buildRecap() {
  // Line 0 — title
  Txt[4][0] = (DoE_type == 2) ? "RECAP DoE 2^3" : "RECAP DoE 3^3";

  // Lines 1..3 — LV / HV values for each pump
  // Use static buffers so pointers remain valid after function returns
  static char r1[14], r2[14], r3[14];
  snprintf(r1, sizeof(r1), "P1 LV%.2f HV%.2f", VPumpLV[1], VPumpHV[1]);
  snprintf(r2, sizeof(r2), "P2 LV%.2f HV%.2f", VPumpLV[2], VPumpHV[2]);
  snprintf(r3, sizeof(r3), "P3 LV%.2f HV%.2f", VPumpLV[3], VPumpHV[3]);
  Txt[4][1] = r1;
  Txt[4][2] = r2;
  Txt[4][3] = r3;
}

// =====================================================================
//                       MENU NAVIGATION
// =====================================================================

// Handle the action associated with the current Niveau / Choice pair
void Programme() {

  // ── Level 0 : main menu ──
  if (Niveau == 0) {
    if (Choice == 1) {
      // Select 2^3 DoE — 8 runs, two levels per factor
      DoE_type = 2;
      // Reset LV/HV flags so a fresh configuration is required
      for (i = 1; i < 4; i++) { LV_set[i] = false; HV_set[i] = false; }
      // Update pump selection menu title
      Txt[1][0] = "SET LV / HV";
      transit(1, 0);
    }
    else if (Choice == 2) {
      // Select 3^3 DoE — 27 runs, three levels per factor
      DoE_type = 3;
      for (i = 1; i < 4; i++) { LV_set[i] = false; HV_set[i] = false; }
      Txt[1][0] = "SET LV / HV";
      transit(1, 0);
    }
    else if (Choice == 3) {
      Reset();
    }
  }

  // ── Level 1 : pump LV/HV selection ──
  // The user selects a pump; they will then pick LV first, then HV
  if (Niveau == 1) {
    for (i = 1; i < 4; i++) {
      if (Choice == i) {
        Pump_Number = i;
        if (!LV_set[i]) {
          // First pass: set the Low value
          format();
          display.print(F("Pump ")); display.print(i);
          display.println(F(": set LV"));
          display.display(); delay(800);
          transit(2, 0);   // go to flow rate page 1
        } else if (!HV_set[i]) {
          // Second pass: set the High value
          format();
          display.print(F("Pump ")); display.print(i);
          display.println(F(": set HV"));
          display.display(); delay(800);
          transit(2, 0);
        } else {
          // Both already set — show confirmation and stay on pump menu
          format();
          display.print(F("Pump ")); display.print(i);
          display.println(F(" already set"));
          display.println(F("SELECT to keep"));
          display.display(); delay(1000);
          transit(1, 0);
        }
      }
    }
  }

  // ── Level 2 : flow rate presets page 1 (SelectV[1..4]) ──
  if (Niveau == 2) {
    for (i = 1; i < 5; i++) {
      if (Choice == i) {
        // Save chosen value to LV or HV depending on what is missing
        if (!LV_set[Pump_Number]) {
          VPumpLV[Pump_Number] = SelectV[i];
          LV_set[Pump_Number]  = true;
          format();
          display.print(F("P")); display.print(Pump_Number);
          display.print(F(" LV=")); display.println(SelectV[i], 2);
          display.println(F("Now pick HV"));
          display.display(); delay(800);
          transit(2, 0);   // stay on page 1 to pick HV
        } else if (!HV_set[Pump_Number]) {
          VPumpHV[Pump_Number] = SelectV[i];
          HV_set[Pump_Number]  = true;
          format();
          display.print(F("P")); display.print(Pump_Number);
          display.print(F(" HV=")); display.println(SelectV[i], 2);
          display.display(); delay(800);
          // Check if all three pumps are fully configured
          bool all_done = LV_set[1] && HV_set[1] &&
                          LV_set[2] && HV_set[2] &&
                          LV_set[3] && HV_set[3];
          if (all_done) { buildRecap(); transit(4, 0); }
          else           { transit(1, 0); }
        }
      }
    }
    if (Choice == 5) { transit(3, 0); }   // More → page 2
  }

  // ── Level 3 : flow rate presets page 2 (SelectV[5..7]) + Adjust ──
  if (Niveau == 3) {
    for (i = 1; i < 4; i++) {
      if (Choice == i) {
        if (!LV_set[Pump_Number]) {
          VPumpLV[Pump_Number] = SelectV[i + 4];
          LV_set[Pump_Number]  = true;
          format();
          display.print(F("P")); display.print(Pump_Number);
          display.print(F(" LV=")); display.println(SelectV[i + 4], 2);
          display.println(F("Now pick HV"));
          display.display(); delay(800);
          transit(3, 0);
        } else if (!HV_set[Pump_Number]) {
          VPumpHV[Pump_Number] = SelectV[i + 4];
          HV_set[Pump_Number]  = true;
          format();
          display.print(F("P")); display.print(Pump_Number);
          display.print(F(" HV=")); display.println(SelectV[i + 4], 2);
          display.display(); delay(800);
          bool all_done = LV_set[1] && HV_set[1] &&
                          LV_set[2] && HV_set[2] &&
                          LV_set[3] && HV_set[3];
          if (all_done) { buildRecap(); transit(4, 0); }
          else           { transit(1, 0); }
        }
      }
    }
    if (Choice == 4) { Adjust(); }         // Fine manual adjustment
    if (Choice == 5) { transit(2, 0); }    // Back to page 1
  }

  // ── Level 4 : recap ──
  if (Niveau == 4) {
    if (Choice == 0) { buildRecap(); transit(4, 0); }   // Refresh recap
    if (Choice == 4) { Run(); }                          // Launch DoE
    if (Choice == 5) { transit(0, 0); }                 // Return to main menu
  }
}

// UP / DOWN scroll menu items; UP+DOWN+SELECT validates selection
// mirrors Select_menu() from original
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

  // Initialise steppers with zero speed (motors stationary at startup)
  for (i = 1; i < 4; i++) VPump[i] = 0.0;
  Stepper_setting();

  // Fill menu level-2 preset text with SelectV values
  for (i = 1; i < 5; i++) {
    dtostrf(SelectV[i],     4, 2, Txt[2][i]);   // Level 2: SelectV[1..4]
  }
  for (i = 1; i < 4; i++) {
    dtostrf(SelectV[i + 4], 4, 2, Txt[3][i]);   // Level 3: SelectV[5..7]
  }

  // Splash screen
  format();
  display.println(F("  DoE PUMPS"));
  display.println(F("  2^3 / 3^3"));
  display.println(F("  Ready !"));
  display.display();
  delay(2000);

  transit(0, 0);
}

// =====================================================================
//                            LOOP
// =====================================================================
void loop() {
  // Any button press interrupts an active run and enters menu navigation
  if (digitalRead(UP) == HIGH || digitalRead(DOWN) == HIGH || digitalRead(SELECT) == HIGH) {
    RUN = false;
    Select_menu();
  }

  // Keep steppers stepping when a run is active
  if (RUN == true) {
    stepper1.run();
    stepper2.run();
    stepper3.run();
  }
}
