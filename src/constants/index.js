export default class {
    constructor(){
        this.LIBRARY = "iVXjs";
        this.DELIMETER = ":";
    }

    convention(){
        return this.LIBRARY;
    }

    addNames(nameCollection){
        let self = this;
        let names = Object.keys(nameCollection);
        
        names.forEach((name, index) =>{
            self[name] = self.convention(nameCollection[name]);
        })
    }
}