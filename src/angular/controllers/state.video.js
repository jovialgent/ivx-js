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
        let { playerSettings, onVideoEnd = [], onVideoReady = [], next, cuePoints = [] } = $state.current.data;
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
                    iVXjsBus.removeListener(videoEventNames.CAN_PLAY, playerCanPlay);
                });

            }
        });
        const videoEnded = iVXjsBus.on(videoEventNames.ENDED, function stateVideoEnded(player) {
            if (player.id === self.playerId) {
                iVXjs.log.debug(`onVideoEnd Actions`, {}, { state: $state.current.data, source: 'onVideoEnd', status: 'completed', actions: onVideoEnd, timestamp: Date.now() });
                iVXjsActions.resolveThenNavigate(onVideoEnd, next);
                iVXjsBus.removeListener(videoEventNames.ENDED, videoEnded);
            }
        });


    }
}

VideoStateController.$inject = ['$rootScope', '$state', 'ivxjs.actions', 'ivxjs.bus', 'iVXjs', 'iVXjsVideoService'];

export default createFactoryFunction(VideoStateController)