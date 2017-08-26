import VideoSettings from '../settings.js';

export default class {
    contructor() {        
        this.volume = 0;
        this.currenttime = 0;
    }

    play() {
        this.iVXjsBus.emit(this.controlEventNames.PLAY);
    }

    pause() {
        this.iVXjsBus.emit(this.controlEventNames.PAUSE);
    }

    getDuration(cb) {
        this.iVXjsBus.once(this.controlEventNames.SET_DURATION, (duration) => {
            cb(duration);
        });
        this.iVXjsBus.emit(this.controlEventNames.GET_DURATION);
    }

    setVolume(volume) {
        this.iVXjsBus.emit(this.controlEventNames.SET_VOLUME, volume);
    }

    seek(seconds) {
        this.iVXjsBus.emit(this.controlEventNames.SEEK, seconds);
    }

    changeCurrentTrack(trackId){
        this.iVXjsBus.emit(this.trackEventNames.CHANGE_CURRENT_TRACK, trackId);
    }
}