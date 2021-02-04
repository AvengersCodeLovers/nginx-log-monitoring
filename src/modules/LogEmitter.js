const EventEmitter = require("events").EventEmitter;

class Emitter extends EventEmitter {
    constructor() {
        super();
    }
}

module.exports = Emitter;
