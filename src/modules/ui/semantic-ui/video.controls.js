import DefaultVideoControls from '../default/video.controls.js';

export default class extends DefaultVideoControls {
    constructor(container, playerId) {
        super(container, playerId);
    }

    get totalTimeInfoClasses() {
        return 'duration';
    }

    get playClasses() {
        return 'play icon';
    }

    get pauseClasses() {
        return 'pause icon';
    }

    get unmuteClasses() {
        return 'unmute icon';
    }

    get muteClasses() {
        return 'mute icon';
    }

    get playPauseControlsClasses() {
        return 'ui icon button play-pause';
    }

    get muteControlsClasses() {
        return 'ui icon button mute';
    }

    get scrubBarClasses() {
        return 'ui small progress';
    }

    get scrubBarTimeLapseClasses() {
        return `bar`;
    }

    get volumeBarClasses(){
        return `ui small progress`;
    }

    get volumeBarCurrentVolumeClasses(){
        return `bar`;
    }

    get chapterButtonClasses() {
        return 'ui button chapter-button';
    }

    get chapterListClasses() {
        return "ui ordered list";
    }

    get chapterListItemClasses(){
        return "item";
    }

    get trackListSelectContainerClasses() {
        return 'track-list-select-container'
    }

    get trackListSelectClasses() {
        return 'track-list-select ui dropdown';
    }

    get trackListSelectActiveClasses() {
        return 'active';
    }

    get trackListSelectInactiveClasses() {
        return 'inactive'
    }

    get closeCaptionButtonClasses() {
        return 'close-caption-button ui icon button';
    }

    get closeCaptionButtonActiveClasses() {
        return 'active';
    }

    get closeCaptionButtonInactiveClasses() {
        return 'inactive';
    }

    get closeCaptionButtonIconClasses() {
        return 'close-caption-button-icon closed captioning icon'
    }

    get scrubBarHTML() {
        return `      
          <div id="${this.playerId}-video-controls-scrub-bar" class="${this.scrubBarClasses}">
                <div style="min-width:0" class="${this.scrubBarTimeLapseClasses}">
                     
                </div>
                  <div class='label'>
                        ${this.timestampHTML}
                </div>
           
            </div>`;
    }

    get volumeBarHTML(){
        return `
            <div id="${this.playerId}-video-controls-volume-bar" class="progress ${this.volumeBarClasses}">
                <div style="min-width:0" class="${this.volumeBarCurrentVolumeClasses}"></div>
            </div>`;
    }


    get html() {
        let {playPauseButtonHTML, scrubBarHTML, timestampHTML, muteButtonHTML, volumeBarHTML} = this;

        return `
        ${scrubBarHTML}
        ${playPauseButtonHTML}
        ${muteButtonHTML}
        ${volumeBarHTML}`;
    }
};