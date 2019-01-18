
import config from "./project.json";
// import "./components/my-video-player/index";

export default ($sceDelegateProvider, iVXjs, iVXjsDataiVXio, iVXjsUiBootstrap, iVXjsUiSemanticUi, iVXjsUiMaterialize, iVXjsValidationSchema, iVXjsDataFirebase, iVXjsAnalyticsGoogle) => {
    "ngInject";
    let playerIdCues = {};

    iVXjs.init({
        config,
        debug: false,
        validation: iVXjsValidationSchema(),
        experience: {
            cuePointFired: (args) => {
                const { playerId } = args;

                if (!playerIdCues[playerId]) {
                    playerIdCues[playerId] = 1;
                } else {
                    playerIdCues[playerId]++;
                }

                console.log("CUE POINT ON PLAYER ID ", playerId, " HAS FIRED ", playerIdCues[playerId], " TIMES.");
            }
        }
    });
}