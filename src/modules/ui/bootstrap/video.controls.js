import DefaultVideoControls from '../default/video.controls.js';

export default class extends DefaultVideoControls {
    constructor(container, playerId) {
        super(container, playerId);
    }

    get totalTimeInfoClasses() {
        return 'duration ivx-video-controls-timestamp-duration';
    }

    get playClasses() {
        return 'glyphicon glyphicon-play ivx-video-controls-play-icon ivx-icon';
    }

    get pauseClasses() {
        return 'glyphicon glyphicon-pause ivx-video-controls-pause-icon ivx-icon';
    }

    get unmuteClasses() {
        return 'glyphicon glyphicon-volume-up ivx-video-controls-unmute-icon ivx-icon';
    }

    get muteClasses() {
        return 'glyphicon glyphicon-volume-off ivx-video-controls-mute-icon ivx-icon';
    }

    get playPauseControlsClasses() {
        return 'btn btn-default btn-xs ivx-video-controls-play-pause';
    }

    get muteControlsClasses() {
        return 'btn btn-default btn-xs ivx-video-controls-mute';
    }

    get scrubBarClasses() {
        return 'ivx-video-controls-scrub-bar';
    }

    get scrubBarTimeLapseClasses() {
        return `bar ivx-video-controls-scrub-bar-timelapse`
    }

    get chapterButtonClasses() {
        return 'btn chapter-button ivx-video-controls-chapters-item-control';
    }

    get trackListSelectContainerClasses() {
        return 'track-list-select-container ivx-video-controls-tracks'
    }

    get trackListSelectClasses() {
        return 'track-list-select form-control ivx-video-controls-tracks-select';
    }

    get trackListSelectActiveClasses() {
        return 'active ivx-video-controls-tracks-select-on';
    }

    get trackListSelectInactiveClasses() {
        return 'inactive ivx-video-controls-tracks-select-off'
    }

    get closeCaptionButtonClasses() {
        return 'close-caption-button btn btn-default ivx-video-controls-tracks-toggle';
    }

    get closeCaptionButtonActiveClasses() {
        return 'active ivx-video-controls-tracks-on';
    }

    get closeCaptionButtonInactiveClasses() {
        return 'inactive ivx-video-controls-tracks-off';
    }

    get closeCaptionButtonIconClasses() {
        return 'close-caption-button-icon glyphicon glyphicon-subtitles ivx-video-controls-tracks-toggle-icon ivx-icon'
    }

    get scrubBarHTML() {
        return `
            <div id="${this.playerId}-video-controls-scrub-bar" class="progress ${this.scrubBarClasses}">
                <div id="scrub-bar-progress-container" class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="min-width: 0;">
                    <div id="scrub-bar-timestamp-label" class="label">${this.timestampHTML}</div>
                </div>
            </div>
        `
    }

    get volumeBarClasses(){
        return ''
    }
    
    get volumeBarCurrentVolumeClasses(){
        return 'progress-bar';
    }
    
    get volumeBarHTML(){
        return `
            <div id="${this.playerId}-video-controls-volume-bar" class="progress ${this.volumeBarClasses}">
                <div class="${this.volumeBarCurrentVolumeClasses}"></div>
            </div> 
        `
    }

    get playPauseButtonHTML(){
        let {playClasses : play} = this;
        let {playPauseControlsClasses : playPauseControls} = this;
        return `
        <div id="${this.playerId}-play-button-container">
            <button id="${this.playerId}-video-controls-play-pause" class="${playPauseControls}">
                <i class='${play}'></i>
            </button>
        <div>`
    }

    get muteButtonHTML(){
        let {unmuteClasses : unmute, muteControlsClasses} = this;
        return `
        <div id="${this.playerId}-mute-button-container">
            <button id="${this.playerId}-video-controls-mute-controls" class="${muteControlsClasses}">
                <i class="${unmute}"></i>
            </button>
        </div>
        `
    }

    get html() {
        let {playPauseButtonHTML, scrubBarHTML, timestampHTML, muteButtonHTML, volumeBarHTML} = this;

        return `
        ${scrubBarHTML}
        ${playPauseButtonHTML}
        ${muteButtonHTML}
        ${volumeBarHTML}                           
        `
    }
}