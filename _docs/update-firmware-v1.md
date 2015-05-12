---
title: Updating the firmware on v1
summary: Use the updater to get the latest code running on Mirobot
layout: doc
tags:
  - WiFi
  - Firmware
  - Updating
hardware:
  - v1
type: instruction
level: core
---

Download the app
----------------

First, you'll need to download the updater application:

 - [Mac Version](https://github.com/bjpirt/mirobot-updater/releases/download/v1.1.0/mirobot_updater_1.1.0_mac.zip)
 - [Windows Version](https://github.com/bjpirt/mirobot-updater/releases/download/v1.1.0/mirobot_updater_1.1.0_win.zip)
 - Linux Version ([32 bit](https://github.com/bjpirt/mirobot-updater/releases/download/v1.1.0/mirobot_updater_1.1.0_linux32.zip), [64 bit](https://github.com/bjpirt/mirobot-updater/releases/download/v1.1.0/mirobot_updater_1.1.0_linux64.zip)) - tested on Ubuntu

Unzip the folder and run the application

If you're on a mac you may need to right click on it and select "Open" if you're using a recent version of Mac OS X. See [this page](http://support.apple.com/en-gb/HT202491) for more details if you're interested why.


Connect to Mirobot
------------------

You'll need to know Mirobot's IP address in order to update it. If you're on the mirobot network, its IP address will be 10.10.100.254.

![The updater](/assets/docs/update-firmware-v1/firmware_update.png)

If you're updating over the mirobot network, make sure you start the application while you have a connection to the internet so that it can download the latest versions.

Enter the IP address and click connect. You should see the app update with the current versions (in green) or out of date versions (in red)


Update
------

You can click the "Update" button next to the firmware you want to update.

**Warning: there is always a risk when updating the Arduino over WiFi that the process will fail and leave it in a bad state**. If this happens, restart the updater application and keep trying to manually update the firmware until it succeeds. You will be prompted to press the reset button on the Arduino which will start the process. The best approach is not to update the Arduino unless you have a specific reason for doing so.
