export class Schema {
    constructor(){
        
    }
    
    createErrorMessage(schemaErrorObj, root){
        
        let {errors, path} = schemaErrorObj;
        let pathName = path.replace('$root', root);
        let errorList = errors.reduce((errorListTemp, error, index)=>{
            return `${errorListTemp}
       ${index+1}. ${error}`
        }, '')
        
        let errorMessage = `
Schema Error:
Path: ${pathName}
Errors: ${errorList} 
        `
        return errorMessage;
    }
};