import createFactoryFunction from '../utilities/create-factory-function.js';
import VideoEventConstants from "../../constants/video.events.js";

function setUpCuePoints(cuePoints) {
    let cuePointsTemp = sortCuePoints(cuePoints);

    cuePointsTemp = cuePointsTemp.map((cuePoint, index) => {
        cuePoint.fired = false;

        return cuePoint;
    });

    return cuePointsTemp;
}

function sortCuePoints(cuePoints) {
    return cuePoints.sort((cuePointA, cuePointB) => {
        if (cuePointA.timeAt > cuePointB.timeAt) {
            return 1;
        }

        if (cuePointA.timeAt < cuePointB.timeAt) {
            return -1;
        }

        return 0;
    });
}

class VideoStateController {
    constructor($rootScope, $state, iVXjsActions, iVXjsBus, iVXjs) {
        const videoEventNames = new VideoEventConstants();
        const self = this;



        const playerCanPlay = iVXjsBus.on(videoEventNames.CAN_PLAY, function stateVideoCanPlay(player) {
            const { playerId } = self;
            const { playerSettings, onVideoEnd = [], onVideoReady = [], next, cuePoints: unorderedCuePoints = [] } = self.stateData;
            const { autoplay = false } = playerSettings;

            self.cuePoints = setUpCuePoints(unorderedCuePoints);

            if (player.id === playerId) {
                let transitionAnimation = onVideoReady.find((event, index) => {
                    return event.eventName === "animateElement" && event.args.element === ".video-state-container";
                });

                if (!transitionAnimation) {
                    onVideoReady.push({
                        eventName: "animateElement",
                        args: {
                            element: ".video-state-container",
                            animationClasses: "show"
                        }
                    })
                }

                $state.current.data.player = player;

                iVXjs.log.debug(`onVideoReady Started`, {}, { state: $state.current.data, source: 'onVideoReady', status: 'started', actions: onVideoReady, timestamp: Date.now() });

                iVXjsActions.resolveActions(onVideoReady, () => {
                    if (autoplay) {
                        iVXjsBus.emit(videoEventNames.PLAY, {
                            playerId
                        });
                        iVXjsBus.emit(videoEventNames.ADD_PLAYING_CLASS, {
                            playerId
                        });
                    }

                    iVXjs.log.debug(`onVideoReady Completed`, {}, { state: $state.current.data, source: 'onVideoReady', status: 'completed', actions: onVideoReady, timestamp: Date.now() });

                    self.getActiveCues(player)
                    iVXjsBus.removeListener(videoEventNames.CAN_PLAY, playerCanPlay);
                });

            }

            const videoEnded = iVXjsBus.on(videoEventNames.ENDED, function stateVideoEnded(player) {
                console.log(player);
                if (player.id === self.playerId) {
                    const { onVideoEnd = [], next = [] } = self.stateData;

                    iVXjsBus.emit(videoEventNames.DISPOSE, player);

                    iVXjs.log.debug(`onVideoEnd Actions`, {}, { state: $state.current.data, source: 'onVideoEnd', status: 'completed', actions: onVideoEnd, timestamp: Date.now() });

                    iVXjsActions.resolveThenNavigate(onVideoEnd, next);
                    iVXjsBus.removeListener(videoEventNames.TIME_UPDATE, self.timeUpdateEvent);
                    iVXjsBus.removeListener(videoEventNames.ENDED, videoEnded);
                }
            });

            self.timeUpdateEvent = iVXjsBus.on(videoEventNames.TIME_UPDATE, function cuePointsOnUpdate(player, stateData) {
                if (player.id === self.playerId) {
                    const { cuePoints = [] } = self;
                    let { currentTime } = player;

                    if (cuePoints.length <= 0) return;

                    cuePoints.forEach((cuePoint, index) => {
                        let { timeAt, fired = false, always = false } = cuePoint;
                        let timeUntil = Math.abs(cuePoint.timeAt - currentTime);

                        if (timeAt <= currentTime && (always || !fired)) {
                            cuePoint.fired = true;

                            iVXjs.log.debug(`Cuepoint ${index} Started`, {}, { cuePoint, index, source: 'cuePoint', status: 'started', timestamp: Date.now() });

                            iVXjsActions.resolveActions([cuePoint], () => {
                                iVXjs.log.debug(`Cuepoint ${index} Completed`, {}, { cuePoint, index, source: 'cuePoint', status: 'completed', timestamp: Date.now() });
                            });
                        }
                    });
                }
            });
        });


        this.runTemplate = () => {
            console.log("GOT HERE");
        }
    }

    getActiveCues(player) {
        let { textTracks = [] } = player;
        let activeCues = [];
    }
}

VideoStateController.$inject = ['$rootScope', '$state', 'ivxjs.actions', 'ivxjs.bus', 'iVXjs'];

export default createFactoryFunction(VideoStateController)