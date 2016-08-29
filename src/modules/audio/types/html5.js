import { ObjectParsers } from "../../../utilities/type-parsers.js";
import AudioEventNames from "../../../constants/audio.events.js";

export class Html5 {
    constructor(selector, id = 'voiceover') {
        let audioElement = document.createElement('AUDIO');

        this.currentVolume = 0.5;
        this.id = id;
        this.audioElement = audioElement;
        this.audioElement.setAttribute('id', id);

        document.querySelector(selector).appendChild(audioElement);
    }

    play() {
        let self = this;
        let audioEventNames = new AudioEventNames();

        this.audioElement.addEventListener('canplaythrough', () => {
            self.iVXjsBus.emit(audioEventNames.CAN_PLAY);
            this.audioElement.play();
        });
    }

    pause() {
        this.audioElement.pause();
    }

    mute() {
        this.audioElement.volume = 0;
    }

    unmute() {
        this.audioElement.volume = this.currentVolume;
    }

    setVolume(volume) {
        if(!volume) return;
        this.audioElement.volume = volume;
        this.currentVolume = volume;
    }

    seek(time) {
        this.audioElement.currentTime = time;
    }

    getDuration() {
        return this.audioElement.currentTime;
    }

    setSrc(src) {
        this.audioElement.setAttribute('src', src);
    }

    setTimeUpdate() {
        let self = this;
        let audioEventNames = new AudioEventNames();

        this.audioElement.addEventListener('timeupdate', () => {
            self.iVXjsBus.emit(audioEventNames.TIME_UPDATE, self);
        });
    }

    setOnEnd() {
        let self = this;
        let audioEventNames = new AudioEventNames();

        this.audioElement.addEventListener("ended", () => {
            self.iVXjsBus.emit(audioEventNames.ENDED, self);
        }, false);
    }

    runCuePoints(processor) {
        let {audioElement = {}, cuePoints = []} = this;
        let {currentTime} = audioElement;

        if (cuePoints.length <= 0) return;

        cuePoints.forEach((cuePoint, index) => {
            let {timeAt, fired = false, once = false} = cuePoint;
            let timeUntil = Math.abs(cuePoint.timeAt - currentTime);

            if (timeAt <= currentTime && !fired) {
                processor.resolveActions([cuePoint], () => {
                    if (once) {
                        cuePoint.fired = true;
                    }
                });
            }
        });
    }

    addEventListeners(iVXjsBus) {
        let audioEventNames = new AudioEventNames();
        let self = this;

        this.iVXjsBus = iVXjsBus;

        // Looks for a custom iVXjsBus Function for specific implementations of the iVXjsBus
        this.playOnEvent = iVXjsBus.on(audioEventNames.PLAY, playOnEvent);
        this.pauseOnEvent = iVXjsBus.on(audioEventNames.PAUSE, pauseOnEvent);
        this.muteOnEvent = iVXjsBus.on(audioEventNames.MUTE, muteOnEvent);
        this.unmuteOnEvent = iVXjsBus.on(audioEventNames.UNMUTE, unmuteOnEvent);
        this.volumeOnEvent = iVXjsBus.on(audioEventNames.VOLUME, volumeOnEvent);
        this.durationOnEvent = iVXjsBus.on(audioEventNames.GET_DURATION, durationOnEvent);
        this.seekOnEvent = iVXjsBus.on(audioEventNames.SEEK, seekOnEvent);
        this.setUp = iVXjsBus.on(audioEventNames.SET_UP, setUp);

        // Sets it to the custom iVXjsBus Function (if it has one) or just sets the default one
        this.playOnEvent = this.playOnEvent ? this.playOnEvent : playOnEvent;
        this.pauseOnEvent = this.pauseOnEvent ? this.pauseOnEvent : pauseOnEvent;
        this.seekOnEvent = this.seekOnEvent ? this.seekOnEvent : seekOnEvent;
        this.durationOnEvent = this.durationOnEvent ? this.durationOnEvent : durationOnEvent;
        this.volumeOnEvent = this.volumeOnEvent ? this.volumeOnEvent : volumeOnEvent;
        this.setUp = this.setUp ? this.setUp : setUp;

        // Sets up custom functions on the audio object
        this.setTimeUpdate();
        this.setOnEnd();

        function setUp(audioInfo) {
            let {cuePoints = [], onEnd = []} = audioInfo;

            if (audioInfo.id === self.id) {
                self.audioElement.setAttribute('src', audioInfo.src);
                self.cuePoints = cuePoints;
                self.onEnd = onEnd;

                if (audioInfo.loop) {
                    self.audioElement.setAttribute('loop', '');
                } else {
                    self.audioElement.removeAttribute('loop')
                }

            }
        }

        function playOnEvent() {
            self.play();
        }

        function pauseOnEvent() {
            self.pause();
        }

        function muteOnEvent() {
            self.mute();
        }

        function unmuteOnEvent() {
            self.unmute();
        }

        function seekOnEvent(currentTime) {
            self.seek(currentTime);
        }

        function durationOnEvent() {
            self.getDuration()
        }

        function volumeOnEvent(volume) {
            self.setVolume(volume);
        }
    }
}