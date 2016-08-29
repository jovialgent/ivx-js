import createFactoryFunction from '../utilities/create-factory-function.js';
import HttpEventNames from '../../constants/http.events.js';

let httpEventNames = new HttpEventNames();

export class HttpInterceptors {
    constructor($q, iVXjs, iVXjsLog) {
        this.request = (config) => {
            iVXjsLog.log(`Requested Template: ${config.url}`);
            iVXjs.Bus.emit(httpEventNames.REQUEST_SUCCESS, config);
            return config;
        }
        this.requestError = (rejection) => {
            iVXjs.Bus.emit(httpEventNames.REQUEST_ERROR, rejection);
            iVXjsLog.error({ message: rejection.data }, "HTTP");

            return $q.reject(rejection);
        }
        this.response = (response) => {
            iVXjsLog.log(`Loaded Template: ${response.config.url}`);
            iVXjs.Bus.emit(httpEventNames.RESPONSE_SUCCESS, response);
            return response;
        }
        this.responseError = (rejection) => {
            iVXjsLog.error({ message: rejection.data, info: rejection }, "HTTP");
            iVXjs.Bus.emit(httpEventNames.RESPONSE_ERROR, rejection);

            return $q.reject(rejection);
        }
    }
}

HttpInterceptors.$inject = ["$q", "iVXjs", "ivxjs.log"];

export default createFactoryFunction(HttpInterceptors);