/**
 * Important: Must add one space character to both after and before of status code.
 * Because in log file of project GMT, we have to match keyword exactly them.
 */
const statusCodeAndMessage = [
  {
    "code": " 500 ",
    "message": "[Server Nginx alert]: 500 Internal Server Error.",
  },
  {
    "code": " 501 ",
    "message": "[Server Nginx alert]: 501 Server Not Implemented.",
  },
  {
    "code": " 502 ",
    "message": "[Server Nginx alert]: 502 Bad Gateway: The server received an invalid response from the upstream server.",
  },
  {
    "code": " 503 ",
    "message": "[Server Nginx alert]: 503 Service Unavailable: The server cannot handle the request.",
  },
  {
    "code": " 504 ",
    "message": "[Server Nginx alert]: 504 Gateway Timeout.",
  },
  {
    "code": " 505 ",
    "message": "[Server Nginx alert]: 505 HTTP Version Not Supported.",
  },
  {
    "code": " 506 ",
    "message": "[Server Nginx alert]: 506 Variant Also Negotiates.",
  },
  {
    "code": " 507 ",
    "message": "[Server Nginx alert]: 507 Insufficient Storage: The server is unable to store the representation needed to complete the request.",
  },
  {
    "code": " 508 ",
    "message": "[Server Nginx alert]: 508 Loop Detected: The server detected an infinite loop while processing the request.",
  },
  {
    "code": " 509 ",
    "message": "[Server Nginx alert]: 509 Bandwidth Limit Exceeded: The server has exceeded the bandwidth specified by the server administrator.",
  },
  {
    "code": " 510 ",
    "message": "[Server Nginx alert]: 510 Not Extended: Further extensions to the request are required for the server to fulfil it.",
  },
  {
    "code": " 511 ",
    "message": "[Server Nginx alert]: 511 Network Authentication Required.",
  },
];

module.exports = {
  statusCodeAndMessage: statusCodeAndMessage
};
