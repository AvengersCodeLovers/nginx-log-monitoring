// Created by sun-asterisk/do.trung.quan on 10/06/2019
let makeAlertChatWork = (toManagers, env, message) => {
  return `${toManagers} [info][title]Bug in ${env}[/title][code][${new Date().toLocaleString()}] ${message}[/code][/info]`;
};

module.exports = {
  makeAlertChatWork: makeAlertChatWork
};
