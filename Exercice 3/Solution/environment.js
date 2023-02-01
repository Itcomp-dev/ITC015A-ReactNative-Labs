const settings = {
    dev: {
        baseUrl: "https://books-app-rn.azurewebsites.net"
    },
    prod: {
        baseUrl: "https://books-app-rn.azurewebsites.net"
    }
}

export default ENV = __DEV__ ? settings.dev : settings.prod