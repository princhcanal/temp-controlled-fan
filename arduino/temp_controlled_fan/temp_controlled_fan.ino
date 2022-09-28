#include <DHT.h>
#include <DHT_U.h>

#define DHTPIN 12
#define DHTTYPE DHT11

#define DC_FAN_PIN 9

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  Serial.print("Temperature: ");
  Serial.println(temperature);

  if (temperature < 30) {
    analogWrite(DC_FAN_PIN, 0);
  } else {
    analogWrite(DC_FAN_PIN, 200);
  }
  
  delay(1000);
}

