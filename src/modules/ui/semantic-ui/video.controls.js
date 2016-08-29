import DefaultVideoControls from '../default/video.controls.js';

export default class extends DefaultVideoControls {
    constructor(container, iVXjsBus) {
        super(container, iVXjsBus);
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

    get scrubBarHTML() {
        return `      
          <div id="video-controls-scrub-bar" class="${this.scrubBarClasses}">
                <div style="min-width:0" class="${this.scrubBarTimeLapseClasses}">
                     
                </div>
                  <div class='label'>
                        ${this.timestampHTML}
                </div>
           
            </div>`;
    }

    get volumeBarHTML(){
        return `
            <div id="video-controls-volume-bar" class="progress ${this.volumeBarClasses}">
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