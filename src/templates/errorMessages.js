// Created by sun-asterisk/do.trung.quan on 10/06/2019
let makeErrorToChatWork = (toManagers, env, message) => {
  return `${toManagers} [info][title]Bug in ${env}[/title][code]Message: ${message}[/code][/info]`;
};

module.exports = makeErrorToChatWork;
