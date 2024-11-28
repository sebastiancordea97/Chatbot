const serverConstants = Object.freeze({
    serverHealthCheckMessage: "Stock Exchange API is up and running!",
    defaultConfig: {
        port: 3000,
        host: "localhost",
        loggerFile: "verbose.log",
    },
    errorMessages: {
        dataGetFail: "Failed to get data from",
    }
})

export default serverConstants