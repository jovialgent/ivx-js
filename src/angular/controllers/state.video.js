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
    constructor($rootScope, $state, iVXjsActions, iVXjsBus) {
        let {playerSettings, onVideoEnd = [], onVideoReady = [], next, cuePoints = []} = $state.current.data;
        let {autoplay = false} = playerSettings;
        let videoEventNames = new VideoEventConstants();

        cuePoints = setUpCuePoints(cuePoints);

        iVXjsBus.once(videoEventNames.CAN_PLAY, function stateVideoCanPlay(player) {
            let transitionAnimation = onVideoReady.find((event, index) =>{
                return event.eventName === "animateElement" && event.args.element === ".video-state-container";
            });

            if(!transitionAnimation){
                onVideoReady.push({
                    eventName : "animateElement",
                    args : {
                        element : ".video-state-container",
                        animationClasses : "show"
                    }
                })
            }

            iVXjsActions.resolveActions(onVideoReady, () => {
                if (autoplay) {
                    iVXjsBus.emit(videoEventNames.PLAY);
                    iVXjsBus.emit(videoEventNames.ADD_PLAYING_CLASS);
                }
            });
        });
        iVXjsBus.once(videoEventNames.ENDED, function stateVideoEnded() {
            console.log("GOT HERE?");
            iVXjsBus.emit(videoEventNames.DISPOSE);
            iVXjsActions.resolveThenNavigate(onVideoEnd, next);
        });
        iVXjsBus.on(videoEventNames.TIME_UPDATE, function cuePointsOnUpdate(player, stateData) {
            let {currentTime} = player;

            if (cuePoints.length <= 0) return;

            cuePoints.forEach((cuePoint, index) => {
                let {timeAt, fired = false, always = false} = cuePoint;
                let timeUntil = Math.abs(cuePoint.timeAt - currentTime);

                if (timeAt <= currentTime && (always || !fired)) {
                    cuePoint.fired = true;
                    iVXjsBus.emit(cuePoint.eventName);
                    iVXjsActions.resolveActions([cuePoint], () => {

                    });
                }
            });

        });
    }
}

VideoStateController.$inject = ['$rootScope', '$state', 'ivxjs.actions', 'ivxjs.bus'];

export default createFactoryFunction(VideoStateController)