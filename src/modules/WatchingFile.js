// Created by sun-asterisk/do.trung.quan on 10/06/2019
const chokidar = require("chokidar");
const EventEmitter = require("events").EventEmitter;
const readLastLines = require('read-last-lines');
const analysisCode = require("./../templates/analysisHttpStatusCode");

let debug = console.log.bind(console);
let nginxType = process.env.NGINX_TYPE;
let mysqlType = process.env.MYSQL_TYPE;

class WatchingFile extends EventEmitter {
  constructor () {
    super();
  }

  /**
   * Listen when a log file has been changed
   * @param {string} type of error: nginx or mysql...
   * @param {string} targetFile file to watching
   */
  listenError (type, targetFile) {
    try {
      debug(`Watching for file changes on ${targetFile}`);

      const watcher = chokidar.watch(targetFile, {persistent: true});

      watcher.on("change", async (path) => {
        // Read one last line of file
        let logData = await readLastLines.read(path, 1);

        if (type === nginxType) {
          for (let item of analysisCode.statusCodeAndMessage) {
            if (logData.includes(item.code)) {
              let alertMessage = `${item.message} \n ${logData}`;
  
              debug(`[${new Date().toLocaleString()}][${type}] Push alert message to chatwork...`);
              this.emit("new-error-appeared", {message: alertMessage});
            }
          }
        }

        if (type === mysqlType) {
          let alertMessage = `[Mysql alert]: ${logData}`;
  
          debug(`[${new Date().toLocaleString()}][${type}] Push alert message to chatwork...`);
          this.emit("new-error-appeared", {message: alertMessage});
        }
      });
    } catch (error) {
      debug(error.message);
    }
  }
}

module.exports = WatchingFile;
