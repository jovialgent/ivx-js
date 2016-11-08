import LoggingMessages from  '../constants/logging.js';
import ErrorMessages from '../constants/errors.js';

export default class {
    constructor(show, Bus) {
        this.show = show;
        this.LoggingMessages = new LoggingMessages();
        this.ErrorMessages = new ErrorMessages();
        this.Bus = Bus;
    }

    warn(message) {
        let {show, LoggingMessages, Bus} = this;
        let warnMessage = LoggingMessages.WARN;
        let warnPayload = {
            message: message,
            timestamp: new Date()
        }

        if (show) {
            console.warn(`${warnMessage}: ${message}`);
        }

        Bus.emit(warnMessage, warnPayload);
    }

    error(error, type = "DEFAULT") {
        let {show, ErrorMessages, Bus} = this;
        let errorTypeMessage = ErrorMessages[type];
        let {message} = error;
        let errorPayload = {
            message: message,
            type : errorTypeMessage,
            error: error,
            timestamp: new Date()
        }

        console.error(`${errorTypeMessage}: ${message}`);
        Bus.emit(errorTypeMessage, error);
        Bus.emit(LoggingMessages.ERROR, errorPayload);
    }

    debug(message){
        let {show} = this;

        if(show){
            this.log(`DEBUG: ${message}`)
        }
    }

    log(message) {
        let {show, LoggingMessages, Bus} = this;
        let logMessage = LoggingMessages.LOG;
        let logPayload = {
            message: message,
            timestamp: new Date()
        };

        console.log(`${logMessage}: ${message}`);
        Bus.emit(logMessage, logPayload);
    }

    trace(stack) {
        let {show, LoggingMessages, Bus} = this;
        let stackPayLoad = {
            stack: stack,
            timestamp: new Date()
        };

        if (show) {
            console.trace(stack);
        }

        Bus.emit(LoggingMessages.TRACE, stackPayLoad);
    }
}