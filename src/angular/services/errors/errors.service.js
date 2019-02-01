import { ErrorMessages } from "../../utilities/messages.error";

export default class {
    constructor(iVXjs) {
        "ngInject";

        Object.assign(this, {
            iVXjs,
            ErrorMessages
        });
    }
}