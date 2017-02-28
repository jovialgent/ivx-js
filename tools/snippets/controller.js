import createFactoryFunction from '../../../utilities/factory-function-creator.js';
import DiagramActionCreators from "../../../event-store/reducers/diagram/action-creator";

const {constants: DiagramActionConstant} = new DiagramActionCreators();

export class NAME {
    constructor($state, SceneDataManager, StoryBuilderLogger) {
        let vm = this;
        let {DECISION_TREE_SIGNIFIER} = DiagramActionConstant;
        let {stateId, id: projectId} = $state.params;

        stateId = stateId.replace(DECISION_TREE_SIGNIFIER, '');

        SceneDataManager.connect(updateScene, attachEvents, vm);

        function updateScene(scene) {
            if (_.isEmpty(scene)) return {};

            return {

            };
        }


        function attachEvents(dispatch) {
            return {

            }
        };
    }
}

NAME.$inject = ["$state", "SceneDataManager", "StoryBuilderLogger"];

export default createFactoryFunction(NAME);