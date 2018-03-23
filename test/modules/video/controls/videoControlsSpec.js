import { Controls } from '../../../../src/modules/video/controls/index.js';
import VideoSettings from '../../../../src/modules/video/settings.js';

describe('Video Controls', () => {
    let scrubBar, muteControls, volumeBar, totalTimeInfo, playPauseControls, currentTimeInfo, fakeBus, videoControls, playerId;

    beforeEach(() => {
        playerId = Math.random().toString(36).substring(2, 15);

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

        muteControls = {
            addEventListener: (eventName, cb) => {

            },
            children: [{
                className: 'mute'
            }]
        }

        playPauseControls = {
            addEventListener: (eventName, cb) => {

            }
        }

        volumeBar = {
            addEventListener: (eventName, cb) => {

            },
            offsetWidth: 100,
            offsetLeft: 50,
            offsetParent: {
                offsetLeft: 50
            }

        }

        scrubBar = {
            addEventListener: (eventName, cb) => {

            },
            offsetWidth: 100,
            offsetLeft: 50,
            offsetParent: {
                offsetLeft: 50
            }

        }


        scrubBar.children = [{
            className: `time-lapsed`,
            style: {}
        }];

        volumeBar.children = [{
            className: `current-volume`,
            style: {}
        }];

        currentTimeInfo = {
            innerHTML: ""
        }

        totalTimeInfo = {
            innerHTML: ""
        }



        videoControls = new Controls();
        videoControls.playerId = playerId;
        videoControls.muteControls = muteControls;
        videoControls.playPauseControls = playPauseControls;
        videoControls.volumeBar = volumeBar;
        videoControls.scrubBar = scrubBar;
        videoControls.currentTimeInfo = currentTimeInfo;
        videoControls.totalTimeInfo = totalTimeInfo;
        videoControls.duration = 240;
        videoControls.scrubBarTimeLapseClasses = `time-lapsed`;
        videoControls.volumeBarCurrentVolumeClasses = `current-volume`;
        videoControls.muteClasses = 'mute';
        videoControls.unmuteClasses = 'unmute';
        videoControls.playClasses = 'play';
        videoControls.pauseClasses = 'pause';
        videoControls.containerEl = {
            addClass: () => { },
            removeClass: () => { }

        }
    });

    describe('#converSecondsToParts', () => {
        it('should return the currect minutes, hours, and seconds in an object', () => {
            let timeObj = videoControls.convertSecondsToParts(260);
            let testObj = {
                minutes: 4,
                hours: 0,
                remainingSeconds: 20,
                remainingMinutes: 4,
                seconds: 260
            }

            expect(timeObj).toEqual(testObj);

        })
    });

    describe('#createTimeStamp', () => {
        it('should create a time stamp for anytime below 1 hour in this format mm:ss', () => {
            let timeObj = videoControls.convertSecondsToParts(260);
            let timestamp = videoControls.createTimeStamp(timeObj);
            let testTimeStamp = '04:20';

            expect(testTimeStamp).toEqual(timestamp);

        })

        it('should create a time stamp for anytime above 1 hour in this format hh:mm:ss', () => {
            let timeObj = videoControls.convertSecondsToParts(7322);
            let timestamp = videoControls.createTimeStamp(timeObj);
            let testTimeStamp = '02:02:02';

            expect(testTimeStamp).toEqual(timestamp);

        })
    });

    describe('#addEventListeners', () => {

        it('should add an event listener to its scrubBar', () => {
            spyOn(videoControls.scrubBar, 'addEventListener');

            videoControls.addEventListeners(fakeBus);

            expect(videoControls.scrubBar.addEventListener).toHaveBeenCalled();

        })

        it('should add an event listener to its muteControls', () => {
            spyOn(videoControls.muteControls, 'addEventListener');

            videoControls.addEventListeners(fakeBus);

            expect(videoControls.muteControls.addEventListener).toHaveBeenCalled();

        });

        it('should add an event listener to its volumeBar', () => {
            spyOn(videoControls.volumeBar, 'addEventListener');

            videoControls.addEventListeners(fakeBus);

            expect(videoControls.volumeBar.addEventListener).toHaveBeenCalled();

        });

        it('should add an event listener to its playPauseControls', () => {
            spyOn(videoControls.playPauseControls, 'addEventListener');

            videoControls.addEventListeners(fakeBus);

            expect(videoControls.playPauseControls.addEventListener).toHaveBeenCalled();

        });
    })


    describe('#scrub', () => {
        it("should set the currentTimeInfo's inner html to the current time stamp based off of position.", () => {
            videoControls.addEventListeners(fakeBus);
            videoControls.scrub({
                pageX: 120
            });

            expect(videoControls.currentTimeInfo.innerHTML).toEqual('00:48');
        })

        it("should run seek to with value of the seconds to scrub.", () => {
            videoControls.addEventListeners(fakeBus);
            spyOn(videoControls, 'seek');
            videoControls.scrub({
                pageX: 120
            });

            expect(videoControls.seek).toHaveBeenCalledWith(48);
        });

        it("should set the width of the scrubbar's bar to the correct percent", () => {
            videoControls.addEventListeners(fakeBus);
            videoControls.scrub({
                pageX: 120
            });

            let scrubBarBar = videoControls.scrubBar.children[0];

            expect(scrubBarBar.style.width).toEqual('20%');

        })
    });


    describe('#adjustVolume', () => {
        it("should run setVolume to the correct volume.", () => {
            videoControls.addEventListeners(fakeBus);
            spyOn(videoControls, 'setVolume');
            videoControls.adjustVolume({
                pageX: 120
            });

            expect(videoControls.setVolume).toHaveBeenCalledWith(0.2);
        });

        it("should set the width of the volume bar's bar to the correct percent", () => {
            videoControls.addEventListeners(fakeBus);
            videoControls.adjustVolume({
                pageX: 120
            });

            let volumeBarBar = videoControls.volumeBar.children[0];

            expect(volumeBarBar.style.width).toEqual('20%');

        });

        it("should set the mute button to unmute", () => {
            videoControls.addEventListeners(fakeBus);
            videoControls.adjustVolume({
                pageX: 1221
            });

            let muteControlsIcon = videoControls.muteControls.children[0];

            expect(muteControlsIcon.className).toEqual(videoControls.unmuteClasses);

        });

        it("should set the the current volume to its percent.", () => {
            videoControls.addEventListeners(fakeBus);
            videoControls.adjustVolume({
                pageX: 120
            });

            expect(videoControls.currentVolume).toEqual(0.2);

        });
    });



    describe('#setMute', () => {
        xit('should set the volume to zero if the current class is unmute', () => {
            videoControls.muteControls.children = [{
                className: "unmute"
            }];

            spyOn(videoControls, 'setVolume');

            videoControls.toggleMute({});

            // expect(videoControls.setVolume).toHaveBeenCalledWith(0);

        });

        xit('should set the volume to the current volume if mute than unmuted', () => {
            videoControls.muteControls.children = [{
                className: "unmute"
            }];

            spyOn(videoControls, 'setVolume');
            videoControls.toggleMute({});
            expect(videoControls.setVolume).toHaveBeenCalledWith(0);
            videoControls.toggleMute({});
            expect(videoControls.setVolume).toHaveBeenCalledWith(0.5);

        });
    });

    describe('#setPlayPause', () => {
        it('should play if current class is this play class.', () => {
            videoControls.playPauseControls.children = [{
                className: "play"
            }];

            spyOn(videoControls, 'play');

            videoControls.togglePlayPause({});

            expect(videoControls.play).toHaveBeenCalled();

        });

        it('should pause if current class is this pause class.', () => {
            videoControls.playPauseControls.children = [{
                className: "pause"
            }];

            spyOn(videoControls, 'pause');

            videoControls.togglePlayPause({});

            expect(videoControls.pause).toHaveBeenCalled();

        });
    });

    describe('#onTimeUpdate', () => {
        it("should set the width of the scrub bar's width to the percentage done given by the time.", () => {

            videoControls.onTimeUpdate({
                currentTime: 24
            })

            let scrubBarBar = videoControls.scrubBar.children[0];


            expect(scrubBarBar.style.width).toEqual('10%');
        })


        it('should set the currentTimeInfo span to the correct time stamp.', () => {
            videoControls.addEventListeners(fakeBus);
            videoControls.onTimeUpdate({
                currentTime: 24
            })

            expect(videoControls.currentTimeInfo.innerHTML).toEqual('00:24');
        });

    });

    describe('#onReadyToPlay', () => {
        it('should set this volume bar to the current volume\'s width.', () => {
            videoControls.addEventListeners(fakeBus);
            videoControls.onReadyToPlay({}, {})

            let volumeBarBar = videoControls.volumeBar.children[0];

            expect(volumeBarBar.style.width).toEqual('50%');
        });
    });




});