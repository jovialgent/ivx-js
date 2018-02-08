import createFactoryFunction from '../utilities/create-factory-function.js';

class EmbeddedViewInlineController {
	constructor($scope, $window, iVXjsActions, iVXjsAudio, iVXjs) {
		
	}
}

EmbeddedViewInlineController.$inject = ['$scope', '$window', 'ivxjs.actions', 'ivxjs.modules.audio', 'iVXjs'];

export default createFactoryFunction(EmbeddedViewInlineController)