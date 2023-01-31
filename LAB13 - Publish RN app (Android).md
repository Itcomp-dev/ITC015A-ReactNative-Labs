# LAB 13 : Publish React Native app (Android)




## Application name
To set the application name for Android platform, you have to edit the value `app_name` in `android/app/src/main/res/values/strings.xml`

	<resources>
	    <string name="app_name">BookApp</string>
	</resources>

## Application icon
In Android you have to provide an icon for each type of screen according to density bucket:

![Preview](_res/android_density_bucker.png)

To update the app icon, you'll need to change the launcher icons in these folders:
**android/app/src/main/res/mipmap-Z** where **Z** represents the screen type: **M, H, X, XX, XXX**

To avoid to resize the icons manually, it exists some tools to automate this, like [App Icon Generator](https://www.appicon.co/) which generate the set of icons for you. You'll just have to replace the existing icons it the generated ones.

> Don't change the default icon name (**ic_launcher.png**)


## Signing the app
Android requires that all APKs be digitally signed with a certificate before they are installed on a device or updated. When releasing you need to sign your app bundle with an upload key before uploading it to the Play Console, and Play App Signing takes care of the rest.sing

![Preview](_res/android_signing.png)

### Generating an upload key 
You can generate a private signing key using `keytool`. On Windows `keytool` must be run from `C:\Program Files\Java\jdkx.x.x_x\bin`

	keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

This command prompts you for passwords for the keystore and key and for the Distinguished Name fields for your key. It then generates the keystore as a file called `my-upload-key.keystore`.

The keystore contains a single key, valid for 10000 days. The alias is a name that you will use later when signing your app, so remember to take note of the alias.

### Setting up gradle variables
1. Place the `my-upload-key.keystore` file under the `android/app` directory in your project folder.
2. Edit the file `~/.gradle/gradle.properties` or `android/gradle.properties`, and add the following (replace `*****` with the correct keystore password, alias and key password),

		MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
		MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
		MYAPP_UPLOAD_STORE_PASSWORD=*****
		MYAPP_UPLOAD_KEY_PASSWORD=*****
3. he last configuration step that needs to be done is to setup release builds to be signed using upload key. Edit the file `android/app/build.gradle` in your project folder, and add the signing config:
	
		...
		android {
		    ...
		    defaultConfig { ... }
		    signingConfigs {
		        release {
		            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
		                storeFile file(MYAPP_UPLOAD_STORE_FILE)
		                storePassword MYAPP_UPLOAD_STORE_PASSWORD
		                keyAlias MYAPP_UPLOAD_KEY_ALIAS
		                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
		            }
		        }
		    }
		    buildTypes {
		        //IMPORTANT
		        release {
		            ...
		            signingConfig signingConfigs.release T
		        }
		    }
		}
		...


## Generate builds

### APK (Android application PacKage)

Use `assembleDebug` or `assembleRelease` command from gradle wrapper

	cd android
	./gradlew assembleRelease 

### AAB (Android App Bundle)
Use `bundleDebug` or `bundleRelease` command from gradle wrapper
		
	cd android
	./gradlew bundleRelease //OR bundleDebug





