import defaultConfig from "./config/default";

export default (iVXjs) => {
    "ngInject";

    iVXjs.init({
        config: defaultConfig(),
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
            }
        }
    });
}