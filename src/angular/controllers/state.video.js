import createFactoryFunction from '../utilities/create-factory-function.js';
import VideoEventConstants from "../../constants/video.events.js";
import { TypeValidator } from "../../utilities/type-parsers";

const typeValidator = new TypeValidator();

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
    constructor($rootScope, $state, $scope, iVXjsActions, iVXjsBus, iVXjs) {
        let { playerSettings, onVideoEnd = [], onVideoReady = [], next, cuePoints = [] } = $scope.stateData;
        let { autoplay = false } = playerSettings;
        let self = this;
        let videoEventNames = new VideoEventConstants();

        cuePoints = setUpCuePoints(cuePoints);

        const playerCanPlay = iVXjsBus.on(videoEventNames.CAN_PLAY, function stateVideoCanPlay(player) {
            const { playerId } = self;

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

                iVXjs.log.debug(`onVideoReady Started`, {}, { state: $scope.stateData, source: 'onVideoReady', status: 'started', actions: onVideoReady, timestamp: Date.now() });

                iVXjsActions.resolveActions(onVideoReady, () => {
                    if (autoplay) {
                        iVXjsBus.emit(videoEventNames.PLAY, {
                            playerId
                        });
                        iVXjsBus.emit(videoEventNames.ADD_PLAYING_CLASS, {
                            playerId
                        });
                    }

                    iVXjs.log.debug(`onVideoReady Completed`, {}, { state: $scope.stateData, source: 'onVideoReady', status: 'completed', actions: onVideoReady, timestamp: Date.now() });

                    self.getActiveCues(player)
                    iVXjsBus.removeListener(videoEventNames.CAN_PLAY, playerCanPlay);
                });

            }
        });
        const videoEnded = iVXjsBus.on(videoEventNames.ENDED, function stateVideoEnded(player) {
           

            if (player.id === self.playerId) {
                iVXjsBus.emit(videoEventNames.DISPOSE, player);
                iVXjs.log.debug(`onVideoEnd Actions`, {}, { state: $scope.stateData, source: 'onVideoEnd', status: 'completed', actions: onVideoEnd, timestamp: Date.now() });

                iVXjsActions.resolveThenNavigate(onVideoEnd, next);
                iVXjsBus.removeListener(videoEventNames.TIME_UPDATE, self.timeUpdateEvent);
                iVXjsBus.removeListener(videoEventNames.ENDED, videoEnded);
            }
        });

        this.timeUpdateEvent = iVXjsBus.on(videoEventNames.TIME_UPDATE, function cuePointsOnUpdate(player, stateData) {
            if (player.id === self.playerId) {
                let { currentTime } = player;

                if (cuePoints.length <= 0) return;

                cuePoints.forEach((cuePoint, index) => {
                    if (self.shouldFire(cuePoint, player)) {
                        cuePoint.fired = true;

                        iVXjs.log.debug(`Cuepoint ${index} Started`, {}, { cuePoint, index, source: 'cuePoint', status: 'started', timestamp: Date.now() });

                        iVXjsActions.resolveActions([cuePoint], () => {
                            iVXjs.log.debug(`Cuepoint ${index} Completed`, {}, { cuePoint, index, source: 'cuePoint', status: 'completed', timestamp: Date.now() });
                        });
                    }
                });
            }
        });
    }

    shouldFire(cuePoint, player) {
        const { currentTime, paused } = player;
        const { timeAt = 0, endAt, fired = false, always = false } = cuePoint;
        const canFire = (!fired || always) && !paused;

        if (typeValidator.isUndefined(endAt)) {
            const timeUntil = Math.abs(timeAt - currentTime);

            return timeUntil <= 0.2 && canFire;
        }

        return (timeAt <= currentTime && endAt >= currentTime) && canFire;
    }

    getActiveCues(player) {
        let { textTracks = [] } = player;
        let activeCues = [];
    }
}

VideoStateController.$inject = ['$rootScope', '$state', '$scope', 'ivxjs.actions', 'ivxjs.bus', 'iVXjs'];

export default createFactoryFunction(VideoStateController)