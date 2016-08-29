import PlayerSettings from "../settings.js";
import VideoEventNames from "../../../constants/video.events.js";

let playerSettings = new PlayerSettings();

export class Vimeo {
    constructor(container, settings, stateData, iVXjsLog) {
        this._settings = settings;
        this._stateData = stateData;

        let {id, width, loop} = settings;
        let options = { id, width, loop };

        container.html(this.html);

        this.player = new window.Vimeo.Player('player1', options);
        this.videoEventNames = new VideoEventNames();
        this.iVXjsLog = iVXjsLog
    }

    createPlayer() {
        let hasControls = 1;

        if (typeof controls === 'string') {
            hasControls = 0;
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
            playing: videoEventNames.PLAYING,
            ended: videoEventNames.ENDED
        };
        let eventsToDispose = Object.keys(eventNameMap);

        eventsToDispose.forEach((eventNameToDispose, index) => {
            if (!self[`${eventNameToDispose}OnEvent`]) return;

            iVXjsBus.removeListener(eventNameMap[eventNameToDispose], self[`${eventNameToDispose}OnEvent`])
        });
    }

    addEventListeners(iVXjsBus) {
        let {_stateData: stateData, videoEventNames, _settings} = this;
        let {id} = _settings;
        let self = this;
        let timeUpdateId;
        let url = `https://player.vimeo.com/video/${_settings.id}`
        let oEmbedUrl = `https://vimeo.com/api/oembed.json?url=${url}`
        let canGetVideo = (xhr) => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                } else {
                    let errorObj = {
                        message : `Vimeo failed to load with id: ${id}.`
                    }
                    self.iVXjsLog.error(errorObj, "VIDEO");
                }
            }
        };
        let xhr = new XMLHttpRequest();
        let deferred = new Promise((resolve, reject) => {
            xhr.onreadystatechange = () => { canGetVideo(xhr); };
            xhr.open('GET', oEmbedUrl);
            xhr.send();
        });

        self.durationOnEvent = iVXjsBus.on(videoEventNames.GET_DURATION, durationOnEvent);
        self.pauseOnEvent = iVXjsBus.on(videoEventNames.PAUSE, pauseOnEvent);
        self.playOnEvent = iVXjsBus.on(videoEventNames.PLAY, playOnEvent);
        self.seekOnEvent = iVXjsBus.on(videoEventNames.SEEK, seekOnEvent);
        self.volumeOnEvent = iVXjsBus.on(videoEventNames.SET_VOLUME, volumeOnEvent);

        self.durationOnEvent = typeof self.durationOnEvent === 'function' ? self.durationOnEvent : durationOnEvent;
        self.pauseOnEvent = typeof self.pauseOnEvent === 'function' ? self.pauseOnEvent : pauseOnEvent;
        self.playOnEvent = typeof self.playOnEvent === 'function' ? self.playOnEvent : playOnEvent;
        self.seekOnEvent = typeof self.seekOnEvent === 'function' ? self.seekOnEvent : seekOnEvent;
        self.volumeOnEvent = typeof self.volumeOnEvent === 'function' ? self.volumeOnEvent : volumeOnEvent;

        deferred.then(()=>{
             self.player.ready().then(() => {
                iVXjsBus.emit(videoEventNames.CAN_PLAY, self.player);
            });
        })
       
        self.player.on('timeupdate', (vimeoPlayInfo) => {
            vimeoPlayInfo.currentTime = vimeoPlayInfo.seconds;

            iVXjsBus.emit(videoEventNames.TIME_UPDATE, vimeoPlayInfo);
        });

        self.player.on('ended', () =>{
            console.log("GOT HERE?");
            iVXjsBus.emit(videoEventNames.ENDED, self);
        });

        self.player.on('loaded', ()=>{
            iVXjsBus.emit(videoEventNames.CAN_PLAY, self);
        })

        function playOnEvent() {
            self.player.play();
        }

        function pauseOnEvent() {
            self.player.pause();
        }

        function volumeOnEvent(volume) {
            self.player.setVolume(volume);
        }

        function seekOnEvent(currentTime) {
            self.player.setCurrentTime(currentTime);
        }

        function durationOnEvent() {
            self.player
                .getDuration()
                .then((duration)=>{
                    iVXjsBus.emit(videoEventNames.SET_DURATION, duration);
                });   
        }
    }

    get html() {
        return `<div id="player1" data-vimeo-autoplay="false" data-vimeo-loop="false"></div>`;
    }
}