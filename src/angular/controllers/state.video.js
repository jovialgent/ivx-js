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
    constructor($rootScope, $state, iVXjsActions, iVXjsBus, iVXjs, iVXjsVideoService) {
        let self = this;
        let videoEventNames = new VideoEventConstants();

        const playerCanPlay = iVXjsBus.on(videoEventNames.READY, function stateVideoCanPlay(player) {
            let { stateData } = self;
            let { playerSettings, onVideoEnd = [], onVideoReady = [], next, cuePoints = [] } = stateData;
            let { autoplay = false } = playerSettings;
            const { playerId } = self;

            if (player.id === playerId) {
                let transitionAnimation = onVideoReady.find((event, index) => {
                    return event.eventName === "animateElement" && event.args.element === ".video-state-container";
                });

                cuePoints = setUpCuePoints(cuePoints);

                if (!transitionAnimation) {
                    onVideoReady.push({
                        eventName: "animateElement",
                        args: {
                            element: ".video-state-container",
                            animationClasses: "show"
                        }
                    })
                }

                stateData.player = player;

                iVXjs.log.debug(`onVideoReady Started`, {}, { state: self.stateData, source: 'onVideoReady', status: 'started', actions: onVideoReady, timestamp: Date.now() });

                iVXjsActions.resolveActions(onVideoReady, () => {
                    if (autoplay) {
                        iVXjsBus.emit(videoEventNames.PLAY, {
                            playerId
                        });
                        iVXjsBus.emit(videoEventNames.ADD_PLAYING_CLASS, {
                            playerId
                        });
                    }

                    iVXjs.log.debug(`onVideoReady Completed`, {}, { state: self.stateData, source: 'onVideoReady', status: 'completed', actions: onVideoReady, timestamp: Date.now() });
                    iVXjsBus.removeListener(videoEventNames.READY, playerCanPlay);
                });

            }
        });

        this.videoEnded = iVXjsBus.on(videoEventNames.ENDED, function stateVideoEnded(player) {
            const { onVideoEnd = [], next = [] } = self.stateData;

            if (player.id === self.playerId) {
                iVXjs.log.debug(`onVideoEnd Actions`, {}, { state: self.stateData, source: 'onVideoEnd', status: 'completed', actions: onVideoEnd, timestamp: Date.now() });
                iVXjsActions.resolveThenNavigate(onVideoEnd, next);
            }
        });
    }
}

VideoStateController.$inject = ['$rootScope', '$state', 'ivxjs.actions', 'ivxjs.bus', 'iVXjs', 'iVXjsVideoService'];

export default createFactoryFunction(VideoStateController)