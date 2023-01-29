import * as RNLocalize from 'react-native-localize'
import { I18n } from 'i18n-js'
import env from '../../environment';
import { I18nManager } from 'react-native';

const translations = {
    en: require('./en.json'),
    fr: require('./fr.json'),
    ar: require('./ar.json')
} 

const i18n = new I18n(translations, {
    defaultLocale: env.fallbackLang,
    locale: env.fallbackLang,
    enableFallback: true,
    missingBehavior:"guess"
})


export function changeCulture(culture) {
    let lang = {languageTag: culture}
    if (!culture) { 
        lang = RNLocalize.findBestAvailableLanguage(Object.keys(translations))
        console.log(lang)
    }

    let {languageTag} = lang
    i18n.locale = languageTag; 
    let isRtl = isRTL(languageTag);
    I18nManager.forceRTL(isRtl);
} 



function isRTL(culture) {
    return ["ar"].includes(culture.toLowerCase()) //We have only AR as rtl culture
}


export default i18n