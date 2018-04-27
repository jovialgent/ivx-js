import VideoControls from '../../../../src/modules/ui/default/video.controls.js';
import { iVXjs } from '../../../../src/core/app.js';

import { FakeBus } from '../../../core/fake-bus.js';


describe('DefaultVideoControls', () => {
    let container, fakeBus, iVXjs, videoControls, playerId;

    describe('#control-Elements', () => {
        beforeEach(() => {
            spyOn(document, 'getElementById').and.callFake(() => {

            });
            container = document.createElement('DIV');
            playerId = Math.random().toString(36).substring(2, 15);
            videoControls = new VideoControls(container, playerId);
        });

        it('should create a scrub bar element.', () => {
            expect(document.getElementById).toHaveBeenCalledWith(playerId + '-video-controls-play-pause');
        });

        it('should have a volume bar element', () => {
            expect(document.getElementById).toHaveBeenCalledWith(playerId + '-video-controls-volume-bar');
        });

        it('should have a place to display the current time.', () => {
            expect(document.getElementById).toHaveBeenCalledWith(playerId + '-video-controls-current-time');
        });

        it('should have a place to display the total time.', () => {
            expect(document.getElementById).toHaveBeenCalledWith(playerId + '-video-controls-total-time');
        });

        it('should display the mute controls.', () => {
            expect(document.getElementById).toHaveBeenCalledWith(playerId + '-video-controls-mute-controls');
        });

        it('should display a play/pause button.', () => {
            expect(document.getElementById).toHaveBeenCalledWith(playerId + '-video-controls-play-pause');
        });
    });

});
