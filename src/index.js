// Created by sun-asterisk/do.trung.quan on 10/06/2019
const ConfigAxios = require("./library/ConfigAxios");
const WatchingFile = require("./modules/WatchingFile");
const makeErrorToChatWork = require("./templates/errorMessages");

let WatchFile = new WatchingFile();
let Axios = new ConfigAxios();

let targetDir = process.env.TARGET_DIRECTORY;
let cwRoomId = process.env.CW_ROOM_ID;
let toManagers = process.env.TARGET_MANAGERS;
let targetENV = process.env.TARGET_ENV;

// Push alert if file changed
WatchFile.on("new-error-file-added", async (logData) => {
  let cwMessage = makeErrorToChatWork(toManagers, targetENV, logData.message);
  await Axios.pushMessageToChatWork(cwRoomId, cwMessage);
});

// Listen file change
WatchFile.listenFileChange(targetDir);
