const source = '$http_client_ip $remote_addr - $remote_user [$time_local] "$request" $status $body_bytes_sent "$http_referer" "$http_user_agent" "$upstream_response_time" $request_time $host $upstream_status $upstream_addr $http_deviceType $http_productId $http_appVersion $http_market';
const parser = require("../src/modules/NginxParser")(source);
var log = '- - - - [29/Apr/2020:14:23:08 +0700] "GET /teams HTTP/1.1" 200 501 "http://example.com" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36"';
var data = parser(log);

console.log(data);
