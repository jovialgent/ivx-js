import { Actions } from '../ivx-js/actions.js';

export default class extends Actions {
    constructor() {
        super();
    }

    setBaseUrl(baseUrl) {
        this.baseUrl = baseUrl;

        return this;
    }

    raiseEvent(eventObj) {
        let { customEvent, customArgs = {} } = eventObj;
        let { experienceData } = customArgs;
        let customEventPromise;
        let eventArgs = customArgs;
        let self = this;

       

        if (Array.isArray(experienceData)) {
            eventArgs.experienceData = {};

            experienceData.forEach(key => {
                eventArgs.experienceData[key] = self.data[key];
            })
        } else if (!Array.isArray(experienceData) && experienceData) {
            eventArgs.experienceData = self.data;
        }

        if (customEvent) {
            customEventPromise = this.postAction(customEvent, customArgs)
        }

        return customEventPromise;
    }

    setData(eventObj) {
        let { key, value } = eventObj;
        let self = this;
        let setDataPromise = this.postAction('set-data', eventObj)
            .then((response) => {
                let { key, value } = response;
                let newData = {};

                newData[key] = value;
                self.data = Object.assign({}, self.data, newData);

                return self;
            },
            (err) => {
                console.log(err);
            });

        return setDataPromise;
    }

    postAction(actionName, args) {
        let self = this;
        let pathName = this.baseUrl.replace('[PATH]', `/${actionName}`);
        let postActionPromise = new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            let self = this;
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    let { reponseText } = xhr;
                    if (xhr.status === 200) {
                        try {
                            let responseJSON = JSON.parse(xhr.responseText);

                            resolve(responseJSON)
                        } catch (e) {
                            resolve(xhr.responseText);
                        }
                    } else {
                        reject({ error: 'Config JSON Not Obtained' });
                    }
                }
            };
            xhr.open('POST', pathName);
            xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            xhr.send(JSON.stringify(args));
        });

        return postActionPromise;
    }

}