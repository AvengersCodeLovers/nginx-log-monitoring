// Created by sun-asterisk/do.trung.quan on 10/06/2019
const chokidar = require("chokidar");
const EventEmitter = require("events").EventEmitter;
const readLastLines = require('read-last-lines');
let debug = console.log.bind(console);

class WatchingFile extends EventEmitter {
  constructor () {
    super();
  }

  /**
   * Listen when a log file has been changed
   * @param {Logger} logger
   */
  listenError (logger) {
    try {
      const targetFile = logger.logFile();

      if (!targetFile) {
        debug('Please set the log file path.');
        return;
      }

      debug(`Watching for file changes on ${targetFile}`);

      const watcher = chokidar.watch(targetFile, {persistent: true});

      watcher.on("change", async (path) => {
        // Read one last line of file
        let logData = await readLastLines.read(path, 1);
        logger.read(logData);
      });
    } catch (error) {
      debug(error.message);
    }
  }
}

module.exports = WatchingFile;
