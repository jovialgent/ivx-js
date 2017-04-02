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
    constructor($rootScope, $state, iVXjsActions, iVXjsBus, iVXjs, EventStore, ExperienceContainer) {
        let { playerSettings, onVideoEnd = [], onVideoReady = [], next, cuePoints = [] } = $state.current.data;
        let { autoplay = false } = playerSettings;
        let videoEventNames = new VideoEventConstants();

        cuePoints = setUpCuePoints(cuePoints);

        this.inputContainer = document.getElementById(ExperienceContainer.id);

        this.inputContainer.style.opacity = 0;
        this.inputContainer.style.pointerEvents = 'none';
     

        iVXjsBus.once(videoEventNames.CAN_PLAY, function stateVideoCanPlay(player) {
            // let transitionAnimation = onVideoReady.find((event, index) =>{
            //     return event.eventName === "animateElement" && event.args.element === ".video-state-container";
            // });

            // if(!transitionAnimation){
            //     onVideoReady.push({
            //         eventName : "animateElement",
            //         args : {
            //             element : ".video-state-container",
            //             animationClasses : "show"
            //         }
            //     })
            // }

            iVXjsActions.resolveActions(onVideoReady, () => {
                if (autoplay) {
                    iVXjsBus.emit(videoEventNames.PLAY);
                    iVXjsBus.emit(videoEventNames.ADD_PLAYING_CLASS);
                }
            });



            self.player = player;
            EventStore.register(update);
        });
        iVXjsBus.once(videoEventNames.ENDED, function stateVideoEnded() {
            iVXjsBus.emit(videoEventNames.DISPOSE);
            iVXjsActions.resolveThenNavigate(onVideoEnd, next);
            EventStore.remove(update);
        });
        iVXjsBus.on(videoEventNames.TIME_UPDATE, function cuePointsOnUpdate(player, stateData) {
            let { currentTime } = player;



         
            // if (cuePoints.length <= 0) return;

            // cuePoints.forEach((cuePoint, index) => {
            //     let { timeAt, fired = false, always = false } = cuePoint;
            //     let timeUntil = Math.abs(cuePoint.timeAt - currentTime);

            //     if (timeAt <= currentTime && (always || !fired)) {
            //         cuePoint.fired = true;
            //         iVXjsBus.emit(cuePoint.eventName);
            //         iVXjsActions.resolveActions([cuePoint], () => {

            //         });
            //     }
            // });

        });

        var ball = document.getElementsByClassName('ball')[0];
        var h = 575; // x vertex, half of total bounce duration
        var k = 160; // y vertex, total bounce height
        var a = -4 * k / Math.pow(h * 2, 2); // coefficient: -.000483932
        var ypos, start, time;

        function update(timeObj) {
            let currentTime = self.player.getCurrentTime() * 1000;
            ypos = a * Math.pow(((currentTime + h) % (h * 2) - h), 2) + k;
            ball.style.transform = 'translateY(' + -ypos + 'px)';

        }


    }
}

VideoStateController.$inject = ['$rootScope', '$state', 'ivxjs.actions', 'ivxjs.bus', 'iVXjs', 'EventStore', 'ExperienceContainer'];

export default createFactoryFunction(VideoStateController)