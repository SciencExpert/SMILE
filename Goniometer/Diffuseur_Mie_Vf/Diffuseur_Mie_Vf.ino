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

// OLED display TWI address
#define OLED_ADDR   0x3C
#define SSD1306_LCDHEIGHT 32
Adafruit_SSD1306 display(-1);

// Assignation des pins ******************************************************/
#define LASER      11// la valeur 5v du laser
#define SELECT    2// Bouton pour selectionner
#define Photoresisteur   A2// Photoresisteur sur la pin analogique A2
#define pin_servo   9// le controle du servomoteur

// Define three steppers and the pins they will use
AccelStepper stepper1(1, 4, 3);// 1 pour easy driver, pin 10 pour stepPin, pin 9 pour dir Pin
Servo myservo; //creation de l'objet Myservo

// Definition des variables utilisées dans le programme************************/
//
unsigned int nb_step = 3200;//                                                                 00;// réglage moteur step per turn
int tour_max =4;// donne l'angle 360/720 = 0.45
unsigned long  Moyenne=0;
unsigned int  j=0;
unsigned int  jmax=100;// nombre de mesures
unsigned int  i=0;
unsigned int  imax = 180.0*nb_step/(360.0*tour_max);// nombre de mesure, max est de 400 pour une résolution de 3200
unsigned int Val[400];  // valeur des intensités entre 0 et 1024 de l'intensité
unsigned int val;
unsigned long previousMillis=0 ;
unsigned long interval = 10000;
int pos = 0;             // Position sans polariseur
int posSpara = 0;        // Position avec polariseur pour S//
int posSortho = 0;       // Position avec polariseur pour ST


;  // valeur des intensités lissées entre 0 et 1024 de l'intensité
unsigned int lis;
int Div[400];           // valeur des dérivés des intensités entre -1, 0 et 1 de l'intensité
unsigned int pas = 2; // pas de lissage
int theta = i*tour_max;
float angle= (theta*360.0/nb_step)-90 ;
unsigned int delais_mesure=10;//temps entre deux mesures
//

//---- Impression des résultats

void impressionFinale(){
for(i=0;i<401;i++){
Serial.print(i);Serial.print(",");Serial.print(0.45*i,2 );Serial.print(",");
unsigned int val = Val[i];
Serial.print(val);Serial.print(",");

Serial.println();}
}

 void setup()   {
Serial.begin(9600);
Serial.println("OLED intialized");
myservo.write(LOW);
pinMode (LASER,OUTPUT); // Sensor 0
pinMode (Photoresisteur,INPUT); // Photoresisteur
myservo.attach(10);

stepper1.setMaxSpeed(100);
stepper1.setAcceleration(10000);
display.setRotation(2);// on inverse l'écran à 180° pour faire un montage facile - 1=90; 2= 180; 3= 270
display.display();
}
void info(byte a){
display.clearDisplay();
display.setTextSize(2,2);// agrandi x1 en (x) et x2 en (y)
display.setTextColor(WHITE);
if (a == 0){display.setCursor (10,5);display.print("S");display.print(char(185)); display.print(" & S");display.print(char(192)); display.print(" ?");}
if (a==1){display.setCursor (30,5);display.print("Start ? ");}
display.setCursor (8,25);
display.setTextSize(1,1);// agrandi x1 en (x) et x2 en (y)
display.print("Push the button");
display.display();
}
//
//--------------------------------Programme de mesure
void Mesure(){
for (int i = 0; i <imax; i++) {                       // on scanne toutes les angles demandés
theta = i*tour_max;                                   // on recacule l'angle sous la forme de step pour le Nema
angle= (theta*360.0/nb_step)-90.0;                    // on calcule l'angle en degrès pour l'affichage, 0 est l'azimut, -90° est à gauche point de départ, +90° est à droite point d'arrivé
stepper1.runToNewPosition(theta);                     // on place le Nema à la valeur de step désirée
digitalWrite(LASER,HIGH);                             // on active le laser
//
//-------------------------------Mesure de l'intensité de lumière sur une moyenne
Moyenne=0;
      for (j=0;j<jmax;j++){                          // on lance Jmax mesure
      Moyenne= Moyenne + analogRead(Photoresisteur);// Mesure de la valeur du photoresisteur
      delay(delais_mesure);}                        // durée entre deux mesures
Val[i]=Moyenne/jmax;                                // on stock la valeur de lumière à l'angle i dans la matrice de valeur Val[i]
val= Val[i];                                        // val est une donnée utile pour l'impression en directe car on ne peut pas imprimer Val[i] directement
digitalWrite(LASER,LOW);                            // on éteint le laser
//-------------------------------Impression sur l'écran
display.clearDisplay();                // on efface les informations présentes sur l'écran
display.drawRect(0,0,127,30,WHITE);   // on trace un rectangle blanc
display.setTextSize(1,1);             // agrandi x1 en (x) et x2 en (y)
display.setTextColor(WHITE);          // on écrit en blanc sur fond noir
display.setCursor (30,5);             // on place le curseur à x (horizontal) = 30 et Y (vertical) = 5
display.print("Theta= ");             // on écrit Tetha =
display.print(angle,2);               // affiche la valeur de l'angle avec 1 chiffre après la virgule
display.print(" "); display.print(char(167));// symbole °167
display.setCursor (40,20);            // on place le curseur à x (horizontal) = 40 et Y (vertical) = 20
display.print("Dif= ");               // on écrit Dif =
display.print(val);                   // affiche la valeur de val, va de 0 à 1023
display.display();                    // Actualisation de l'écran
//-------------------------------Affichage sur le port com (9600) - Mise en forme pour excel
Serial.print (angle,2);               // affiche la valeur de l'angle avec 1 chiffre après la virgule
Serial.print(",");                    // affiche "," pour séparateur dans excel
Serial.print (val);                  // affiche la valeur de val, va de 0 à 1023
Serial.print(",");                   // affiche "," pour séparateur dans excel
;Serial.print (lis);                // affiche une autre valeur de choix
Serial.println("");                  // on saute de ligne
delay(1000);                        // délais de 1 seconde avant de passer à l'angle suivant
}
theta = 0;                          // on remet l'angle à 0 step 
stepper1.runToNewPosition(theta);  // on retourne à la position initiale 
}
//---Programme de passage S// à ST
void Polarisation(){
myservo.write(pos);  delay(20);
    delay(1000);
}
//----- fin du pilotage du servo


///-----Programme en boucle -----  
void loop() {
  i=31;// temps pour faire un choix
  delay(2000);// pendant 2 secondes
   previousMillis = millis();   
while(millis()-previousMillis <= interval) {
  if(digitalRead(SELECT)==LOW){info(1);
  i=i-1;
 display.setCursor (103,25);//on place le curseur à x 103 et y 25 pour afficher le décompte de temps
 display.print(F("("));display.print(i); display.print(F(")"));display.display();//on affiche le décompte de temps
}//Fin de la boucle while
if(digitalRead(SELECT)==HIGH){Mesure();}// on lance la mesure si le bouton SELECT est appuyé
}}
