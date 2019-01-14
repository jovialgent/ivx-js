
import config from "./project.json";

export default (iVXjs, iVXjsValidationSchema) => {
    "ngInject";
    let playerIdCues = {};

    iVXjs.init({
        config,
        debug: true,
        // ui: iVXjsUiBootstrap(),
        // validation: iVXjsValidationSchema(),
        experience: {
            cuePointFired: (args) => {
                const { playerId } = args;

                if (!playerIdCues[playerId]) {
                    playerIdCues[playerId] = 1;
                } else {
                    playerIdCues[playerId]++;
                }

                console.log("CUE POINT ON PLAYER ID ", playerId, " HAS FIRED ", playerIdCues[playerId], " TIMES.");
            },
            processPlay() {
                const self = this;

                console.log("onVideoPlay fired!");

                // return new Promise((resolve, rejected) => {
                //     setTimeout(() => {
                //         console.log("Play video resolved.");
                //         resolve();
                //     }, 1000);
                // });
            },
            processPause() {
                let self = this;

                console.log("onVideoPause fired!");
                
            },
            processMute() {
                let self = this;

                console.log("onVideoMute fired!");
            },
            processUnmute() {
                let self = this;

                console.log("onVideoUnmute fired!");
            }
        }
    }).then(() => {

    });
}