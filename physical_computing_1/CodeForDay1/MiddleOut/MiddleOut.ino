/* Knight Rider 2
 * --------------
 *
 * Reducing the amount of code using for(;;).
 *
 *
 * (cleft) 2005 K3, Malmo University
 * @author: David Cuartielles
 * @hardware: David Cuartielles, Aaron Hallborg
 */

int pinArray[] = {1, 2, 3, 4, 5, 6, 7, 8};
int count = 0;
int r = 4;
int l = 3;
int timer = 100;


void setup(){
  // we make all the declarations at once
  for (count=0;count<8;count++) {
    pinMode(pinArray[count], OUTPUT);
  }
}

void loop() {
  for (r=4;r<8;r++) {
    for (l=3;l>=0;l--) {
     digitalWrite(pinArray[r], HIGH);
     delay(timer);
     digitalWrite(pinArray[r], LOW);
     delay(timer);
     digitalWrite(pinArray[l], HIGH);
     delay(timer);
     digitalWrite(pinArray[l], LOW);
     delay(timer);
    }
  }

}
