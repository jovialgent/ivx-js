import { ObjectParsers, TypeValidator } from "../../../utilities/type-parsers.js";
import PlayerSettings from "../settings.js";
import VideoEventNames from "../../../constants/video.events.js";
import TrackCuesService from "./html5.cues";
import TrackEventNames from "../../../constants/tracks.events.js";
import TrackCueEventNames from "../../../constants/tracks.cues.events.js";


let thisObjectParsers = new ObjectParsers();
let playerSettings = new PlayerSettings();
let typeValidator = new TypeValidator();

export class Html5 {
    constructor(container, settings, stateData = {}, iVXjsLog) {

        Object.assign(this, {
            settings,
            stateData,
            videoEventNames: new VideoEventNames(),
            TrackCuesService,
            trackEventNames: new TrackEventNames(),
            trackCuesEventNames: new TrackCueEventNames(),
            stateData,
            iVXjsLog,
            currentVolume: 0.5
        })

        container.html(this.html);

        this.player = container[0].getElementsByTagName("VIDEO")[0];
    }

    play(args) {
        const { playerId } = args;
        const { id } = this.settings;

        if (!playerId || playerId === id) {
            if (this.player.paused) {
                this.player.play();
            }

            return;
        }
    }

    pause(args = {}) {
        const { playerId } = args;
        const { id } = this.settings;

        if (!playerId || playerId === id) {
            if (!this.player.paused) {
                this.player.pause();
            }

            return;
        }
    }

    getDuration(args = {}) {
        const { playerId } = args;
        const { id } = this.settings;

        if (id && playerId === id) {
            this.iVXjsBus.emit(this.videoEventNames.SET_DURATION, {
                playerId,
                duration: this.player.duration,
            });
        }
    }

    setVolume(args = {}) {
        const { playerId, volume } = args;
        const { id } = this.settings;

        if(this.player.muted) return;

        if (!typeValidator.isNumber(volume)) return;

        if (!playerId || playerId === id) {
            this.player.volume = volume;
            this.currentVolume = volume;
            return;
        }
    }

    mute(args = {}) {
        const { playerId, volume } = args;
        const { id } = this.settings;

        if (!playerId || playerId === id) {
            this.player.muted = true;
            return;
        }
    }

    unmute(args = {}) {
        const { playerId, volume } = args;
        const { id } = this.settings;

        if (!playerId || playerId === id) {
            this.player.muted = false;
            return;
        }
    }

    seek(args = {}) {
        const { currentTime, playerId } = args;
        const { id } = this.settings;

        if (!playerId || playerId === id) {
            this.player.currentTime = currentTime;
            this.player.volume = this.currentVolume;
            return;
        }
    }

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

    addEventListeners(iVXjsBus, settings = {}) {
        let { videoEventNames, trackEventNames, trackCuesEventNames, iVXjsLog } = this;
        let { tracks } = settings;
        let self = this;

        this.iVXjsBus = iVXjsBus;
        this.currentVolume = this.player.volume;

        if (tracks) {
            this.currentTrack = this.TrackCuesService.addTracks({
                tracks,
                video: this.player,
                iVXjsBus
            });
            this.oldTrack = this.currentTrack;
            this.player.textTracks.onchange = (evt) => {
                const { id: playerId } = this.settings;

                let { currentTrack: oldTrack } = self;
                let { currentTarget: currentTracks = [] } = evt;
                let currentTrack = Array.from(currentTracks).find((currentTrack) => {
                    return (currentTrack.kind === 'subtitles' || currentTrack.kind === 'captions') && currentTrack.mode === 'showing';
                });

                Object.assign(self, {
                    oldTrack,
                    currentTrack
                });

                self.iVXjsBus.emit(trackEventNames.ON_TRACK_CHANGE, { playerId, oldTrack, currentTrack })
            }
        }

        // Get custom iVXjsBus Function
        this.playOnEvent = iVXjsBus.on(videoEventNames.PLAY, playOnEvent);
        this.pauseOnEvent = iVXjsBus.on(videoEventNames.PAUSE, pauseOnEvent);
        this.volumeOnEvent = iVXjsBus.on(videoEventNames.SET_VOLUME, volumeOnEvent);
        this.muteOnEvent = iVXjsBus.on(videoEventNames.MUTE, muteOnEvent);
        this.unmuteOnEvent = iVXjsBus.on(videoEventNames.UNMUTE, unmuteOnEvent);
        this.durationOnEvent = iVXjsBus.on(videoEventNames.GET_DURATION, durationOnEvent);
        this.seekOnEvent = iVXjsBus.on(videoEventNames.SEEK, seekOnEvent);

        //Track Events
        this.changeCurrentTrackOnEvent = iVXjsBus.on(trackEventNames.CHANGE_CURRENT_TRACK, changeCurrentTrack);
        this.changeChapter = iVXjsBus.on(trackCuesEventNames.CHANGE_CHAPTER, changeCurrentChapter);

        // If it doesn't have a custom function, add the default one so the Bus can dispose of it.
        this.playOnEvent = this.playOnEvent ? this.playOnEvent : playOnEvent;
        this.pauseOnEvent = this.pauseOnEvent ? this.pauseOnEvent : pauseOnEvent;
        this.seekOnEvent = this.seekOnEvent ? this.seekOnEvent : seekOnEvent;
        this.durationOnEvent = this.durationOnEvent ? this.durationOnEvent : durationOnEvent;
        this.volumeOnEvent = this.volumeOnEvent ? this.volumeOnEvent : volumeOnEvent;
        this.changeCurrentTrack = this.changeCurrentTrack ? this.changeCurrentTrack : changeCurrentTrack;

        this.setOnReady();
        this.setTimeUpdate();
        this.setOnEnd();

        this.player.addEventListener('error', function (event) {
            let { settings } = self;
            let { src, sources = [] } = settings;
            let sourceString = "";

            if (src) {
                sourceString = `Failed to load video with filepath: ${src}`;
            }

            if (sources) {
                sourceString = sources.reduce((sourceList, sourcePath, index) => {
                    if (index === 0) {
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

        function playOnEvent(args = {}) {
            self.play(args);
        }

        function pauseOnEvent(args = {}) {
            self.pause(args);
        }


        function seekOnEvent(currentTime) {
            self.seek(currentTime);
        }

        function durationOnEvent(args = {}) {
            self.getDuration(args)
        }

        function volumeOnEvent(args = {}) {
            self.setVolume(args);
        }

        function muteOnEvent(args = {}) {
            self.mute(args);
        }

        function unmuteOnEvent(args = {}) {
            self.unmute(args);
        }

        function changeCurrentChapter(opts) {
            let { chapterId = "", playerId } = opts;
            let { player = {} } = self;

            if (!playerId || playerId === player.id) {
                let trackArray = Array.from(player.textTracks);
                let chapterTrack = trackArray.find(track => {
                    let { kind = "" } = track;

                    return kind === 'chapters';
                });

                if (chapterTrack) {
                    let { cues = [] } = chapterTrack;
                    let newChapterCue = Array.from(cues).find(cue => {
                        let { chapterId: currentChapterId } = cue;

                        return currentChapterId === chapterId;
                    });

                    if (newChapterCue) {
                        let { startTime } = newChapterCue;

                        self.seek({
                            currentTime: startTime,
                            playerId
                        });
                    }
                }
            }
        }

        function changeCurrentTrack(opts) {
            let { trackId = "", playerId } = opts;
            let { textTracks } = self.player;
            let trackArray = Array.from(textTracks);

            if (!playerId || playerId === self.player.id) runTrackChange();

            function runTrackChange() {

                if (trackId.length <= 0) {
                    trackArray.forEach((track) => {
                        Object.assign(track, {
                            mode: "hidden"
                        });
                    });

                    return;
                }

                let newTrack = trackArray.find(textTrack => {
                    let { kind, trackId: currentTrackId } = textTrack;
                    let isCaptions = (kind === 'captions' || kind === 'subtitles');

                    return isCaptions && currentTrackId === trackId;
                });

                if (newTrack) {
                    trackArray.forEach(textTrack => {
                        let { kind, trackId: currentTrackId } = textTrack;
                        let isCaptions = (kind === 'captions' || kind === 'subtitles');

                        if (isCaptions) {
                            Object.assign(textTrack, {
                                mode: currentTrackId === trackId ? "showing" : "hidden"
                            });
                        }
                    });
                }
            }
        }
    }

    dispose(iVXjsBus) {
        let { videoEventNames, trackEventNames, trackCuesEventNames } = this;
        let self = this;
        let eventNameMap = {
            play: videoEventNames.PLAY,
            pause: videoEventNames.PAUSE,
            seek: videoEventNames.SEEK,
            duration: videoEventNames.GET_DURATION,
            volume: videoEventNames.SET_VOLUME,
            mute: videoEventNames.MUTE,
            unmute: videoEventNames.UNMUTE,
            changeCurrentTrack: trackEventNames.CHANGE_CURRENT_TRACK,
            changeChapter: trackCuesEventNames.CHANGE_CHAPTER
        };
        let eventsToDispose = Object.keys(eventNameMap);

        eventsToDispose.forEach((eventNameToDispose, index) => {
            if (!self[`${eventNameToDispose}OnEvent`]) return;

            iVXjsBus.removeListener(eventNameMap[eventNameToDispose], self[`${eventNameToDispose}OnEvent`])
        });
    }

    get html() {
        let { tracks = [], sources = [], controls = true, isiOS = false } = this.settings;
        let tags = ['tracks', 'sources', 'isiOS', 'autoplay'];
        let justAttrs = ['controls'];

        if (typeof this.settings.controls === 'string' || !controls) {
            delete this.settings.controls;
        } else {
            this.settings.controls = true;
        }

        let attrHTML = thisObjectParsers.reduce(this.settings, (thisAttrHTML, value, key) => {
            if (tags.indexOf(key) >= 0) return thisAttrHTML;
            if (justAttrs.indexOf(key) >= 0) return `${thisAttrHTML} ${key}`;
            if (key === 'classes') return `${thisAttrHTML} class="${value}"`;

            return `${thisAttrHTML} ${key}="${value}"`
        }, "");
        let trackTags = tracks.reduce((trackHTML, trackSettings, index) => {
            let { content = "", cues = [] } = trackSettings;

            if (content.length > 0 || cues.length > 0) {
                return trackHTML;
            }

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
            <video  width="100%" ${attrHTML} onclick="this.paused ? this.play() : this.pause();">
                ${sourceTags}
                ${trackTags}
            </video>`;
    }
};