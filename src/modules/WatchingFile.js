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
   * Listen file change
   * @param {string} targetDir folder to watching
   */
  listenFileChange (targetDir) {
    try {
      log(`Watching for file changes on ${targetDir}`);

      const watcher = chokidar.watch(targetDir, {persistent: true});

      watcher.on("add", async (path) => {
        if (path.includes("error.log")) {
          log(`File ${path} has been added.`);
          let logData = await fsExtra.readFile(path);

          log(`Push alert message to chatwork...`);
          this.emit("new-error-file-added", {message: logData.toString()});

          await fsExtra.unlink(path);
          log(`File ${path} has been removed.`);
        }
      });
    } catch (error) {
      log(error.message);
    }
  }
}

module.exports = WatchingFile;
