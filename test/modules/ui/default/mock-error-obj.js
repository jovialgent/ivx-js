export class ErrorObj {
    constructor(errorMessages, errorAttributes, nonValidate, data) {
        this.errorObj = {
            errorMessages: errorMessages,
            errorAttributes: errorAttributes,
            nonValidate: nonValidate,
            data: data
        }
    }


}
