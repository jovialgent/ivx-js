import ControlEvents from './events.js';
import VideoEventNames from "../../../constants/video.events.js";
import TrackEventNames from "../../../constants/tracks.events.js";
import TrackCuesEventNames from "../../../constants/tracks.cues.events.js";

export class Controls extends ControlEvents {
    constructor() {
        super();
        this.currentVolume = 0.5;
        this.controlEventNames = new VideoEventNames();
        this.trackEventNames = new TrackEventNames();
        this.trackCuesEventName = new TrackCuesEventNames();
    }

    dispose(iVXjsBus) {
        iVXjsBus.removeListener(this.controlEventNames.TIME_UPDATE, this.updateTime);
        iVXjsBus.removeListener(this.controlEventNames.PLAYING, this.whilePlaying);
        iVXjsBus.removeListener(this.controlEventNames.CAN_PLAY, this.canPlayCallback);
        iVXjsBus.removeListener(this.trackCuesEventName.ON_CHAPTER_START, this.chapterChange);
        iVXjsBus.removeListener(this.trackEventNames.CHANGE_CURRENT_TRACK, this.trackChange)

    }

    getAbsolutePosition(element) {
        let relativePosition = { x: element.offsetLeft, y: element.offsetTop };

        if (element.offsetParent) {
            let tempPosition = this.getAbsolutePosition(element.offsetParent);

            relativePosition.x += tempPosition.x;
            relativePosition.y += tempPosition.y;
        }

        return relativePosition;
    }

    adjustVolume(event) {
        let { volumeBar, muteControls, currentVolume, volumeBarCurrentVolumeClasses, unmuteClasses, muteClasses } = this;
        let { offsetWidth: width } = volumeBar;
        let currentVolumeSpan = this.getElementByClasses(volumeBar.children, [volumeBarCurrentVolumeClasses]);
        let absolutePosition = this.getAbsolutePosition(volumeBar);
        let { x: absoluteX } = absolutePosition;
        let { pageX: x } = event;
        let trueX = (x - (absoluteX));
        let volumeLevel = (trueX / width);
        let muteControlsClasses = [muteClasses, unmuteClasses];
        let muteIcon = this.getElementByClasses(muteControls.children, muteControlsClasses);

        muteIcon.className = unmuteClasses;
        currentVolumeSpan.style.width = `${volumeLevel * 100}%`;

        this.currentVolume = volumeLevel;
        this.unmute();
        this.setVolume(volumeLevel);
    }

    scrub(event) {
        let { currentTimeInfo, scrubBar, scrubBarTimeLapseClasses } = this;
        let { offsetWidth: width } = scrubBar;
        let absolutePosition = this.getAbsolutePosition(scrubBar);
        let { x: absoluteX } = absolutePosition;
        let { pageX: x } = event;
        let trueX = (x - (absoluteX));
        let scrubToTime = this.duration * (trueX / width);
        let currentTimeObject = this.convertSecondsToParts(scrubToTime);
        let currentTimeStamp = this.createTimeStamp(currentTimeObject);
        let searchClasses = [scrubBarTimeLapseClasses]
        let timelapsed = this.getElementByClasses(scrubBar.children, searchClasses);

        currentTimeInfo.innerHTML = `${currentTimeStamp}`;
        timelapsed.style.width = `${(trueX / width) * 100}%`;

        this.seek(scrubToTime);
    }

    setPlayPause(event) {
        let { playPauseControls, playClasses, pauseClasses } = this;
        let searchClasses = [playClasses, pauseClasses];
        let playPauseIcon = this.getElementByClasses(playPauseControls.children, searchClasses);

        switch (playPauseIcon.className) {
            case playClasses:
                playPauseIcon.className = pauseClasses;

                this.play();
                break;
            case pauseClasses:
                playPauseIcon.className = playClasses;

                this.pause();
                break;
            default:
                break;
        }
    }

    setMute(event) {
        let { muteControls, muteClasses, unmuteClasses, volumeBar, volumeBarCurrentVolumeClasses } = this;
        let muteControlsClasses = [muteClasses, unmuteClasses];
        let muteIcon = this.getElementByClasses(muteControls.children, muteControlsClasses);
        let currentVolumeSpan = this.getElementByClasses(volumeBar.children, [volumeBarCurrentVolumeClasses]);

        switch (muteIcon.className) {
            case unmuteClasses:
                muteIcon.className = muteClasses;
                currentVolumeSpan.style.width = `0%`;

                this.mute();
                break;
            case muteClasses:
                muteIcon.className = unmuteClasses;
                currentVolumeSpan.style.width = `${this.currentVolume * 100}%`;

                this.unmute();
                break;
            default:
                break;
        }
    }

    onReadyToPlay(player, stateData) {
        let { volumeBar, volumeBarCurrentVolumeClasses } = this;
        let self = this;
        let currentVolumeSpan = this.getElementByClasses(volumeBar.children, [volumeBarCurrentVolumeClasses]);

        currentVolumeSpan.style.width = `${self.currentVolume * 100}%`;

        this.setVolume(self.currentVolume);
        this.getDuration((duration) => {
            let { totalTimeInfo, currentTimeInfo, scrubBar } = self;
            let durationTimeObject = self.convertSecondsToParts(duration);
            let durationTimeStamp = self.createTimeStamp(durationTimeObject);

            self.duration = duration;

            if (totalTimeInfo) totalTimeInfo.innerHTML = `/${durationTimeStamp}`;
            if (currentTimeInfo) currentTimeInfo.innerHTML = `00:00`;
            if (scrubBar) scrubBar.children[0].style.width = `0%`;
        });
    }

    onTimeUpdate(player) {
        let { currentTimeInfo, scrubBar, scrubBarTimeLapseClasses } = this;
        let { currentTime: seconds } = player;

        seconds = seconds > this.duration ? 0 : seconds;

        let currentTimeObject = this.convertSecondsToParts(seconds);
        let currentTimeStamp = this.createTimeStamp(currentTimeObject);
        let timeLapsed = seconds / this.duration;

        if (currentTimeInfo) currentTimeInfo.innerHTML = `${currentTimeStamp}`;

        let searchClasses = [scrubBarTimeLapseClasses];

        if (scrubBar) {
            let timelapsedElement = this.getElementByClasses(scrubBar.children, searchClasses);

            timelapsedElement.style.width = `${timeLapsed * 100}%`;
        }
    }

    onPlaying() {
        let { playPauseControls, playClasses, pauseClasses } = this;
        let searchClasses = [playClasses, pauseClasses]
        let playPauseIcon = this.getElementByClasses(
            playPauseControls.children,
            searchClasses
        );

        playPauseIcon.className = pauseClasses;

        this.play();
    }

    onPaused() {
        let { playPauseControls, playClasses, pauseClasses } = this;
        let searchClasses = [playClasses, pauseClasses]
        let playPauseIcon = this.getElementByClasses(
            playPauseControls.children,
            searchClasses
        );

        playPauseIcon.className = playClasses;

        this.pause();
    }

    addEventListeners(iVXjsBus) {
        let self = this;
        let { scrubBar, volumeBar, playPauseControls, muteControls, trackCuesEventName } = this;

        this.iVXjsBus = iVXjsBus;
        this.updateTime = iVXjsBus.on(this.controlEventNames.TIME_UPDATE, updateTime);
        this.whilePaused = iVXjsBus.on(this.controlEventNames.PAUSED, whilePaused);
        this.whilePlaying = iVXjsBus.on(this.controlEventNames.PLAYING, whilePlaying);
        this.canPlayCallback = iVXjsBus.on(this.controlEventNames.CAN_PLAY, canPlayCallBack);
        this.chapterChange = iVXjsBus.on(this.trackCuesEventName.ON_CHAPTER_START, chapterChange);
        this.trackChange = iVXjsBus.on(this.trackEventNames.CHANGE_CURRENT_TRACK, trackChange)
        this.updateTime = this.updateTime ? this.updateTime : updateTime;

        volumeBar.addEventListener('mousedown', (event) => {
            self.adjustVolume(event);
        });
        scrubBar.addEventListener('click', (event) => {
            self.scrub(event);
        });
        playPauseControls.addEventListener('mouseup', (event) => {
            self.setPlayPause(event);
        });
        muteControls.addEventListener('click', (event) => {
            self.setMute(event);
        });

        this.iVXjsBus.once(this.controlEventNames.CAN_PLAY, (player) => {
            self.createPlayerSpecificControls({ player })
            self.player = player;
        });

        function chapterChange(cue) {
            const { chapterActiveClasses, chapterListItemClasses, chapterInActiveClasses } = self;
            const chapterList = Array.from(document.getElementsByClassName(chapterListItemClasses));
            const { chapterId: currentChapterId } = cue;

            chapterList.forEach(chapterListItem => {
                let { id: chapterId } = chapterListItem;

                if (chapterId === currentChapterId) {
                    chapterListItem.classList.remove(chapterInActiveClasses);
                    chapterListItem.classList.add(chapterActiveClasses);
                    return;
                }

                chapterListItem.classList.remove(chapterActiveClasses);
                chapterListItem.classList.add(chapterInActiveClasses);
            });
        };

        function trackChange(opts) {
            let { trackId = "" } = opts;

            self.updateTrackSelector(trackId)
        }

        function canPlayCallBack(player, _stateData) {
            self.onReadyToPlay(player, _stateData);
        }

        function updateTime(player) {
            self.onTimeUpdate(player);
        }

        function whilePaused(player) {
            self.onPaused(player);
        }

        function whilePlaying() {
            self.onPlaying();
        }
    }

    getElementByClasses(elements, classes) {
        let elementArray = elements instanceof Array ?
            elements :
            Array.from(elements);
        let thisElement;

        classes.forEach((className, index) => {
            if (!className) return;
            if (thisElement) return;

            thisElement = elementArray.find((element, index) => {
                return element.className.indexOf(className) >= 0;
            })
        });

        return thisElement;
    }

    createTimeStamp(timeObject) {
        let { hours, remainingMinutes: minutes, remainingSeconds: seconds } = timeObject;
        let hourString = '';
        let minuteString = minutes < 10 ?
            `0${minutes}:` :
            `${minutes}:`;
        let secondString = seconds < 10 ?
            `0${seconds}` :
            `${seconds}`;

        if (hours > 0) {
            hourString = hours < 10 ?
                `0${hours}:` :
                `${hours}:`;
        };

        return `${hourString}${minuteString}${secondString}`;
    }

    convertSecondsToParts(seconds) {
        let minutes = Math.floor(seconds / 60);
        let timeInformation = {
            minutes: minutes,
            hours: Math.floor(minutes / 60),
            remainingSeconds: Math.floor(seconds % 60),
            remainingMinutes: Math.floor(minutes % 60),
            seconds: seconds
        }

        return timeInformation;
    }
};