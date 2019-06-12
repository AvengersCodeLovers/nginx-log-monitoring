// Created by sun-asterisk/do.trung.quan on 10/06/2019
const ConfigAxios = require("./library/ConfigAxios");
const WatchingFile = require("./modules/WatchingFile");
const errorTemplates = require("./templates/errors");

let WatchFile = new WatchingFile();
let Axios = new ConfigAxios();

let nginxDir = process.env.NGINX_LOG_DIRECTORY;
let mysqlDir = process.env.MYSQL_LOG_DIRECTORY;
let cwRoomId = process.env.CW_ROOM_ID;
let toManagers = process.env.MANAGERS;
let targetENV = process.env.ENV;

// Push alert if new log file has been added
WatchFile.on("new-error-file-added", async (logData) => {
  let cwMessage = errorTemplates.makeAlertChatWork(toManagers, targetENV, logData.message);
  await Axios.pushMessageToChatWork(cwRoomId, cwMessage);
});

// Listen nginx
WatchFile.listenErrorLogging(nginxDir);

// Listen mysql
WatchFile.listenErrorLogging(mysqlDir);
