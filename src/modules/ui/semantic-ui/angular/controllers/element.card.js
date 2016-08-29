import createFactoryFunction from '../../../../../angular/utilities/create-factory-function.js';

class Card {
    constructor($scope, iVXjsActions) {
        let {settings = {}} = $scope;
        let {img = '',title = '',firstName = '',description = '',events = []} = settings;
        
        this.img = img;
        this.title = title;
        this.firstName = firstName;
        this.description = description;
        this.buttonPressed =  () =>{
            iVXjsActions.resolveActions(events, () =>{
                
            })
        }
    }
}

Card.$inject = ['$scope','ivxjs.actions'];

export default createFactoryFunction(Card)