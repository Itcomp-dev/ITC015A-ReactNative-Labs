# LAB 11: Internationalization

Hi! I'm your first Markdown file in **StackEdit**. If you want to learn about StackEdit, you can read me. If you want to play with Markdown, you can edit me. Once you have finished with me, you can create new files by opening the **file explorer** on the left corner of the navigation bar.


# Install requirements

Run the following command to install **i18n-js** and **react-native-localize**

	yarn add react-native-localize i18n-js

## Add resources files

1. Create a folder `locales` inside `src` folder
2. Create three locale files: `en.json`, `fr.json` and `ar.json` for testing
	
		//fr.json
		{
		    "hello": "Bienvenue"
		}
		 
		//en.json
		{
		    "hello": "Hello"
		}
		
		//ar.json
		{
		    "hello": "مرحبا"
		}
		
## Configure i18n-js
1. Create a file `index.js` inside `src/locales`
2. Create an object for translations that map each culture name with the corresponding content (from file)
	
		const translations = {
		    en: () => require('./en.json'),
		    fr: () => require('./fr.json'),
		    ar: () => require('./ar.json')
		} 
3. Add a setting **`fallbackLang`** to environment file, and set it to `**en**`
4. Add a function `changeCulture` which can change the current application culture used by i18n-js

		export function changeCulture(culture) {
		    let lang = {languageTag: culture}
		    if (!culture) { 
		        lang = RNLocalize.findBestAvailableLanguage(Object.keys(translations))  
		    }
		    let {languageTag} = lang
		    i18n.translations = {[languageTag]: translations[languageTag]()}
		    i18n.locale = languageTag; 
		}
5. Add the missing imports
	
		import * as RNLocalize from 'react-native-localize'
		import i18n from 'i18n-js'
		import {fallbackLang} from '../../envrionment.';

6. To configure the fallback culture, add those lines to `locales/index.js`
	
		i18n.defaultLocale = fallbackLang;
		i18n.fallbacks = true;
		i18n.missingBehaviour = "guess";

## RTL Support
To add RTL Support, we use `I18nManager` from react-native:

1. First, create a variable called `isRTL` that checks if a given cultures is right to left:
	
		function isRTL(culture) {
		    return ["ar"].includes(culture.toLowerCase()) //We have only AR as rtl culture
		}
2. Import `I18nManager` and add the following lines to `changeCulture` function
	
		//...
		import { I18nManager } from 'react-native';
		//...
		export function changeCulture(culture) {
		    //...
		    let isRtl = isRTL(languageTag);
		    I18nManager.forceRTL(isRtl);
		}

## Initialize the app
Go to `App.js` and add the following lines to App component to initialize the app culture and configure i18n-js each time the culture has changed:

	const [lang, setLang] = useState(null);

	useEffect(()=>{
	   changeCulture(lang)  
	},[lang])

We initialized the culture state with `null`, to let `changeCulture` function use the closest culture to the mobile culture.

> We can add a slice to the store (for example appConfig) which will contain translations and the current app culture, or even load the translations from an API using an async thunk (action).

## Usage from components
To translate items from UI Components we use the function **t** or **translate** from  i18n

	import { t } from 'i18n-js' 
	//or import { translate } from 'i18n-js' 

And then, call this function from the component, example:

	export const Login = ()=>{
    return <View>
        //use t(key, options?)
        <Headline>{t('hello')}</Headline> 
    </View>
	}	


