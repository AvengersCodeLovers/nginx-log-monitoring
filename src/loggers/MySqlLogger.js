const Logger = require('./Logger');

class MySqlLogger extends Logger {
    read(logData) {
        let alertMessage = `[Mysql alert]: ${logData}`;
  
        this.displayDebugMessage();
        this.emitData(alertMessage);
    }
}

module.exports = MySqlLogger;
