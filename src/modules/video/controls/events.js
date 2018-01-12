import VideoSettings from '../settings.js';

export default class {
    contructor(playerId) {
        Object.assign(this, {
            volume: 0,
            currenttime: 0,
            playerId
        });
    }

    play() {
        const { playerId } = this;
        
        this.iVXjsBus.emit(this.controlEventNames.PLAY, {
            playerId
        });
    }

    pause() {
        const { playerId } = this;

        this.iVXjsBus.emit(this.controlEventNames.PAUSE, {
            playerId
        });
    }

    getDuration(cb) {
        const { playerId } = this;

        this.iVXjsBus.once(this.controlEventNames.SET_DURATION, (eventObj) => {
            const { playerId: eventPlayerId, duration } = eventObj;

            if (eventPlayerId === playerId) {
                cb(duration);
            }
        });

        this.iVXjsBus.emit(this.controlEventNames.GET_DURATION, {
            playerId
        });
    }

    setVolume(volume) {
        const { playerId } = this;

        this.iVXjsBus.emit(this.controlEventNames.SET_VOLUME, {
            volume,
            playerId
        });
    }

    seek(seconds) {
        const { playerId } = this;

        this.iVXjsBus.emit(this.controlEventNames.SEEK, {
            currentTime : seconds,
            playerId
        });
    }

    changeCurrentTrack(trackId) {
        const { playerId } = this;

        this.iVXjsBus.emit(this.trackEventNames.CHANGE_CURRENT_TRACK, { trackId, playerId });
    }
}