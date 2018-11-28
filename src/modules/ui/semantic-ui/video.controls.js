import BasicVideoControls from '../basic/video.controls.js';

export default class extends BasicVideoControls {
    constructor(container, playerId) {
        super(container, playerId);
    }

    get playClasses() {
        return 'play icon ivx-video-controls-play-icon ivx-icon';
    }

    get pauseClasses() {
        return 'pause icon ivx-video-controls-pause-icon ivx-icon';
    }

    get unmuteClasses() {
        return 'unmute icon ivx-video-controls-unmute-icon ivx-icon';
    }

    get muteClasses() {
        return 'mute icon ivx-video-controls-mute-icon ivx-icon';
    }

    get playPauseControlsClasses() {
        return 'ui icon button play-pause ivx-video-controls-play-pause';
    }

    get muteControlsClasses() {
        return 'ui icon button mute ivx-video-controls-mute';
    }

    get scrubBarClasses() {
        return 'ui small progress ivx-video-controls-scrub-bar';
    }

    get scrubBarTimeLapseClasses() {
        return `bar ivx-video-controls-scrub-bar-timelapse`;
    }

    get volumeBarClasses(){
        return `ui small progress ivx-video-controls-volume-bar`;
    }

    get volumeBarCurrentVolumeClasses(){
        return `bar ivx-video-controls-volume-bar-volume`;
    }

    get chapterButtonClasses() {
        return 'ui button chapter-button ivx-video-controls-chapters-item-control';
    }

    get chapterListClasses() {
        return "ui ordered list ivx-video-controls-chapters";
    }

    get chapterListItemClasses(){
        return "item ivx-video-controls-chapters-item";
    }

   
    get trackListSelectClasses() {
        return 'track-list-select ui dropdown ivx-video-controls-tracks-select';
    }

    get trackListSelectActiveClasses() {
        return 'active ivx-video-controls-tracks-select-on';
    }

    get trackListSelectInactiveClasses() {
        return 'inactive ivx-video-controls-tracks-select-off';
    }

    get closeCaptionButtonClasses() {
        return 'close-caption-button ui icon button ivx-video-controls-tracks-toggle';
    }

    get closeCaptionButtonActiveClasses() {
        return 'active ivx-video-controls-tracks-on';
    }

    get closeCaptionButtonInactiveClasses() {
        return 'inactive ivx-video-controls-tracks-off';
    }

    get closeCaptionButtonIconClasses() {
        return 'close-caption-button-icon closed captioning icon ivx-video-controls-tracks-toggle-icon ivx-icon'
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