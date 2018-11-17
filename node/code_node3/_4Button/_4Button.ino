const int b1 = 0;     // the number of the pushbutton pin
const int b2 = 1;     // the number of the pushbutton pin
const int b3 = 2;     // the number of the pushbutton pin
const int b4 = 3;     // the number of the pushbutton pin
const int a1 = 0;     // the number of the pushbutton pin
const int a2 = 1;     // the number of the pushbutton pin

// variables will change:
int bs1 = 0;         // variable for reading the pushbutton status
int bs2 = 1;         // variable for reading the pushbutton status
int bs3 = 2;         // variable for reading the pushbutton status
int bs4 = 3;         // variable for reading the pushbutton status
int ar1 = 0;         // variable for reading the pushbutton status
int ar2 = 1;         // variable for reading the pushbutton status

float EMA_a = 0.6;      //initialization of EMA alpha
int EMA_S = 0;          //initialization of EMA S

float EMA_a1 = 0.6;      //initialization of EMA alpha
int EMA_S1 = 0;          //initialization of EMA S
void setup() {
  Serial.begin(9600);

  // initialize the pushbutton pin as an input:
  pinMode(b1, INPUT_PULLUP);
  pinMode(b2, INPUT_PULLUP);
  pinMode(b3, INPUT_PULLUP);
  pinMode(b4, INPUT_PULLUP);

  EMA_S = analogRead(a1);  //set EMA S for t=1
  EMA_S1 = analogRead(a2);  //set EMA S for t=1
}

void loop() {
  // read the state of the pushbutton value:
  bs1 = digitalRead(b1);
  bs2 = digitalRead(b2);
  bs3 = digitalRead(b3);
  bs4 = digitalRead(b4);

  ar1 = analogRead(a1);
  ar2 = analogRead(a2);
  EMA_S = (EMA_a*ar1) + ((1-EMA_a)*EMA_S);    //run the EMA
  EMA_S1 = (EMA_a1*ar2) + ((1-EMA_a1)*EMA_S1);    //run the EMA

  Serial.print(bs1);
  Serial.print(",");
  Serial.print(bs2);
  Serial.print(",");
  Serial.print(bs3);
  Serial.print(",");
  Serial.print(bs4);
  Serial.print(",");
  Serial.print(EMA_S);
  Serial.print(",");
  Serial.println(EMA_S1);
  delay(10);

}
