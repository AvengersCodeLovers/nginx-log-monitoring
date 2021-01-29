const Logger = require('./Logger');
const nginxFormat = '$remote_addr - $remote_user [$time_local] "$request" $status $body_bytes_sent "$http_referer" "$http_user_agent" "$upstream_response_time" $request_time $host $upstream_status $upstream_addr $http_deviceType $http_productId $http_appVersion $http_market';
const parser = require("../modules/NginxParser")(nginxFormat);
const analysisCode = require("./../templates/analysisHttpStatusCode");

class NginxLogger extends Logger {
    read(logData) {
        for (let item of analysisCode.statusCodeAndMessage) {
            if (parseInt(item.code) == parser(logData).status) {
                let alertMessage = `${item.message} \n ${logData}`;

                this.displayDebugMessage();
                this.emitData(alertMessage);
            }
        }
    }
}

module.exports = NginxLogger;
