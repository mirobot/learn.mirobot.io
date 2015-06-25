---
title: Customise the Firmware
summary: Replace the Arduino firmware at the heart of Mirobot with your own custom version
layout: doc
tags:
  - Arduino
  - Modifying
  - Firmware
type: instruction
hardware:
  - v1
level: advanced
---

Install the Arduino IDE
-----------------------

Make sure you've got the Arduino IDE installed on your computer. If you haven't, [download it](http://arduino.cc/en/main/software) and install it.

Install the Mirobot library
---------------------------

 - Install the Mirobot library we need to be able to run the code. First, you need to download [the latest version](https://github.com/bjpirt/mirobot-arduino/archive/master.zip)
 - Unzip the file you just downloaded and rename the folder to "Mirobot". Then go to the menu __Sketch >> Import Library >> Add Library__ and when prompted select the folder you just renamed
   ![Importing the library](/assets/docs/customise-firmware/1.png)
 - You can tell it is installed properly because when you go to __Sketch >> Import Library__ again it will be listed
 - If you are having problems installing the library, [see here for more details](http://arduino.cc/en/Guide/Libraries)

Open the firmware sketch
------------------------

In your __File >> Examples menu__, you should have a menu item for Mirobot (if you haven't, then the library is not installed properly). Select "firmware" and it should open up a short sketch in the Arduino IDE.

![Check the library is recognised](/assets/docs/customise-firmware/2.png)


Upload the firmware
-------------------

 - Remove the WiFi module during programming
 - Plug the Arduino into your computer using a USB <-> Serial adapter.
 - Select the correct serial port from the Tools >> Serial Port menu
 - Select "Arduino Pro or Pro Mini (3.3V, 8MHz) w/ ATmega328" from the __Tools >> Board menu__
 - Click on the upload icon or choose __File >> Upload__ from the menu. You should see a success message saying that the firmware has been successfully compiled and uploaded to Mirobot
   ![Upload the firmware](/assets/docs/customise-firmware/3.png)
 - Now you can either use it as normal or start from here customising the firmware to do your bidding!