import SampleStateTemplate from "./sample-state-template.html";

export default ($delegate) => {
    "ngInject";

    // $delegate.getParentStateTemplate = () => {
    //     return SampleStateTemplate;
    // }


    return $delegate;
}