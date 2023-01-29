const settings = {
    dev: {
        baseUrl: "https://books-app-rn.azurewebsites.net",
        fallbackLang: "en"
    },
    prod: {
        baseUrl: "https://books-app-rn.azurewebsites.net",
        fallbackLang: "en"
    }
}

export default ENV = __DEV__ ? settings.dev : settings.prod