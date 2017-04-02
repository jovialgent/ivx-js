export default class {
    constructor() {

    }

    getConfigJSON(url) {
        let xhr = new XMLHttpRequest();
        let self = this;
        let deferred = new Promise((resolve, reject) => {
            xhr.onreadystatechange = () => {
                self.isValidJSONRequest(resolve, reject, xhr);
            };
            xhr.open('GET', url);
            xhr.send();
        });

        return deferred;
    }

    isValidJSONRequest(resolve, reject, xhr) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    let responseJSON = JSON.parse(xhr.responseText);
                    resolve(responseJSON)
                } catch (e) {
                    console.error(e);
                }
            } else {
                reject({ error: 'Config JSON Not Obtained' });
            }
        }
    }
}