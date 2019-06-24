// Created by sun-asterisk/do.trung.quan on 10/06/2019
const axios = require("axios");
const querystring = require("querystring");

let cwApiUrl = process.env.CW_API_URL;
let cwBotToken = process.env.CW_BOT_TOKEN;
let debug = console.log.bind(console);

class ConfigAxios {
  /**
   * Init an instance of axios
   * @param {string} cwApiUrl chatwork api base url
   * @param {string} cwBotToken chatwork bot token
   */
  async initAxiosInstance (cwApiUrl, cwBotToken) {
    return axios.create({
      baseURL: cwApiUrl,
      timeout: 5000,
      headers: {
        "X-ChatWorkToken": cwBotToken,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  }

  /**
   * Init an instance of axios
   * @param {string} cwApiUrl chatwork api base url
   * @param {string} cwBotToken chatwork bot token
   */
  async pushMessageToChatWork (cwRoomId, message) {
    try {
      let axiosInstance = await this.initAxiosInstance(cwApiUrl, cwBotToken);
      return await axiosInstance.post(`/rooms/${cwRoomId}/messages`, querystring.stringify({body: message}));
    } catch (error) {
      debug(error.message);
    }
  };
}

module.exports = ConfigAxios;
