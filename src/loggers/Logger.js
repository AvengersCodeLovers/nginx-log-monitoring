let debug = console.log.bind(console);

class Logger {
    constructor(logFilePath, emitter) {
        this.logFilePath = logFilePath;
        this.emitter = emitter;
    }

    emitData(alertMessage) {
        this.emitter.emit("new-error-appeared", {message: alertMessage});
    }

    logFile() {
        return this.logFilePath;
    }

    displayDebugMessage() {
        debug(`[${new Date().toLocaleString()}][${this.constructor.name}] Push alert message to chatwork...`);
    }
}

module.exports = Logger;
