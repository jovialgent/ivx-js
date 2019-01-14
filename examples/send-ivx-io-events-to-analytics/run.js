

export default (iVXjs, iVXjsDataiVXio,iVXjsAnalyticsGoogle) => {
    "ngInject";

    const debug = true;
    const storyKey = "sp-gtm-test";

    iVXjs.init({
        debug: true,
        analytics: iVXjsAnalyticsGoogle({
          
        }, iVXjs),
        data: iVXjsDataiVXio({
            storyKey,
            funnel: true
        }),
        experience: {
            data: {
                configData: "CONFIG DATA!",
                name: "NAME"
            }
        }
        // validation: iVXjsValidationSchema(),
    });

    iVXjs.Bus.on(iVXjs.constants.iVXio.EVENTS.RECORD_EVENT, args => {
        console.log("RECORDED EVENT", args);
    });

    iVXjs.Bus.on(iVXjs.constants.iVXio.EVENTS.SET_MILESTONE, args => {
        console.log("SET MILESTONE", args);
    })

    iVXjs.Bus.on(iVXjs.constants.iVXio.EVENTS.SET_COMPLETE, () => {
        console.log("SET COMPLETE");
    });

    iVXjs.Bus.on(iVXjs.constants.iVXio.EVENTS.SET_CONVERTED, args => {
        console.log("SET CONVERTED", args);
    });

    iVXjs.Bus.on(iVXjs.constants.iVXio.EVENTS.SET_DATA, args => {
        console.log("SET DATA", args);
    });
}