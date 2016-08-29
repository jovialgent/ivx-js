import { ObjectParsers } from "../../../utilities/type-parsers.js";
import PlayerSettings from "../settings.js";
import VideoEventNames from "../../../constants/video.events.js";

let thisObjectParsers = new ObjectParsers();
let playerSettings = new PlayerSettings();

export class Html5 {
    constructor(container, settings, stateData = {}, iVXjsLog) {
        this.settings = settings;
        this.stateData = stateData;
        this.videoEventNames = new VideoEventNames();

        container.html(this.html);

        this.player = container[0].getElementsByTagName("VIDEO")[0];
        this.iVXjsLog = iVXjsLog;
    }

    play() {
        this.player.play();
    }

    pause() {
        this.player.pause();
    }

    seek(newTime) {
        this.player.currentTime = newTime;
    }

    getDuration() {
        this.iVXjsBus.emit(this.videoEventNames.SET_DURATION, this.player.duration);
    }

    setVolume(volume) {
        this.player.volume = volume;
    }

    seek(currentTime) {
        this.player.currentTime = currentTime
    }

    playing() { }

    setOnReady() {
        let self = this;

        this.player.addEventListener('pause', () => {
            self.iVXjsBus.emit(self.videoEventNames.PAUSED, self.player);
        })
        this.player.addEventListener('canplay', () => {
            self.iVXjsBus.emit(self.videoEventNames.CAN_PLAY, self.player, self.stateData)
        });
        this.player.addEventListener('playing', () => {
            self.iVXjsBus.emit(self.videoEventNames.PLAYING, self.player, self.stateData)
        });
    }

    setTimeUpdate() {
        let self = this;

        this.player.addEventListener('timeupdate', () => {
            self.iVXjsBus.emit(self.videoEventNames.TIME_UPDATE, self.player, self.stateData)
        })
    }

    setOnEnd() {
        let self = this;

        this.player.addEventListener('ended', () => {
            self.iVXjsBus.emit(self.videoEventNames.ENDED, self.player, self.stateData)
        })
    }

    addEventListeners(iVXjsBus) {
        let {videoEventNames, iVXjsLog} = this;;
        let self = this;

        this.iVXjsBus = iVXjsBus;

        // Get custom iVXjsBus Function
        this.playOnEvent = iVXjsBus.on(videoEventNames.PLAY, playOnEvent);
        this.pauseOnEvent = iVXjsBus.on(videoEventNames.PAUSE, pauseOnEvent);
        this.volumeOnEvent = iVXjsBus.on(videoEventNames.SET_VOLUME, volumeOnEvent);
        this.durationOnEvent = iVXjsBus.on(videoEventNames.GET_DURATION, durationOnEvent);
        this.seekOnEvent = iVXjsBus.on(videoEventNames.SEEK, seekOnEvent);
        this.playingOnEvent = iVXjsBus.on(videoEventNames.PLAYING, playingOnEvent);

        // If it doesn't have a custom function, add the default one so the Bus can dispose of it.
        this.playOnEvent = this.playOnEvent ? this.playOnEvent : playOnEvent;
        this.pauseOnEvent = this.pauseOnEvent ? this.pauseOnEvent : pauseOnEvent;
        this.seekOnEvent = this.seekOnEvent ? this.seekOnEvent : seekOnEvent;
        this.durationOnEvent = this.durationOnEvent ? this.durationOnEvent : durationOnEvent;
        this.volumeOnEvent = this.volumeOnEvent ? this.volumeOnEvent : volumeOnEvent;
        this.playingOnEvent = this.playingOnEvent ? this.playingOnEvent : playingOnEvent;

        this.setOnReady();
        this.setTimeUpdate();
        this.setOnEnd();

        this.player.addEventListener('error', function (event) {
            let {settings} = self;
            let {src,sources=[]} = settings;
            let sourceString = "";

            if(src){
                sourceString = `Failed to load video with filepath: ${src}`;
            } 

            if(sources){
                sourceString = sources.reduce((sourceList, sourcePath, index)=>{
                    if(index === 0){
                        return `${sourceList}${sourcePath.src}`;
                    }

                    return `${sourceList},${sourcePath.src}`;
                }, "Failed to load one of the videos with filepaths: ");
            }

            let errorObj = {
                message: `${sourceString}`
            }

            iVXjsLog.error(errorObj, "VIDEO");
        }, true);

        function playOnEvent() {
            self.play();
        }

        function pauseOnEvent() {
            self.pause();
        }

        function playingOnEvent() {
            self.playing();
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

    dispose(iVXjsBus) {
        let {videoEventNames} = this;
        let self = this;
        let eventNameMap = {
            play: videoEventNames.PLAY,
            pause: videoEventNames.PAUSE,
            seek: videoEventNames.SEEK,
            duration: videoEventNames.GET_DURATION,
            volume: videoEventNames.SET_VOLUME,
            playing: videoEventNames.PLAYING
        };
        let eventsToDispose = Object.keys(eventNameMap);

        eventsToDispose.forEach((eventNameToDispose, index) => {
            if (!self[`${eventNameToDispose}OnEvent`]) return;

            iVXjsBus.removeListener(eventNameMap[eventNameToDispose], self[`${eventNameToDispose}OnEvent`])
        });
    }

    get html() {
        let {isiOS = false} = this.stateData;
        let {tracks = [], sources = [], controls = true} = this.settings;
        let tags = ['tracks', 'sources', 'autoplay'];
        let justAttrs = ['controls'];

        if (typeof this.settings.controls === 'string' || !controls) {
            delete this.settings.controls;
        } else {
            this.settings.controls = true;
        }

        let attrHTML = thisObjectParsers.reduce(this.settings, (thisAttrHTML, value, key) => {
            if (tags.indexOf(key) >= 0) return thisAttrHTML;
            if (justAttrs.indexOf(key) >= 0) return `${thisAttrHTML} ${key}`;

            return `${thisAttrHTML} ${key}="${value}"`
        }, "");
        let trackTags = tracks.reduce((trackHTML, trackSettings, index) => {
            let trackAttrHTML = thisObjectParsers.reduce(trackSettings, (attrHTML, value, key) => {
                return `${attrHTML} ${key}="${value}"`;
            }, "")

            return `${trackHTML} 
            <track ${trackAttrHTML}>`;
        }, "");
        let sourceTags = sources.reduce((sourceHTML, sourceSettings, index) => {
            let sourceAttrHTML = thisObjectParsers.reduce(sourceSettings, (attrHTML, value, key) => {
                return `${attrHTML} ${key}="${value}"`;
            }, "")

            return `${sourceHTML} 
            <source ${sourceAttrHTML}>`;
        }, "");

        return `
            <video  width="100%" ${attrHTML}>
                ${sourceTags}
                ${trackTags}
            </video>`;
    }
};