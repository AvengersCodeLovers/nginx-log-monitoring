// Created by sun-asterisk/do.trung.quan on 10/06/2019
const chokidar = require("chokidar");
const EventEmitter = require("events").EventEmitter;
const readLastLines = require('read-last-lines');
const analysisCode = require("./../templates/analysisHttpStatusCode");
const nginxFormat = '$remote_addr - $remote_user [$time_local] "$request" $status $body_bytes_sent "$http_referer" "$http_user_agent" "$upstream_response_time" $request_time $host $upstream_status $upstream_addr $http_deviceType $http_productId $http_appVersion $http_market';
const parser = require("./NginxParser")(nginxFormat);

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
            if (parseInt(item.code) == parser(logData).status) {
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
