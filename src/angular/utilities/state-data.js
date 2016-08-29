export default class { 
    constructor($state){
        let stateData = $state.current.data;
        this.stateData = stateData;
    }
}