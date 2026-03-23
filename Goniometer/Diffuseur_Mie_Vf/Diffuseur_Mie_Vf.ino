//=====================================================
// 		The Goniometer Programme
// Electronic for Chemists Project
// ---------------------------------------
// Design by SciencExpert
// Version 5.02– Mars 2026
// Author : Gerard Bacquet
//=====================================================
// =========================
// REQUIRED LIBRARIES
// =========================
#include <Servo.h>
#include <Wire.h>
#include <SPI.h>
#include <AccelStepper.h>
#include <MultiStepper.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_GFX.h>

// =========================
// OLED DISPLAY CONFIGURATION
// =========================
#define OLED_ADDR 0x3C
#define SSD1306_LCDHEIGHT 32
Adafruit_SSD1306 display(-1);

// =========================
// PIN ASSIGNMENTS
// =========================
#define LASER          11   // Laser power supply (5V)
#define SELECT         2    // Selection push button
#define Photoresistor  A2   // Light sensor (photoresistor)
#define pin_servo      9    // Servo control pin

// =========================
// HARDWARE OBJECTS
// =========================

AccelStepper stepper1(1, 4, 3); // Stepper driver: STEP = D4, DIR = D3
Servo myservo;                  // Servo motor object
// =========================
// GLOBAL VARIABLES
// =========================
unsigned int nb_step = 3200;     // Steps per full rotation
int tour_max = 4;                // Angular step resolution
unsigned long Moyenne = 0;
unsigned int j = 0;
unsigned int jmax = 100;         // Number of measurements per angle
unsigned int i = 0;
unsigned int imax = 180.0 * nb_step / (360.0 * tour_max);
unsigned int Val[400];           // Light intensity values
unsigned int val;
unsigned long previousMillis = 0;
unsigned long interval = 10000;
int pos = 0;                     // No polariser position
int posSpara = 0;                // Parallel polarisation
int posSortho = 0;               // Orthogonal polarisation
unsigned int lis;
int Div[400];
unsigned int pas = 2;
int theta = 0;
float angle = 0;
unsigned int delais_mesure = 10;

// ======================================================
// FUNCTION: Print final results to Serial (CSV format)
// ======================================================

void impressionFinale() {
  for (i = 0; i < 401; i++) {
    Serial.print(i);
    Serial.print(",");
    Serial.print(0.45 * i, 2);
    Serial.print(",");
    unsigned int val = Val[i];
    Serial.print(val);
    Serial.print(",");
    Serial.println();
  }
}


// ======================================================
// FUNCTION: System initialisation (hardware setup)
// ======================================================

void setup() {
  Serial.begin(9600);
  Serial.println("OLED initialised");
  myservo.write(LOW);
  pinMode(LASER, OUTPUT);
  pinMode(Photoresistor, INPUT);
  myservo.attach(10);
  stepper1.setMaxSpeed(100);
  stepper1.setAcceleration(10000);
  display.setRotation(2);
  display.display();
}


// ======================================================
// FUNCTION: Display menu information on OLED screen
// ======================================================

void info(byte a) {
  display.clearDisplay();
  display.setTextSize(2);
  display.setTextColor(WHITE);
  if (a == 0) {
    display.setCursor(10, 5);
    display.print("S// & ST ?");
  }
  if (a == 1) {
    display.setCursor(30, 5);
    display.print("Start ?");
  }
  display.setTextSize(1);
  display.setCursor(8, 25);
  display.print("Press the button");
  display.display();
}

// ======================================================
// FUNCTION: Perform full angular measurement scan
// ======================================================

void Mesure() {
  for (int i = 0; i < imax; i++) {
    // Compute angle and move stepper motor
    theta = i * tour_max;
    angle = (theta * 360.0 / nb_step) - 90.0;
    stepper1.runToNewPosition(theta);

    // Turn laser ON
    digitalWrite(LASER, HIGH);

    // --- Average light measurement ---
    Moyenne = 0;
    for (j = 0; j < jmax; j++) {
      Moyenne += analogRead(Photoresistor);
      delay(delais_mesure);
    }
    Val[i] = Moyenne / jmax;
    val = Val[i];

    // Turn laser OFF
    digitalWrite(LASER, LOW);

    // --- Display on OLED ---
    display.clearDisplay();
    display.drawRect(0, 0, 127, 30, WHITE);
    display.setTextSize(1);
    display.setCursor(30, 5);
    display.print("Theta= ");
    display.print(angle, 2);
    display.print(" ");
    display.print(char(167)); // Degree symbol
    display.setCursor(40, 20);
    display.print("Value= ");
    display.print(val);
    display.display();

    // --- Serial output (CSV format) ---
    Serial.print(angle, 2);
    Serial.print(",");
    Serial.print(val);
    Serial.print(",");
    Serial.print(lis);
    Serial.println();
    delay(1000);
  }

  // Return to initial position
  theta = 0;
  stepper1.runToNewPosition(theta);
}

// ======================================================
// FUNCTION: Control polarisation using servo motor
// ======================================================

void Polarisation() {
  myservo.write(pos);
  delay(20);
  delay(1000);
}

// ======================================================
// FUNCTION: Main loop (user interaction & execution)
// ======================================================

void loop() {
  i = 31;               // Countdown timer
  delay(2000);
  previousMillis = millis();
  while (millis() - previousMillis <= interval) {
    if (digitalRead(SELECT) == LOW) {
      info(1);
      i--;
      display.setCursor(103, 25);
      display.print("(");
      display.print(i);
      display.print(")");
      display.display();
    }
    // Launch measurement if button is pressed
    if (digitalRead(SELECT) == HIGH) {
      Mesure();
    }
  }
}
