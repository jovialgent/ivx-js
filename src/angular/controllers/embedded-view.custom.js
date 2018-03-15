import createFactoryFunction from '../utilities/create-factory-function.js';

class EmbeddedViewCustomController {
	constructor($scope, $window, iVXjsActions, iVXjsAudio, iVXjs) {
		
	}
}

EmbeddedViewCustomController.$inject = ['$scope', '$window', 'ivxjs.actions', 'ivxjs.modules.audio', 'iVXjs'];

export default createFactoryFunction(EmbeddedViewCustomController)