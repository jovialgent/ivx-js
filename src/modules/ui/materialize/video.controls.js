import DefaultVideoControls from '../default/video.controls.js';

export default class extends DefaultVideoControls {
    constructor(container, iVXjsBus) {
        super(container, iVXjsBus);
    }

    get totalTimeInfoClasses() {
        return 'duration';
    }

    get playClasses() {
        return 'play_arrow';
    }

    

    get pauseClasses() {
        return 'pause';
    }

    get unmuteClasses() {
        return 'volume_up';
    }

    get muteClasses() {
        return 'volume_off';
    }

    get playPauseControlsClasses() {
        return 'btn-floating waves-effect waves-light green';
    }

    get muteControlsClasses() {
        return 'btn-floating waves-effect waves-light grey';
    }

    get scrubBarClasses() {
        return 'range-field';
    }

    get scrubBarTimeLapseClasses() {
        return `bar`
    }

    get scrubBarHTML() {
        return `
            <div id="video-controls-scrub-bar" class="progress ${this.scrubBarClasses}">
                <div class="determinate bar"></div>
            </div>
            ${this.timestampHTML}
        `
    }

  
    get volumeBarCurrentVolumeClasses(){
        return 'determinate';
    }
    
    get volumeBarHTML(){
        return `
            <div id="video-controls-volume-bar" class="progress ${this.volumeBarClasses}">
                <div id="video-controls-scrub-bar" class="${this.volumeBarCurrentVolumeClasses}"></div>
            </div>
            
        `;
    }

    get chapterButtonClasses() {
        return 'chapter-button btn waves-effect waves-light';
    }

    get chapterActiveClasses() {
        return "active";
    }

    get chapterInActiveClasses() {
        return "inactive"
    }

    get trackListSelectContainerClasses() {
        return 'track-list-select-container input-field'
    }

    get trackListSelectClasses() {
        return 'track-list-select browser-default';
    }

    get trackListSelectActiveClasses() {
        return 'active';
    }

    get trackListSelectInactiveClasses() {
        return 'inactive'
    }

    get closeCaptionButtonClasses() {
        return 'close-caption-button btn-floating waves-effect waves-light';
    }

    get closeCaptionButtonActiveClasses() {
        return 'active';
    }

    get closeCaptionButtonInactiveClasses() {
        return 'inactive';
    }

    get closeCaptionButtonIconClasses() {
        return 'close-caption-button-icon closed material-icons'
    }

    get closeCaptionButtonIconContent(){
        return "closed_caption"
    }


    adjustVolume(event) {
        let {volumeBar, muteControls, currentVolume, volumeBarCurrentVolumeClasses, unmuteClasses, muteClasses} = this;
        let {offsetWidth: width } = volumeBar;
        let currentVolumeSpan = this.getElementByClasses(volumeBar.children, [volumeBarCurrentVolumeClasses]);
        let absolutePosition = this.getAbsolutePosition(volumeBar);
        let {x: absoluteX} = absolutePosition;
        let { pageX: x } = event;
        let trueX = (x - (absoluteX));
        let volumeLevel = (trueX / width);
        let muteControlsClasses = [muteClasses, unmuteClasses];
        let muteIcon = this.getElementByClasses(muteControls.children, ["material-icons"]);

        muteIcon.innerHTML = unmuteClasses;
        currentVolumeSpan.style.width = `${volumeLevel * 100}%`;

        this.currentVolume = volumeLevel;
        this.setVolume(volumeLevel);
    }

    get playPauseButtonHTML(){
        let {playClasses : play, pauseClasses : pause} = this;
        let {playPauseControlsClasses : playPauseControls} = this;
        return `
        <div id="play-button-container"  class="left-align">
            <button id="video-controls-play-pause" class="${playPauseControls}">
                <i class='material-icons'>${play}</i>
            </button>
        </div>`
    }

    get timestampHTML(){
        return `
        <div class="center-align">
        <span id="video-controls-current-time" class="${this.currentTimeInfoClasses}"></span>
        <span id="video-controls-total-time" class="${this.totalTimeInfoClasses}"></span>
        </div>
        `;
    }

    setPlayPause(event) {
        let {playPauseControls, playClasses, pauseClasses} = this;
        let searchClasses = [playClasses, pauseClasses];
        let playPauseIcon = this.getElementByClasses(playPauseControls.children, ["material-icons"]);

        switch (playPauseIcon.innerHTML) {
            case playClasses:
                playPauseIcon.innerHTML = pauseClasses;

                this.play();
                break;
            case pauseClasses:
                playPauseIcon.innerHTML = playClasses;
                
                this.pause();
                break;
            default:
                break;
        }
    }

    setMute(event) {
        let {muteControls, muteClasses, unmuteClasses, volumeBar, volumeBarCurrentVolumeClasses} = this;
        let muteControlsClasses = [muteClasses, unmuteClasses];
        let muteIcon = this.getElementByClasses(muteControls.children, ["material-icons"]);
        let currentVolumeSpan = this.getElementByClasses(volumeBar.children, [volumeBarCurrentVolumeClasses]);

        switch (muteIcon.innerHTML) {
            case unmuteClasses:
                muteIcon.innerHTML = muteClasses;
                currentVolumeSpan.style.width = `0%`;
                
                this.setVolume(0);
                break;
            case muteClasses:
                muteIcon.innerHTML = unmuteClasses;
                currentVolumeSpan.style.width = `${this.currentVolume * 100}%`;
            
                this.setVolume(this.currentVolume);
                break;
            default:
                break;
        }
    }

    onPlaying() {
        let {playPauseControls, playClasses, pauseClasses} = this;
        let searchClasses = [playClasses, pauseClasses]
        let playPauseIcon = this.getElementByClasses(
            playPauseControls.children,
            ["material-icons"]
        );

        playPauseIcon.innerHTML = pauseClasses;

        this.play();
    }

    onPaused() {
        let {playPauseControls, playClasses, pauseClasses} = this;
        let searchClasses = [playClasses, pauseClasses]
        let playPauseIcon = this.getElementByClasses(
            playPauseControls.children,
            ["material-icons"]
        );

        playPauseIcon.innerHTML = playClasses;
        
        this.pause();
    }

    get muteButtonHTML(){
        let {unmuteClasses : unmute, muteControlsClasses} = this;
        return `
        <div id="mute-button-container" class="left-align">
            <button id="video-controls-mute-controls" class="${muteControlsClasses}">
               <i class='material-icons'>${unmute}</i>
            </button>
        </div>
        `
    }

    get html() {
        let {playPauseButtonHTML, scrubBarHTML, timestampHTML, muteButtonHTML, volumeBarHTML} = this;

        return `
        ${scrubBarHTML}
        ${playPauseButtonHTML}
        ${volumeBarHTML}  
        ${muteButtonHTML}                         
        `
    }
}