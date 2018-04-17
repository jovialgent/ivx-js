import VideoEvents from '../../../../src/modules/video/controls/events.js';
import VideoSettings from '../../../../src/modules/video/settings.js';
import VideoEventNames from "../../../../src/constants/video.events.js";
import {FakeBus} from '../../../core/fake-bus.js';

describe('Video Events', () => {
    let fakeBus, videoEvents, playerEventControlNames, videoEventNames;

    beforeEach(() => {
        playerEventControlNames = new VideoSettings().PlayerControlEvents;
        videoEventNames = new VideoEventNames();
        fakeBus = {
            on: function (eventName, obj) {

            },
            once: function (eventName, obj) {

            },
            emit: function (eventName, obj) {

            },

            removeListener: function (eventName, fn) {

            }

        };

        spyOn(fakeBus, 'emit').and.callFake(function (eventName) {

        });
        spyOn(fakeBus, 'on').and.callFake(function (eventName, obj) {

        });
        spyOn(fakeBus, 'once').and.callFake(function (eventName, obj) {

        });

        videoEvents = new VideoEvents();
        videoEvents.iVXjsBus = fakeBus;
        videoEvents.controlEventNames = videoEventNames;
    });


    describe('#play', () => {
        it(`should emit a play event.`, () => {
            videoEvents.play();
            expect(fakeBus.emit).toHaveBeenCalledWith(videoEventNames.PLAY);
        })
    });

    describe('#pause', () => {
        it(`should emit a pause event.`, () => {
            videoEvents.pause();
            expect(fakeBus.emit).toHaveBeenCalledWith(videoEventNames.PAUSE);
        })
    });

    describe('#setVolume', () => {
        it(`should emit a set volume event.`, () => {
            videoEvents.setVolume(3);
            expect(fakeBus.emit).toHaveBeenCalledWith(videoEventNames.SET_VOLUME, 3);
        })
    });

    describe('#seek', () => {
        it(`should emit a set seek event.`, () => {
            videoEvents.seek(123);
            expect(fakeBus.emit).toHaveBeenCalledWith(videoEventNames.SEEK, 123);
        })
    });

    describe('#getDuration', () => {
        it(`should emit a set a get duration event.`, () => {
            videoEvents.getDuration((duration)=>{});
            expect(fakeBus.emit).toHaveBeenCalledWith(videoEventNames.GET_DURATION);
        })
        
    });

});