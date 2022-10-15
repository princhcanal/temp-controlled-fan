#include <DHT.h>
#include <DHT_U.h>

#define DHTPIN 12
#define DHTTYPE DHT11

#define DC_FAN_PIN 9
#define TEMP_THRESHOLD 30

DHT dht(DHTPIN, DHTTYPE);

bool fanIsOn = true;
int maxFanSpeed = 255;
int fanSpeed0 = 0;
int fanSpeed1 = 84;
int fanSpeed2 = 168;
int fanSpeed3 = maxFanSpeed;
int fanSpeed = fanSpeed3;

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  
  sendTemperature();
  handleSerialInputs();
  
  delay(100);
}

void sendTemperature() {
  float temperature = dht.readTemperature();

  Serial.println(temperature);

  if (fanIsOn) {
    if (temperature < TEMP_THRESHOLD) {
      analogWrite(DC_FAN_PIN, 0);
    } else {
      analogWrite(DC_FAN_PIN, fanSpeed);
   }
  }
}

void handleSerialInputs() {
  String input = "";

  if (Serial.available() > 0) {
    input = Serial.readString();
  }

  if (input == "SPEED_0") {
    fanSpeed = fanSpeed0;
  } else if (input == "SPEED_1") {
    fanSpeed = fanSpeed1;
  } else if (input == "SPEED_2") {
    fanSpeed = fanSpeed2;
  } else if (input == "SPEED_3") {
    fanSpeed = fanSpeed3;
  }
}
