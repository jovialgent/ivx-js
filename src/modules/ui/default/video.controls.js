import {Controls} from '../../video/controls/index.js';

export default class extends Controls {
    constructor(container) {
        super();
        
        if(container.html instanceof Function){
            container.html(this.html);
            
        } else {
            var div = document.createElement('div');
            div.innerHTML = this.html;
          
            container.appendChild(div);
        }
        
        let {
            playPauseControlsClasses,
            totalTimeInfoClasses,
            currentTimeInfoClasses,
            scrubBarClasses,
            muteControlsClasses,
            volumeBarClasses            
        } = this;
        
        this.container = container;
        this.playPauseControls = document.getElementById("video-controls-play-pause");
        this.totalTimeInfo = document.getElementById("video-controls-total-time");
        this.currentTimeInfo =  document.getElementById("video-controls-current-time");
        this.scrubBar = document.getElementById("video-controls-scrub-bar");
        this.muteControls = document.getElementById("video-controls-mute-controls");
        this.volumeBar = document.getElementById("video-controls-volume-bar");
           
    }
    
    get playPauseControlsClasses(){
        return 'play-pause';
    }
    
    get totalTimeInfoClasses(){
        return 'duration';
    }
    
    get currentTimeInfoClasses(){
        return 'current-time';
    }
    
    get scrubBarClasses(){
        return 'scrub-bar';
    }
    
    get muteControlsClasses(){
        return 'mute'
    }
    
    get volumeBarClasses(){
        return 'volume-bar'
    }
    
    get playClasses(){
        return 'fa fa-play';
    }
    
    get pauseClasses(){
        return 'fa fa-pause';
    }
    
    get unmuteClasses(){
        return 'fa fa-volume-up';
    }
    
    get muteClasses(){
        return 'fa fa-volume-off';
    }
    
    get scrubBarTimeLapseClasses(){
        return `time-lapsed`
    }
    
    get volumeBarCurrentVolumeClasses(){
        return 'current-volume';
    }
    
    get playPauseButtonHTML(){
        let {playClasses : play} = this;
        let {playPauseControlsClasses : playPauseControls} = this;
        return `
        <button id="video-controls-play-pause" class="${playPauseControls}">
            <i class='${play}'></i>
        </button>`
    }
       
    get scrubBarHTML(){
        return `
             <div id="video-controls-scrub-bar" class="${this.scrubBarClasses}">
                <div class="${this.scrubBarTimeLapseClasses}"></div>
            </div>
        `
    }
    
    get timestampHTML(){
        return `
        <span id="video-controls-current-time" class="${this.currentTimeInfoClasses}"></span>
        <span id="video-controls-total-time" class="${this.totalTimeInfoClasses}"></span>
        `;
    }
    
    get muteButtonHTML(){
        let {unmuteClasses : unmute, muteControlsClasses} = this;
        return `
            <button id="video-controls-mute-controls" class="${muteControlsClasses}">
                <i class="${unmute}"></i>
            </button>
        `
    }
    
    get volumeBarHTML(){
        return `
            <div  id="video-controls-volume-bar" class="${this.volumeBarClasses}">
                <div class="${this.volumeBarCurrentVolumeClasses}"></div>
            </div> 
        `
    }

    get html() {
        
        let {
            playPauseButtonHTML,
            scrubBarHTML,
            timestampHTML,
            muteButtonHTML,
            volumeBarHTML
        } = this;
        return `
           ${playPauseButtonHTML}
           ${scrubBarHTML}
           ${timestampHTML}
           ${muteButtonHTML}
           ${volumeBarHTML}                        
        `
    }

}