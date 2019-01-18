
import config from "./config/index.js";

export default ($timeout, iVXjs, iVXjsDataiVXio) => {
    "ngInject";

    iVXjs.init({
        config: config(),
        // data: iVXjsDataiVXio(),
        experience: {
            data: {
                testCondition: true
            },
            checkActions(args) {
                
            },
            checkTimeResolveActions(args) {
                const timeoutinMS = (Math.random() * 3000) + 500;

                $timeout(() => {
                    console.log("Resolved With These Args", args);
                }, timeoutinMS)
            }
        }
    });
}