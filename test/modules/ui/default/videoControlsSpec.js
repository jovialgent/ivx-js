import VideoControls  from '../../../../library/modules/ui/default/video.controls.js';
import {iVXjs}  from '../../../../library/core/app.js';

import {FakeBus} from '../../../core/fake-bus.js';


describe('DefaultVideoControls', () => {
    let container, fakeBus, iVXjs, videoControls;
    
    beforeEach(() =>{
        spyOn(document, 'getElementById').and.callFake(() =>{
            
        });
        container = document.createElement('DIV');
        videoControls = new VideoControls(container, {});
        
            
        
    });
    
    
    describe('#control-Elements', () => {
        it('should create a scrub bar element.', () =>{
            expect(document.getElementById).toHaveBeenCalledWith('video-controls-play-pause');
        });
        
        it('should have a volume bar element', () =>{
            expect(document.getElementById).toHaveBeenCalledWith('video-controls-volume-bar');
        });
        
        it('should have a place to display the current time.', () =>{
            expect(document.getElementById).toHaveBeenCalledWith('video-controls-current-time');
        });
        
        it('should have a place to display the total time.', () =>{
            expect(document.getElementById).toHaveBeenCalledWith('video-controls-total-time');
        });
        
        it('should display the mute controls.', () =>{
            expect(document.getElementById).toHaveBeenCalledWith('video-controls-mute-controls');
        });
        
        it('should display a play/pause button.', () =>{
            expect(document.getElementById).toHaveBeenCalledWith('video-controls-play-pause');
        });   
    });
        
});
    