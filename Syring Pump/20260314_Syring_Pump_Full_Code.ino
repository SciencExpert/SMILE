//=====================================================
// Syringe pump control program
// Sub programm of syringe pump
// Electronic for Chemists Project
// ---------------------------------------
// Design by SciencExpert
// Version 5.00– Mars 2026
// Author : Gerard Bacquet
//=====================================================
//
// ___/   SHORT DESCRIPTION   \____________________________________________________________________________
//  	This program allows you to control three syringe pumps simultaneously and in a controlled manner 
//	It also enables you to record feedback from eight sensors

// _____________/   USAGE OF THIS PROGRAM \______________________________________________________________
//USAGE OF THIS PROGRAM
//	This program is used to control three syringe pumps and measure five sensors.
//	Fixed mode: the three syringe pumps are independent.
//	Synchronous mode: The three syringe pumps are synchronised with a constant total flow rate.
//	2³ and 3³ experimental design modes.

// ______________________________/   Library \_____________________________________________________________
#include <SPI.h>
#include <AccelStepper.h>
#include <MultiStepper.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_PCD8544.h>

// _________________________________________/   Pins Assignation \__________________________________________

Adafruit_PCD8544 display = Adafruit_PCD8544(5, 6, 7, 8,9);
#define LOGO16_GLCD_HEIGHT 16
#define LOGO16_GLCD_WIDTH  16

#define UP        	2		// Button to increase the value
#define SELECT    	3		// Button to select the value
#define DOWN      	4		// Button to decrease the value
#define Sensor0   	A0		// Sensor 0
#define Sensor1   	A1		// Sensor 1
#define Sensor2   	A2		// Sensor 2
#define Sensor3   	A3		// Sensor 3
#define Sensor4   	A4		// Sensor 4
#define Sensor5   	A5		// Sensor 5

AccelStepper stepper1(1, 10, 9);		// Pump 1 - 1 for easy driver, pin 10 for stepPin, pin 9 for dir Pin
AccelStepper stepper2(1, 11, 9); 		// Pump 2 - 1 for easy driver, pin 11 for stepPin, pin 9 for dir Pin
AccelStepper stepper3(1, 12, 9);		// Pump 3 - 1 for easy driver, pin 12 for stepPin, pin 9 for dir Pin

// ____________________________________________________/   Variables \_______________________________
int var=2301;			// Any variable
byte contraste=60;			// Contrast Screen
byte dualtime=255;			// The time allowed for each level is limited to 255 microseconds.
byte i;				// counter limited to 255
int j;				// counter limited to 255
byte k;				// counter limited to 255
byte a;				// counter limited to 255
byte b;				// counter limited to 255
bool LV[4]={0,0,0,0};			// Baseline data for DoE - Low values
bool HV[4]={0,0,0,0};			// Baseline data for DoE - High values 
float x;				// Sensor value (volt)
long Vcc=5.0;			// Sensor supply voltage
unsigned long currentTime=0;		// Used to define when measurements should be taken.
unsigned long previousTime=0;		// Used to define when measurements should be taken.
float NbMesure=10.0;			// Number of measurements taken between each step

// _______________________________________________________________/   Sensor Data \______________________
//			 The Sensor[8] reading matrix from 0 to 8.
float Sensor[8]
={digitalRead(A0)*Vcc/1023.0,digitalRead(A1)*Vcc/1023.0,digitalRead(A2)*Vcc/1023.0,digitalRead(A3)*Vcc/1023.0,digitalRead(A4)*Vcc/1023.0,digitalRead(A5)*Vcc/1023.0,digitalRead(A6)*Vcc/1023.0,digitalRead(A7)*Vcc/1023.0};
//			 The F[8]  functions that convert tensions into values.
float F[8]={1.0*x+1.0,1*x+2.0,1*x+3.0,1*x+4.0,1*x+5.0,1*x+6.0,1*x+7.0,1*x+8.0};
//			 The unit associated with the measurements on the analogue pins is 9.
char* Data[9]={"Temp","Pot", "Cond", "Turb","4","5","6","7", "ml/min"};
char* unite[9]={"°C","mV", "mS", "3","4","5","6","7", "ml/min"};

// __________________________________________________________________________/   Pump Data \___________
int gearbox=16;			// Gear Box reduction speed
int Synchro = 0;			//  Pump Status : 0 independant – 1 Synchronised – 2 DoE 2^^3 – 3DoE 3^^3
byte N;				//  Number of synchronisation points
bool Dim = true; 			//  true for 3 pumps, false for 2 pumps
float VPump [5]={0.0,0,0,0.0,50};		//  Initial speed of Pump[i] -  VPump [0] speed for synchronised pumps - VPump[4] reset speed
float VPumpLV [5]={0.1,0.1,0.5,0.5,5.0};	//  Idem for Low value of a DoE (-1)
float VPumpHV [5]={1.0,1.0,1.0,1.0,5.0};	//  idem forHigh  value of a DoE (+1)
float SelectV[9]={0,0.05,0.1,0.2,0.5,0.75,1.0,2.0,5.0};//Proposed Speed Pump ml/min
float VPump_123=VPump [0];		//  Initial velocity of the sum of the pumps, in units.
byte Pump_Number;			//  Pump Number – 0 deal with all pumps
long pos[4]={0.0,0.0,0.0,0.0};		//  Pump Position
float Delay_Pump123;			//  Synchronization duration in minutes
float Delay_Mesure;			//  The delay between two sensor measurements.
bool RUN=false;			//  Pump Starter index

// __________________________________________________________________________________/   Step Motor Data \_
int acceleration = 1000000;		//  Step Motor Acceleration
float V_total = 19.0;			// Syring Volum
long step_Tour=1600;			// Number of Step per min (see M1 & M2 connection)
long Long_Max=60;			// Number of turn to get V_total
float Rtour_mm = 1.0/gearbox;		// Turns per mm: the number of millimetres per turn depends on the chosen screw. M5 = 1.
long  Conversion = step_Tour*Long_Max/(Rtour_mm*V_total*60);// Convertion factor calculation
long tour_max=step_Tour*Long_Max/Rtour_mm ;// Number of turn before final stop
  
// ___/   Menu Text \________________________________________________________________________________
//-----Level 0 text Menu
byte k1_max [] = {5,5,5,5,5,5,5};		// Maximum menu length at all levels
byte k1[8]={1,1,1,1,1,1,1,1};		// Active values are set by default.
byte Niveau=0;			// Menu Level Index
byte Choice=0;			// Menu SubLevel Index
char* info;				// Various text 
char *Txt [6][6]= {
  //  niveau 0 de menu : réglage des pompes 1 ; 2 ; 3  individuellement ou 123 synchronisée Reset ou start
{"Menu"," >Fixed", " >Synchro"," >DoE 2^3", " >DoE 3^3","=> 0"},// => Textes du niveau 0

//-----Menu Level 1 text Menu
{"SELECT","", "" ,"", "RECAP","Run"},				//  Level 1 text Menu

// --- Menu Level 2: Pump flow rate values #1 - The actual values are changed in the setup
{"FLOW RATE","VAL1", "VAL2","VAL3","VAL4","Other"},		// Level 2 text Menu

// Menu level 3: Pump flow rate values #2
{"FLOW RATE","VAL5", "VAL6","VAL.7","Adjust","Reset"},		// Level 3 text Menu

// Menu level 4: Synchronized pump step values
{"STEP","3P:20%", "3P:33%","2P: 5%", "2P:10%","Reset"},		// Level 4 text Menu

// Menu level 5 : Sumarize
{"RECAP", "", "","", "Run","Main Menu"},			// Level 5 text Menu

};
 
//===============================================================================================
//			Programmes
//===============================================================================================


// ___/   1) Design of Experiment \______________________________________________________________________

void doMode(int var){
//-----DoE 2^3 = 8 cases
  switch(var){
  case 2301:VPump[1]= VPumpLV[1];VPump[2]= VPumpLV[2];VPump[3]= VPumpLV[3]; break;// DoE2^3 valeur [-,-,-]
  case 2302:VPump[1]= VPumpHV[1];VPump[2]= VPumpLV[2];VPump[3]= VPumpLV[3]; break;// DoE2^3 valeur [+,-,-]
  case 2303:VPump[1]= VPumpLV[1];VPump[2]= VPumpHV[2];VPump[3]= VPumpLV[3]; break;// DoE2^3 valeur [-,+,-]
  case 2304:VPump[1]= VPumpHV[1];VPump[2]= VPumpHV[2];VPump[3]= VPumpLV[3]; break;// DoE2^3 valeur [+,+,-] 
  case 2305:VPump[1]= VPumpLV[1];VPump[2]= VPumpLV[2];VPump[3]= VPumpHV[3]; break;// DoE2^3 valeur [-,-,+]
  case 2306:VPump[1]= VPumpHV[1];VPump[2]= VPumpLV[2];VPump[3]= VPumpHV[3]; break;// DoE2^3 valeur [+,-,+]
  case 2307:VPump[1]= VPumpLV[1];VPump[2]= VPumpHV[2];VPump[3]= VPumpHV[3]; break;// DoE2^3 valeur [-,+,+]
  case 2308:VPump[1]= VPumpHV[1];VPump[2]= VPumpHV[2];VPump[3]= VPumpHV[3]; break;// DoE2^3 valeur [+,+,+]

//-----DoE 3^3 = 27 case-L27 de Tagushi
  case 3301:VPump[1]= VPumpLV[1];VPump[2]= VPumpLV[2];VPump[3]= VPumpLV[3]; break;                                           // DoE3^3 valeur [-,-,-]
  case 3302:VPump[1]= VPumpLV[1];VPump[2]= VPumpLV[2];VPump[3]= (VPumpHV[3]+VPumpLV[3])/2; break;           // DoE3^3 valeur [-,-,0]
  case 3303:VPump[1]= VPumpLV[1];VPump[2]= VPumpLV[2];VPump[3]= VPumpHV[3]; break;                                           // DoE3^3 valeur [-,-,+]
  case 3304:VPump[1]= VPumpLV[1];VPump[2]= (VPumpHV[2]+VPumpLV[2])/2;VPump[3]= VPumpLV[3]; break;           // DoE3^3 valeur [-,0,-]
  case 3305:VPump[1]= VPumpLV[1];VPump[2]= (VPumpHV[2]+VPumpLV[2])/2;VPump[3]=(VPumpHV[3]+VPumpLV[3])/2; break;  // DoE3^3 valeur [-,0,0]
  case 3306:VPump[1]= VPumpLV[1];VPump[2]= (VPumpHV[2]+VPumpLV[2])/2;VPump[3]=VPumpHV[3]; break;                                // DoE3^3 valeur [-,0,+]
  case 3307:VPump[1]= VPumpLV[1];VPump[2]= VPumpHV[2];VPump[3]= VPumpLV[3]; break;                                              // DoE3^3 valeur [-,+,-]  
  case 3308:VPump[1]= VPumpLV[1];VPump[2]= VPumpHV[2];VPump[3]=(VPumpHV[3]+VPumpLV[3])/2; break;                // DoE3^3 valeur [-,+,0]
  case 3309:VPump[1]= VPumpLV[1];VPump[2]= VPumpHV[2];VPump[3]= VPumpHV[3]; break;                                              // DoE3^3 valeur [-,+,+]
  case 3310:VPump[1]=(VPumpHV[1]+VPumpLV[1])/2;VPump[2]= VPumpLV[2];VPump[3]= VPumpLV[3]; break;                 // DoE3^3 valeur [0,-,-]
  case 3311:VPump[1]=(VPumpHV[1]+VPumpLV[1])/2;VPump[2]= VPumpLV[2];VPump[3]=(VPumpHV[3]+VPumpLV[3])/2; break; // DoE3^3 valeur [0,-,0]
  case 3312:VPump[1]=(VPumpHV[1]+VPumpLV[1])/2;VPump[2]= VPumpLV[2];VPump[3]= VPumpHV[3]; break;                                // DoE3^3 valeur [0,-,+]
  case 3313:VPump[1]=(VPumpHV[1]+VPumpLV[1])/2;VPump[2]=(VPumpHV[2]+VPumpLV[2])/2;VPump[3]= VPumpLV[3]; break;  // DoE3^3 valeur [0,0,-]
  case 3314:VPump[1]=(VPumpHV[1]+VPumpLV[1])/2;VPump[2]=(VPumpHV[2]+VPumpLV[2])/2;VPump[3]= (VPumpHV[3]+VPumpLV[3])/2; break;   
  case 3315:VPump[1]=(VPumpHV[1]+VPumpLV[1])/2;VPump[2]=(VPumpHV[2]+VPumpLV[2])/2;VPump[3]= VPumpHV[3]; break;   // DoE3^3 valeur [0,0,+]
  case 3316:VPump[1]=(VPumpHV[1]+VPumpLV[1])/2;VPump[2]= VPumpHV[2];VPump[3]= VPumpLV[3]; break;                                // DoE3^3 valeur [0,+,-]
  case 3317:VPump[1]=(VPumpHV[1]+VPumpLV[1])/2;VPump[2]= VPumpHV[2];VPump[3]=(VPumpHV[3]+VPumpLV[3])/2; break;     // DoE3^3 valeur [0,+,0]
  case 3318:VPump[1]=(VPumpHV[1]+VPumpLV[1])/2;VPump[2]= VPumpHV[2];VPump[3]= VPumpHV[3];  break;                               // DoE3^3 valeur [0,+,+]
  case 3319:VPump[1]= VPumpHV[1];VPump[2]= VPumpLV[2];VPump[3]= VPumpLV[3]; break;                                              // DoE3^3 valeur [+,-,-]
  case 3320:VPump[1]= VPumpHV[1];VPump[2]= VPumpLV[2];VPump[3]=(VPumpHV[3]+VPumpLV[3])/2; break;                                // DoE3^3 valeur [+,-,0]
  case 3321:VPump[1]= VPumpHV[1];VPump[2]= VPumpLV[2];VPump[3]= VPumpHV[3]; break;                                              // DoE3^3 valeur [+,-,+]
  case 3322:VPump[1]= VPumpHV[1];VPump[2]=(VPumpHV[2]+VPumpLV[2])/2;VPump[3]= VPumpLV[3]; break;                                // DoE3^3 valeur [+,0,-]
  case 3323:VPump[1]= VPumpHV[1];VPump[2]=(VPumpHV[2]+VPumpLV[2])/2;VPump[3]=(VPumpHV[3]+VPumpLV[3])/2; break; // DoE3^3 valeur [+,0,0]
  case 3324:VPump[1]= VPumpHV[1];VPump[2]=(VPumpHV[2]+VPumpLV[2])/2;VPump[3]= VPumpHV[3];; break;                               // DoE3^3 valeur [+,0,+]
  case 3325:VPump[1]= VPumpHV[1];VPump[2]= VPumpHV[2];VPump[3]= VPumpLV[3]; break;                                              // DoE3^3 valeur [+,+,-]
  case 3326:VPump[1]= VPumpHV[1];VPump[2]= VPumpHV[2];VPump[3]=(VPumpHV[3]+VPumpLV[3])/2; break;                                // DoE3^3 valeur [+,+,0]
  case 3327:VPump[1]= VPumpHV[1];VPump[2]= VPumpHV[2];VPump[3]= VPumpHV[3]; break;                                              // DoE3^3 valeur [+,+,+]

//-----Others situations
  default :
    break;
}}  

// _____________/   Run Step Motor \____________________________________________________________
// This code sets the system to run mode, updates the three stepper motors so they continue moving toward their targets, and checks for an emergency condition.

void active () {
RUN=true;
stepper1.run();
stepper2.run();
stepper3.run();
emergency();
}

// ________________________/   Menu \____________________________________________________________
// This function sets the menu text depending on the value of a, displaying either pump selection options or LV–HV selection options.

void Texte(byte a){
if (a==0){Txt[1][0]="SELECT";Txt[1][1]="=>Select Pump1";Txt[1][2]="=>Select Pump2";Txt[1][3]="=>Select Pump3";};
if (a==2 || a==3){Txt[1][0]="SELECT LV-HV";Txt[1][1]="=>Pump1 LV-HV";Txt[1][2]="=>Pump2 LV-HV";Txt[1][3]="=>Pump3 LV-HV";};
}

// ___________________________________/   Menu Format \____________________________________________
// This Arduino function clears the display and sets the default text settings (text size, color, and cursor position) so the screen is ready to print new text.

void format (){
display.clearDisplay();display.setTextSize(1);display.setTextColor(BLACK,WHITE);display.setCursor(0,0);
}

// _____________________________________________/   Transit \_________________________________________
// This function changes the current menu level and selection, updates the display by calling Affiche_menu, and pauses briefly with a delay.

void transit(byte a,byte b){
 Niveau=a;k1[Niveau]=0;Choice=b;Affiche_menu(Niveau);delay(dualtime);
}

// ____________________________________________________/  Return to zero\_________________________________________
// This function returns the system to its initial state by displaying “Back to zero”, resetting pump values, moving the steppers back to position zero, and returning
// to the main menu.

void Return_to_zero(){
RUN=true;
format();
display.println(F("Back to zero"));
display.display(); delay(1000);
for (i=1;i<4;i++){
VPump[i]=VPump[4];
}
Stepper_setting();
stepper1.moveTo(-stepper1.currentPosition());
stepper2.moveTo(-stepper2.currentPosition());
stepper3.moveTo(-stepper3.currentPosition());
transit(0,0); 
}

// _________________________________________________________/  Reset\____________________________________
// This function resets the system variables and pump values, restores the default menu text, displays a reset confirmation message, 
// waits 10 seconds, and returns to the main menu.

void Reset (){
Synchro = 0; 
RUN==false; 
for (i=0;i<4;i++){VPump [i]=0.0;};
Txt [1][1]= "=>Select Pump1";
Txt [1][2]= "=>Select Pump2";
Txt [1][3]= "=>Select Pump3";
format();
display.println(F("Reset done"));
display.println(F("Main menu-10s"));
display.display();delay(10000);
transit(0,0);
}

// __________________________________________________________________/  Emergency stop\_____________________
// This function detects specific button combinations to trigger an emergency stop: 
// it stops the system, resets motor positions, and returns to the summary menu.

void emergency() {
              if (digitalRead(UP)==HIGH & digitalRead(DOWN)==LOW & digitalRead(SELECT)==HIGH){RUN==false;
 for (i=1;i<4;i++){
pos[i]=0.0;transit(5,0);
pos[1]=stepper1.AccelStepper::currentPosition  (   );
pos[2]=stepper2.AccelStepper::currentPosition  (   );
pos[3]=stepper3.AccelStepper::currentPosition  (   );}
}
  if (digitalRead(UP)==HIGH & digitalRead(DOWN)==HIGH & digitalRead(SELECT)==LOW){
RUN==false;
 	for (i=1;i<4;i++){
pos[i]=0.0;transit(5,0);}
}
              	if (digitalRead(UP)==LOW & digitalRead(DOWN)==HIGH & digitalRead(SELECT)==HIGH){
RUN==false; 
for (i=1;i<4;i++){
pos[i]=0.0;transit(5,0);
}
}
  }

// ________________________________________________________________________/  Step Motor Setting\______________
// This function configures the three stepper motors by setting their maximum speed and acceleration based on pump values, 
// then commands them to move to the maximum target position.

void Stepper_setting(){  
stepper1.setMaxSpeed(VPump[1]*Conversion);
stepper2.setMaxSpeed(VPump[2]*Conversion);
stepper3.setMaxSpeed(VPump[3]*Conversion);    
stepper1.setAcceleration(acceleration);
stepper2.setAcceleration(acceleration);
stepper3.setAcceleration(acceleration);
stepper1.moveTo(tour_max);
stepper2.moveTo(tour_max);
stepper3.moveTo(tour_max); 
}

// ___/   2) Stand Alone Programme (Selections per User) \___________________________________________
//This function lets the user adjust the pump speed using the UP and DOWN buttons, updates the display in real time, 
//and saves the selected speed when SELECT is pressed.

void Adjust (){
float delta = 0;
for (j=0;j<10;j++){
delay(dualtime);
if(SelectV[7]<=0.10 && SelectV[7]>0.0 )	{delta = 0.05;}
if(SelectV[7]<=2.0 && SelectV[7]>0.1 )	{delta = 0.1;}
if(SelectV[7]>2.0 && SelectV[7]<20.0 )	{delta = 0.5;}
       	 if (digitalRead(UP)==LOW && digitalRead(DOWN)==HIGH& digitalRead(SELECT)==LOW){
 j=0;SelectV[7]=SelectV[7]-delta;
}
        	if (digitalRead(UP)==HIGH && digitalRead(DOWN)==LOW & digitalRead(SELECT)==LOW){
j=0;SelectV[7]=SelectV[7]+delta;
}
       	 format();display.println(F(" Adjust Speed"));
display.println(F("  UP or DOWN"));display.println();
display.print(F("  <= "));
display.print(SelectV[7]);display.println(F(" =>"));
display.println();
display.println(F(" Press SELECT"));
        	display.display();

if (digitalRead(SELECT)==HIGH){ 
       		if (Synchro == 0){
VPump[Pump_Number]=SelectV[7];
dtostrf(SelectV[7], 4, 2, Txt[1][Pump_Number]);
transit(1,0);
}
      		 if (Synchro == 1) {
VPump[0]=SelectV[7];
dtostrf(SelectV[i], 4, 2, Txt[1][0]);transit(4,0);
}
       		 j=10;	
}
}
}






// ______________/   Run Step Motor \___________________________________________
// The function calculates pump timing, controls stepper motors to deliver precise volumes, and displays the current state of the pumps on a screen. It also handles multiple operation modes including simple, synchronized, and experimental plans.



void Run (){
//------------------------------------------------------------------------------------------------------------------------------------------
// Simple mode (Synchro == 0):
//	Determines which pump has the highest flow rate and uses it as a reference.
//	Calculates the timing (Delay_Pump123) for each pump to deliver a total volume V_total.
//	Moves the stepper motors until each pump has delivered its assigned volume.
//	Updates the display with pump speeds and running status.
//------------------------------------------------------------------------------------------------------------------------------------------
if (Synchro == 0){
format();display.println(F("   RUNNING")); display.println(F("   pumps"));
if (VPump[1]>VPump[2] && VPump[1]>VPump[3]){
VPump[0]=VPump[1];
}
else if (VPump[2]>VPump[3]){
VPump[0]=VPump[2];
}
else{
VPump[0]=VPump[3];
}
Delay_Pump123= V_total/VPump[0];
Delay_Mesure=1000.0*60.0*Delay_Pump123/NbMesure;
pos[0]=Delay_Pump123*VPump [0]*step_Tour*Rtour_mm*Long_Max/V_total;

for (i=1;i<4;i++){
        		display.print(F("Pump")); display.print(i); display.print(F(" => "));display.println(VPump [i],2);}
        		display.display();
 		 Stepper_setting();
         		while (stepper1.AccelStepper::currentPosition  (   ) <= pos[0] || stepper2.AccelStepper::currentPosition  (   ) <= pos[0]   || stepper3.AccelStepper::currentPosition  (   ) <=pos[0]   ){
active();
impression();  
}
RUN=false ;
impression();
}
 transit(0,0);
//------------------------------------------------------------------------------------------------------------------------------------------
// Synchronized mode (Synchro == 1):
//	Runs the pumps in a coordinated manner according to a triangular formulation pattern.
//	Adjusts each pump’s speed proportionally so that the total output remains constant.
//	Stepper motors are moved to their new positions sequentially, ensuring proper synchronization.
//	Display shows the current pump rates during the operation.
//------------------------------------------------------------------------------------------------------------------------------------------
if (Synchro == 1){
 	 for (i=1;i<4;i++){
pos[i]=0.0;
}
 	for (j=0;j<N;j++){ 
for (k=0;k<N-j;k++){  
float r1=Dim*1.0*(k+j)/(N-1);// si 2 pompes r1=0, sinon (k+j)/(N-1)
           			 k=Dim*(k-N)+N;
            			Delay_Pump123= (2+Dim)*V_total/((1+Dim*((N/2)-1))*(N+1)*VPump[0]);
            			Delay_Mesure=1000.0*60.0*Delay_Pump123/NbMesure;
            			float r2=1.0 *j/(N-1); 
VPump [1]=VPump[0]*r2;
      			VPump [3]= Dim *VPump[0]*(1.0-r1); 
      			VPump [2]= VPump[0]-VPump[1]-VPump[3]; 
format(); display.println(F("Synchronized  Running"));display.println();
  				for (i=1;i<4;i++){
          				display.print(F("Pump")); display.print(i); display.print(F(" => "));display.println(VPump [i],2);
           				pos[i]=pos[i]+Delay_Pump123*VPump [i]*step_Tour*Long_Max/(V_total*Rtour_mm);
}
           			display.display();
           			Stepper_setting();
      			if ( VPump [1]> VPump [2] && VPump[1]> VPump[3]){
       				while (stepper1.AccelStepper::currentPosition  (   ) <= pos[1]) {
active();
impression();
}
}
          			else if ( VPump [2]> VPump [1] && VPump[2]> VPump[3]){
          				while (stepper2.AccelStepper::currentPosition  (   ) <= pos[2]) {
active();
impression();
}
}
                  			else if ( VPump [3]> VPump [1] && VPump[3]> VPump[2]){
                  				while (stepper3.AccelStepper::currentPosition  (   ) <= pos[3]) {
active();
impression();
}
}
impression();          
}
       	          }
}
//------------------------------------------------------------------------------------------------------------------------------------------
//Design of Experiments mode (Synchro == 2 or 3):
//	Uses predefined high/low flow rate combinations (VPumpHV and VPumpLV) for 2³ or 3³ experiments.
//	Assigns pump speeds according to the experimental plan.
//	Controls the stepper motors to deliver the calculated volumes for each experiment iteration.
//	Updates the display with the current experimental conditions.
//------------------------------------------------------------------------------------------------------------------------------------------

if (Synchro == 2 || Synchro == 3 ){
  	for (i=1;i<4;i++){
pos[i]=0.0;
}

if (VPumpHV[1]+VPumpLV[1]>VPumpHV[2]+VPumpLV[2] && VPumpHV[1]+VPumpLV[1]>VPumpHV[3]+VPumpLV[3]){
VPump[0]=VPumpHV[1]+VPumpLV[1];
}

else if (VPumpHV[2]+VPumpLV[2]>VPumpHV[3]+VPumpLV[3]){
VPump[0]=VPumpHV[2]+VPumpLV[2];
}

else{
VPump[0]=VPumpHV[3]+VPumpLV[3];}
Delay_Pump123= 2*V_total/(pow(Synchro,3)*VPump[0]);
Delay_Mesure=1000.0*60.0*Delay_Pump123/NbMesure;
for (j=0;j<pow(Synchro,3)+1;j++){
doMode(Synchro*1000+300+1+j);
format(); display.println(Txt[0][Synchro+1]);display.println();
 			for (i=1;i<4;i++){
          			display.print(F("Pump")); display.print(i); display.print(F(" => "));display.println(VPump [i],2);
          			pos[i]=pos[i]+Delay_Pump123*VPump [i]*step_Tour*Long_Max/(V_total*Rtour_mm);
}
           		display.display();
Stepper_setting(); 
     		 if ( VPump [1]>=VPump [2] && VPump[1]> VPump[3]){
 			while (stepper1.AccelStepper::currentPosition  (   ) <= pos[1]) {
active();
impression();
}
}
          		else if ( VPump [2]> VPump [1] && VPump[2]> VPump[3]){
          			while (stepper2.AccelStepper::currentPosition  (   ) <= pos[2]) {
active();
impression();
}
}
                  		else if ( VPump [3]>= VPump [1] && VPump[3]>= VPump[2]){
                  			while (stepper3.AccelStepper::currentPosition  (   ) <= pos[3])  {
active();
impression();
}
}   
          }
}     
         transit(0,0);// fin et retour au menu
}



// __________/  Menu Display (affiche) \____________________________________________________________________________
// This function prints a 7-item menu on the display and highlights the currently selected option using inverted colors.
// This function displays a menu on a screen (likely an OLED display using a library such as Adafruit GFX).
//	It first calls the function format(), which clears or formats the display.
//	It then loops through 7 menu items (for (i=0;i<7;i++)).
//	Each menu line is printed from the array Txt[Niveau][i], which likely stores menu text for different menu levels (Niveau).
//	The program checks whether the current line corresponds to the selected menu option (Choice-1).
//	If it is selected, the text color is inverted (WHITE text on BLACK background).
//	 If it is not selected, the text is displayed normally (BLACK text on WHITE background).
//	Finally, display.display() updates the screen to show the menu.

void Affiche_menu(int Niveau){
format();
for (i=0;i<7;i++){
      display.println(Txt [Niveau][i]);
      if(i==Choice-1 ){
display.setTextColor(WHITE, BLACK);
}
      else {
display.setTextColor(BLACK,WHITE);
} 
  }
  display.display();
  }

// ________________________/  Impression \______________________________________________________________
// The function impression() periodically sends measurement data to the serial port for logging with PLX-DAQ in Excel
//It first reads the current time using millis() and checks if the elapsed time since the last transmission exceeds Delay_Mesure.
// If so, it updates previousTime and sends a new line of data.
//The transmitted data include:
//	Pump values (VPump[1], VPump[2], VPump[3])
//	Sensor readings from A0 to A5 (F[0] to F[5], printed with two decimals)
//	Timing parameters (Delay_Pump123 and Delay_Mesure)
//	The data are formatted with commas so they appear as separate columns in Excel.

void impression(){
currentTime=millis();
if((currentTime-previousTime)>Delay_Mesure){
previousTime=currentTime;
Serial.print("DATA,TIME,");
Serial.print(VPump[1]);Serial.print(",");
Serial.print(VPump[2]);Serial.print(",");
Serial.print(VPump[3]);Serial.print(",");
x=Sensor[0];Serial.print(F[0],2);Serial.print(",");
x=Sensor[1];Serial.print(F[1],2);Serial.print(",");
x=Sensor[2];Serial.print(F[2],2);Serial.print(",");
x=Sensor[3];Serial.print(F[3],2);Serial.print(",");
x=Sensor[4];Serial.print(F[4],2);Serial.print(",");
x=Sensor[5];Serial.print(F[5],2);Serial.print(",");
Serial.print( Delay_Pump123,2);Serial.print(",");
Serial.print( Delay_Mesure,2);
Serial.println();} 
}


// ________________________/  Menu \______________________________________________________________
// the function Select_menu() manages navigation and selection in the menu using three buttons: UP, DOWN, and SELECT.
//	If the UP button is pressed, the program moves down to the next menu item. If the last item is reached, it returns to the first one.
//	If the DOWN button is pressed, the program moves up to the previous menu item. If the first item is reached, it loops to the last one.
//	If UP and DOWN are pressed together while SELECT is active, the function Programme() is executed to validate the selected menu option.
//After each action, Affiche_menu(Niveau) updates the display, and a short delay (dualtime) prevents very

void Select_menu(){  
if (digitalRead(UP)==LOW && digitalRead(DOWN)==HIGH & digitalRead(SELECT)==LOW){
  	if (Choice>=k1_max[Niveau]){
Choice=k1[Niveau];Affiche_menu(Niveau);
}
  	else{
Choice=Choice+1;Affiche_menu(Niveau);
}
}

if (digitalRead(DOWN)==LOW && digitalRead(UP)==HIGH & digitalRead(SELECT)==LOW){
    	 if (Choice<=1){
Choice= k1_max [Niveau];Affiche_menu(Niveau);
}
     	else if(Choice >1){
Choice=Choice-1;Affiche_menu(Niveau);
}
}

if (digitalRead(UP)==LOW & digitalRead(DOWN)==LOW & digitalRead(SELECT)==HIGH){
delay(dualtime);Programme();
}
delay(dualtime);// temps entre deux passages de ligne
 }

// ____________________________________/Programme Menu \______________________________________________________________
// The function Programme() manages the actions associated with each menu selection depending on the current menu level (Niveau).


void Programme() {

  // ---------------- Menu 0 (Main menu) ----------------
  // Select operating mode or return to zero
  if (Niveau == 0) {

    if (Choice == 1) {
      Synchro = 0;
      Texte(0);
      a = 0;
      transit(1, 0);
    }

    if (Choice == 2) {
      Synchro = 1;
      a = 1;
      transit(2, 0);
    }

    if (Choice == 3 || Choice == 4) {
      Synchro = Choice - 1;
      Texte(3);
      transit(1, 0);
    }

    if (Choice == 5) {
      Return_to_zero();
      transit(0, 0);
    }
  }


  // ---------------- Menu 1 ----------------
  // It allows the user to choose a pump, display a summary, or start the experiment with Run().
  if (Niveau == 1) {

    for (i = 1; i < 4; i++) {

      if (Choice == i) {

        if (LV[i] == true && HV[i] == true) {
          Txt[1][Pump_Number] = "1-2";
          transit(1, 0);
        }
        else {
          Pump_Number = i;
          transit(2, 0);
        }
      }
    }

    if (Choice == 4) {
      transit(5, 0);
    }

    if (Choice == 5) {
      Run();
    }
  }


  // Synchronization management
  if (Synchro != 1) {
    j = 1;
  }

  if (Synchro == 1) {
    Pump_Number = 0;
    j = 4;
  }


  // ---------------- Menu 2 ----------------
  // These menus are used to set pump flow rates. The user can adjust pump voltages individually or define low and high values for DoE experiments.
  if (Niveau == 2) {

    for (i = 1; i < 5; i++) {

      if (Choice == i) {

        if (Synchro < 2) {
          VPump[Pump_Number] = SelectV[i];
          dtostrf(VPump[Pump_Number], 4, 2, Txt[1][Pump_Number]);
        }

        if (Synchro >= 2) {

          if (HV[Pump_Number] == false) {

            if (LV[Pump_Number] == true) {
              HV[Pump_Number] = true;
              VPumpHV[Pump_Number] = SelectV[i];
              Txt[1][Pump_Number] = "DONE";
              delay(500);
            }

            if (LV[Pump_Number] == false) {
              LV[Pump_Number] = true;
              VPumpLV[Pump_Number] = SelectV[i];
              Txt[1][Pump_Number] = "HV?";
              delay(500);
            }
          }
        }

        transit(j, 0);
      }
    }

    if (Choice == 5) {
      transit(3, 0);
    }
  }


  // ---------------- Menu 3 ----------------
// These menus are used to set pump flow rates. The user can adjust pump voltages individually or define low and high values for DoE experiments.
  if (Niveau == 3) {

    for (i = 1; i < 4; i++) {

      if (Choice == i) {

        VPump[Pump_Number] = SelectV[i];
        dtostrf(VPump[Pump_Number], 4, 2, Txt[1][Pump_Number]);

        if (Synchro != 0) {

          if (HV[Pump_Number] == false) {

            if (LV[Pump_Number] == true) {
              HV[Pump_Number] = true;
              VPumpHV[Pump_Number] = SelectV[i];
              Txt[1][Pump_Number] = "DONE";
              delay(500);
            }

            if (LV[Pump_Number] == false) {
              LV[Pump_Number] = true;
              VPumpLV[Pump_Number] = SelectV[i];
              Txt[1][Pump_Number] = "HV?";
              delay(500);
            }
          }
        }

        transit(j, 0);
      }

      if (Choice == 4) {
        Adjust();
      }

      if (Choice == 5) {
        transit(4, 0);
      }
    }
  }


  // ---------------- Menu 4 ----------------
  // It configures synchronized pump experiments, defining the number of experimental points and options before moving to the summary.

  if (Niveau == 4) {

    if (Choice == 1) {
      Dim = true;
      N = 6;
      transit(5, 0);
    }

    if (Choice == 2) {
      Dim = true;
      N = 4;
      transit(5, 0);
    }

    if (Choice == 3) {
      Dim = false;
      N = 21;
      transit(5, 0);
    }

    if (Choice == 4) {
      Dim = false;
      N = 11;
      transit(5, 0);
    }

    if (Choice == 5) {
      Reset();
    }
  }


  // ---------------- Menu 5 (Summary) ----------------
//It displays a recap of the selected configuration, allowing the user to either start the run or return to the main menu.

  if (Niveau == 5) {

    if (Choice == 0) {

      if (Synchro == 0) {
        Txt[5][0] = "RECAP 3 Pumps";
        Txt[5][1] = Txt[1][1];
        Txt[5][2] = Txt[1][2];
        Txt[5][3] = Txt[1][3];
        transit(5, 0);
      }

      if (Synchro == 1) {
        Txt[5][1] = Txt[0][2];
        Txt[5][2] = "Pumps";
        Txt[5][3] = "   <----->";
        transit(5, 0);
      }

      if (Synchro == 2) {
        Txt[5][1] = Txt[0][3];
        Txt[5][2] = "";
        Txt[5][3] = "   <----->";
        transit(5, 0);
      }

      if (Synchro == 3) {
        Txt[5][1] = Txt[0][4];
        Txt[5][2] = "";
        Txt[5][3] = "   <----->";
        transit(5, 0);
      }
    }

    if (Choice == 4) {
      Run();
    }

    if (Choice == 5) {
      Niveau = 0;
      Choice = 0;
      k1[Niveau] = 0;
      Affiche_menu(Niveau);
    }
  }

} 

// __________________________________________________/Set Up \________________________________________________
void setup() {

  // Start serial communication with the computer at 9600 baud
  // This is used to send data to PLX-DAQ (Excel data acquisition)
  Serial.begin(9600);

  // Initialize the display
  display.begin();

  // Set the display contrast (optimal value around 40)
  display.setContrast(contraste);

  // -------- Pin configuration --------

  // Navigation buttons for the menu
  pinMode(UP, INPUT);      // Button used to increase the menu choice (Choice +1)
  pinMode(DOWN, INPUT);    // Button used to decrease the menu choice (Choice -1)
  pinMode(SELECT, INPUT);  // Button used to validate the selected option

  // Sensor inputs (8 sensors connected to the Arduino)
  pinMode(Sensor0, INPUT); // Sensor connected to A0
  pinMode(Sensor1, INPUT); // Sensor connected to A1
  pinMode(Sensor2, INPUT); // Sensor connected to A2
  pinMode(Sensor3, INPUT); // Sensor connected to A3
  pinMode(Sensor4, INPUT); // Sensor connected to A4
  pinMode(Sensor5, INPUT); // Sensor connected to A5

  // -------- Send column labels to Excel (PLX-DAQ) --------
  // This defines the column headers in the Excel spreadsheet
  Serial.print(F("LABEL,Temps,Pump1,Pump2,Pump3,"));

  // Print the names of the 8 sensor variables stored in Data[i]
  for (i = 0; i < 8; i++) {
    Serial.print(Data[i]); // Sensor name
    Serial.print(F(","));  // Column separator
  }

  Serial.println(); // End of the header line


  // -------- Stepper motor initialization --------
  // Configure the stepper motors used to control the pumps
  Stepper_setting();


  // -------- Display orientation --------
  // Set the screen orientation
  // 0 = normal, 1 = 90°, 2 = 180°, 3 = 270°
  display.setRotation(0);


  // -------- Prepare voltage values for menu display --------
  // Convert float values (SelectV[]) to text strings so they can be displayed in the menu

  for (i = 1; i < 4; i++) {
    dtostrf(SelectV[i], 4, 2, Txt[2][i]);     // Convert voltage values for menu 2
    dtostrf(SelectV[i + 4], 4, 2, Txt[3][i]); // Convert voltage values for menu 3
  }

  // Convert the last voltage value used in menu 2
  dtostrf(SelectV[4], 4, 2, Txt[2][4]);


  // -------- Initialize the interface --------
  // Go to the main menu (menu level 0)
  transit(0, 0);
}
// ________________________________________________________________/Loop \__________________________________

void loop() {
if (digitalRead(UP)==HIGH || digitalRead(DOWN)==HIGH || digitalRead(SELECT)==HIGH ) {
RUN=false;
Select_menu();
}
if (RUN==true){
stepper1.run();stepper2.run();stepper3.run(); 
}
}
