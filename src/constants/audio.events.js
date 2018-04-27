import AudioConstants from "./audio.js";

export default class extends AudioConstants {
    constructor() {
        super();

        let eventNames = {
            ADD_PLAYING_CLASS: 'add-playing-class',
            BUFFERING : "buffering",
            CAN_PLAY: "can-play",
            DISPOSE : "dispose",
            ENDED : "ended",
            GET_DURATION: "get-duration",
            MUTE: "mute",
            PAUSE: "pause",
            PAUSED: "paused",
            PLAY: "play",
            PLAYING: "playing",
            SEEK: "seek",
            SET_UP : "set-up",
            SET_DURATION: "set-duration",
            SET_VOLUME: "set-volume",
            TIME_UPDATE: "time-update",
            UNMUTE: "unmute"
        };

        this.addNames(eventNames);
    }

    convention(eventName) {
        let {DELIMETER} = this;

        return `${super.convention()}${DELIMETER}${eventName}`;
    }
}