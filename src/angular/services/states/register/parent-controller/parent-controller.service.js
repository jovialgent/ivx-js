export default class{
    constructor(){
        "ngInject";
    }

    setUp($scope, stateData){
        $scope.stateData = stateData;
    }
}