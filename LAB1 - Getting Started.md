# Lab 1: Getting Started




## Setting up developement environment

 1. Download and install the following tools:
	 - NodeJS: [https://nodejs.org/en/](https://nodejs.org/en/)
	 - Yarn: [https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
	 - Android Studio: [https://developer.android.com/studio](https://developer.android.com/studio)
	 - VSCode: [https://code.visualstudio.com/](https://code.visualstudio.com/)

2. After installing the tools, run the following command to install react native CLI

		npm  install -g react-native-cli

## Create an Emulator (Virtual device)
1. Open Android Studio
2. open the AVD (Android Virtual Device Manager)
3. Click on **Create Virtual Device**
4. Choose a device
5. Select an Android Image for your device, for example **Android Q (API 29)** (Click on Download if it's not downloaded)
6. Give a name to your device and confirm creation
7. Now, run the device

## Create a new React Native project
1. Run this command to create a new React Native project (**BookApp** will be the name of the project)
			
		npx react-native init BookApp
2. Open the project with VSCode and open a terminal
3. To see available connected devices (physical or virtual), you can run this command:
	
		adb devices
4. To run the app, run this command
		
		yarn android 
		//or yarn ios (for ios devices)

## Enable Developer Options
To enable Developer Options and debugging on android physical devices, follow these steps:
1. Go to phone **Settings** (Paramètres) -> **About phone** (A propos)
2. Press **Software Information** (Informations sur le logiciel) **--> Build Number** (Numéro de version) for **7 or 10 times** depending on the device.
3. Now, the developer options should be visible, return to **Settings --> Development Options**
4. Search for **USB Debugging** (Débogage USB) and turn it **ON**

## Debugging the app
 When you run a react native app a debugging interface will be shown called **metro**
	 - When you press "r" the application reloads
	 - When you press "d" a popup will be showing **debugging** options on top of the app
1. Go to VSCode and search for **React Native Tools** extension
2. Open the project with VSCode and create a launchig profile, **click on create a launch.json file**
3. Select **React Native** from the menu, than **uncheck** Android and **check "Attach to Package Manager"** then click on **OK**
4. Now, run the app using the `yarn android` command 
5. When the application is lunched, go to VSCode and press **F5 (Start Debugging)**
6. Now, open the metro interface and press "**d**", the select "**Debug**" from the options to attache React native package manager to VSCode.
7. Finally, you can add breakpoints and test.


