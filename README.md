# TUINO LPN KIT HTML FRONTEND

Here are some examples of HTML frontends for the LPN KIT Demos. You will be able to display data coming from your TUINO LR Nodes.</br>
This code will work with both version we have here on GitHUB of the LPN KIT
- [Standard LPN Version](https://github.com/gimasi/TUINO-LPN-KIT-DEMOS)
- [Swisscom LPN Version](https://github.com/gimasi/TUINO-LPN-KIT-DEMOS)


This is the Swisscom LPN version of the [TUINO LPN Demos](https://github.com/gimasi/TUINO-LPN-KIT-DEMOS )<br/>
You need to have a TUINO LR with the Swisscom LPN Firmware.<br/>

There are 4 frontend for the respective TUINO LR code<br/>

There are 4 demos
- Simple Sensor<br>
![SIMPLE_SENSOR](/docs/imgs/simple_sensors.png?raw=true)

- Simple Actuator<br>
![SIMPLE_SENSOR](/docs/imgs/simple_actuator.png?raw=true)

- Temperature Sensor<br>
![SIMPLE_SENSOR](/docs/imgs/temperature_sensor.png?raw=true)

- Thermostat<br>
![SIMPLE_SENSOR](/docs/imgs/thermostat.png?raw=true)

In each demo directory you will find a configuration.js file where you need to fill in these variables:<br/>

```
// Set This based on your setup
var auth_token = "__YOUR_USER_AUTH_TOKEN__";
var user_id = '__YOUR_USER_ID__';
```

You can find this values in your TUINO Cloud user profile page.<br/>


If the example needs to send data to a sensor, Simple Actuator and Thermostat, you need to setup also the sensor id:<br/>

```
//
var sensor_id = "__SENSOR_ID__";
```

Again you find this ID in the TUINO Cloud Node page.


The Gauges and Dials you see in our demos are made with [Perfect Widgets](http://perfectwidgets.com/Main)

Have Fun!!