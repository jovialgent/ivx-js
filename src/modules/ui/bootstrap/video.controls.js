import DefaultVideoControls from '../default/video.controls.js';

export default class extends DefaultVideoControls {
    constructor(container, iVXjsBus) {
        super(container, iVXjsBus);
    }

    get totalTimeInfoClasses() {
        return 'duration';
    }

    get playClasses() {
        return 'glyphicon glyphicon-play';
    }

    get pauseClasses() {
        return 'glyphicon glyphicon-pause';
    }

    get unmuteClasses() {
        return 'glyphicon glyphicon-volume-up';
    }

    get muteClasses() {
        return 'glyphicon glyphicon-volume-off';
    }

    get playPauseControlsClasses() {
        return 'btn btn-default btn-xs';
    }

    get muteControlsClasses() {
        return 'btn btn-default btn-xs';
    }

    get scrubBarClasses() {
        return '';
    }

    get scrubBarTimeLapseClasses() {
        return `bar`
    }

    get scrubBarHTML() {
        return `
            <div id="video-controls-scrub-bar" class="progress ${this.scrubBarClasses}">
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
            <div id="video-controls-volume-bar" class="progress ${this.volumeBarClasses}">
                <div class="${this.volumeBarCurrentVolumeClasses}"></div>
            </div> 
        `
    }

    get playPauseButtonHTML(){
        let {playClasses : play} = this;
        let {playPauseControlsClasses : playPauseControls} = this;
        return `
        <div id="play-button-container">
            <button id="video-controls-play-pause" class="${playPauseControls}">
                <i class='${play}'></i>
            </button>
        <div>`
    }

    get muteButtonHTML(){
        let {unmuteClasses : unmute, muteControlsClasses} = this;
        return `
        <div id="mute-button-container">
            <button id="video-controls-mute-controls" class="${muteControlsClasses}">
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