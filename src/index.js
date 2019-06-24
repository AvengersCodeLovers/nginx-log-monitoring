// Created by sun-asterisk/do.trung.quan on 10/06/2019
const ConfigAxios = require("./library/ConfigAxios");
const WatchingFile = require("./modules/WatchingFile");
const errorTemplates = require("./templates/errors");

let WatchFile = new WatchingFile();
let Axios = new ConfigAxios();

let nginxType = process.env.NGINX_TYPE;
let mysqlType = process.env.MYSQL_TYPE;

let nginxLogFile = process.env.NGINX_LOG_FILE;
let mysqlLogFile = process.env.MYSQL_LOG_FILE;

let cwRoomId = process.env.CW_ROOM_ID;
let toManagers = process.env.MANAGERS;
let targetENV = process.env.ENV;


// Push alert if has error
WatchFile.on("new-error-appeared", async (logData) => {
  let cwMessage = errorTemplates.makeAlertChatWork(toManagers, targetENV, logData.message);
  await Axios.pushMessageToChatWork(cwRoomId, cwMessage);
});

// Listen nginx
WatchFile.listenError(nginxType, nginxLogFile);

// Listen mysql
WatchFile.listenError(mysqlType, mysqlLogFile);
