export default class {
    constructor() {
        "ngInject";
    }

    setUp($scope, embeddedState, parentState, embeddedViewStateData, viewData) {
        const { next = [] } = embeddedViewStateData;
        
        $scope.embeddedStateData = Object.assign(embeddedState, {
            next
        });
    }
}