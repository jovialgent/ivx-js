import PlayerSettings from "../settings.js";
import VideoEventNames from "../../../constants/video.events.js";
import { TypeValidator } from "../../../utilities/type-parsers.js";
import VideoClassNames from "../../../constants/video.classes.js";
import Element from "../../../utilities/element";


let playerSettings = new PlayerSettings();
let typeValidator = new TypeValidator();


export class Vimeo {
    constructor(container, settings, stateData, iVXjsLog, opts = {}) {
        const { vimeoPlayerContainer } = opts;
        const videoContainerElement = new Element(container);
        const containerElement = new Element(vimeoPlayerContainer);
        this._settings = settings;
        this._stateData = stateData;

        this.playerId = settings.playerId;

        let { id, width, loop } = settings;
        let options = { id, width, loop };

        videoContainerElement.html(this.html);

        this.player = new window.Vimeo.Player(settings.playerId, options);
        this.player.id = settings.playerId;
        this.videoEventNames = new VideoEventNames();
        this.iVXjsLog = iVXjsLog
        this.currentVolume = 0.5;

        Object.assign(this, {
            videoClassNames: new VideoClassNames(),
            container: containerElement
        })
    }

    createPlayer() {
        let hasControls = 1;

        if (typeof controls === 'string') {
            hasControls = 0;
        }
    }

    dispose(iVXjsBus) {
        let { videoEventNames } = this;
        let self = this;
        let eventNameMap = {
            play: videoEventNames.PLAY,
            pause: videoEventNames.PAUSE,
            seek: videoEventNames.SEEK,
            duration: videoEventNames.GET_DURATION,
            volume: videoEventNames.SET_VOLUME,
            playing: videoEventNames.PLAYING,
            ended: videoEventNames.ENDED,
            mute: videoEventNames.MUTE,
            unmute: videoEventNames.UNMUTE
        };
        let eventsToDispose = Object.keys(eventNameMap);

        eventsToDispose.forEach((eventNameToDispose, index) => {
            if (!self[`${eventNameToDispose}OnEvent`]) return;

            iVXjsBus.removeListener(eventNameMap[eventNameToDispose], self[`${eventNameToDispose}OnEvent`])
        });
    }

    addEventListeners(iVXjsBus) {
        let { _stateData: stateData, videoEventNames, _settings, container, videoClassNames } = this;
        let { id } = _settings;
        let self = this;
        let timeUpdateId;
        let url = `https://player.vimeo.com/video/${_settings.id}`
        let oEmbedUrl = `https://vimeo.com/api/oembed.json?url=${url}`
        let canGetVideo = (xhr) => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                } else {
                    let errorObj = {
                        message: `Vimeo failed to load with id: ${id}.`
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
        self.muteOnEvent = iVXjsBus.on(videoEventNames.MUTE, muteOnEvent);
        self.unmuteOnEvent = iVXjsBus.on(videoEventNames.UNMUTE, unmuteOnEvent);

        self.durationOnEvent = typeof self.durationOnEvent === 'function' ? self.durationOnEvent : durationOnEvent;
        self.pauseOnEvent = typeof self.pauseOnEvent === 'function' ? self.pauseOnEvent : pauseOnEvent;
        self.playOnEvent = typeof self.playOnEvent === 'function' ? self.playOnEvent : playOnEvent;
        self.seekOnEvent = typeof self.seekOnEvent === 'function' ? self.seekOnEvent : seekOnEvent;
        self.volumeOnEvent = typeof self.volumeOnEvent === 'function' ? self.volumeOnEvent : volumeOnEvent;

        self.player.on('timeupdate', (vimeoPlayInfo) => {
            self.player.getPaused()
                .then(paused => {
                    vimeoPlayInfo.currentTime = vimeoPlayInfo.seconds;
                    vimeoPlayInfo.id = self.playerId;
                    vimeoPlayInfo.paused = paused;

                    iVXjsBus.emit(videoEventNames.TIME_UPDATE, vimeoPlayInfo, self.stateData);
                });
        });

        self.player.on('pause', () => {
            self.container.addClass(videoClassNames.PAUSED);
            self.container.removeClass(videoClassNames.PLAYING);
            iVXjsBus.emit(videoEventNames.PAUSED, self.player);
        })

        self.player.on('play', () => {
            self.container.removeClass(videoClassNames.PAUSED);
            self.container.addClass(videoClassNames.PLAYING);
            iVXjsBus.emit(videoEventNames.PLAYING, self.player);
        })

        self.player.on('ended', () => {
            iVXjsBus.emit(videoEventNames.ENDED, self.player);
        });

        self.player.on('volumechange', args => {
            const { volume } = args;

            if (volume <= 0) {
                container.removeClass(videoClassNames.UNMUTED);
                container.addClass(videoClassNames.MUTED);
            } else {
                container.removeClass(videoClassNames.MUTED);
                container.addClass(videoClassNames.UNMUTED);
            }
        })

        self.player.on('loaded', () => {
            const { classes = "" } = self._settings;
            const iFrame = document.querySelector('#' + self.playerId + ' iframe');

            self.container.addClass(videoClassNames.PAUSED);
            self.container.addClass(videoClassNames.UNMUTED);

            if (iFrame) {
                iFrame.className = `${iFrame.className} ${classes}`;
            }

            self.player
                .getDuration()
                .then((duration) => {
                    self.player.duration = duration;

                    iVXjsBus.emit(videoEventNames.READY, self.player, self.stateData);
                });
        });

        function playOnEvent(args = {}) {
            const { playerId } = args;

            if (!playerId || playerId === self.player.id) {
                self.player.play();
            }
        }

        function pauseOnEvent(args = {}) {
            const { playerId } = args;

            if (!playerId || playerId === self.player.id) {
                self.player.pause();
            }
        }

        function volumeOnEvent(args = {}) {
            const { volume, playerId } = args;

            if (!playerId || playerId === self.player.id) {
                self.player.setVolume(volume);
                self.currentVolume = volume;
            }
        }

        function muteOnEvent(args = {}) {
            const { playerId } = args;

            if (!playerId || playerId === self.player.id) {
                self.player.setVolume(0);
            }
        }

        function unmuteOnEvent(args = {}) {
            const { playerId } = args;

            if (!playerId || playerId === self.player.id) {
                self.player.setVolume(self.currentVolume);
            }
        }

        function seekOnEvent(args = {}) {
            let { currentTime, playerId } = args;

            if (!playerId) self.player.setCurrentTime(currentTime);
            if (playerId === self.player.id) self.player.setCurrentTime(currentTime);
        }

        function durationOnEvent(args = {}) {
            const { playerId } = args;

            if (playerId === self.player.id) {
                self.player
                    .getDuration()
                    .then((duration) => {
                        iVXjsBus.emit(videoEventNames.SET_DURATION, {
                            playerId,
                            duration
                        });
                    });
            }
        }
    }

    get html() {
        const { classes = "", personalizationsHTML } = this._settings;

        return `<div id="${this.playerId}" class="player1 vimeo-player ${classes}" data-vimeo-autoplay="false" data-vimeo-loop="false"></div>
        <div class="ivx-video-personalization-section">
            ${personalizationsHTML}
        </div>
        `;
    }
}