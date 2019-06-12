// Created by sun-asterisk/do.trung.quan on 10/06/2019
const fsExtra = require("fs-extra");
const chokidar = require("chokidar");
const EventEmitter = require("events").EventEmitter;

let log = console.log.bind(console);

class WatchingFile extends EventEmitter {
  constructor () {
    super();
  }

  /**
   * Listen when a log file has been added
   * @param {string} targetDir folder to watching
   */
  listenErrorLogging (targetDir) {
    try {
      log(`Watching for file changes on ${targetDir}`);

      const watcher = chokidar.watch(targetDir, {persistent: true});

      watcher.on("add", async (path) => {
        if (path.includes("error.log") || path.includes("mysql_error.log")) {
          log(`[${new Date().toLocaleString()}] File ${path} has been added.`);
          let logData = await fsExtra.readFile(path);

          log(`[${new Date().toLocaleString()}] Push alert message to chatwork...`);
          this.emit("new-error-file-added", {message: logData.toString()});

          await fsExtra.unlink(path);
          log(`[${new Date().toLocaleString()}] File ${path} has been removed.`);
        }
      });
    } catch (error) {
      log(error.message);
    }
  }
}

module.exports = WatchingFile;
