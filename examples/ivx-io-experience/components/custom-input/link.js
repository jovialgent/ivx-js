export default ($scope, iElm, iAttrs, vm, { $filter, $compile, iVXjs, iVXjsErrors, iVXjsCustomInputInputService, iVXjsUIModule, pullInTemplate, ivxExperienceScope }) => {
    const { ErrorMessages } = iVXjsErrors;
    const { experience = {} } = iVXjs;
    const { data = {} } = experience;
    let { inputData: input } = vm;
    let { id, name, errors = {}, labelHTML, label = $filter('stringParsers')('startCase', id), attributes = {}, type, settings = {} } = input;
    let errorMessages = new ErrorMessages(input, errors, attributes);
    const inputValue = data[name];
    $scope = ivxExperienceScope.setScopeExperience($scope);

    let tagHTML = `ng-blur="vm.onChange(inputValue, $event)" ng-model="inputValue"`

    input.label = labelHTML ? labelHTML : label;
    input = pullInTemplate.convertLabel($filter('stringParsers')('startCase', id), input, $scope);
    input.beforeHtml = pullInTemplate.convertTemplateUrlToHtml(input.beforeHtml, $scope);
    input.afterHtml = pullInTemplate.convertTemplateUrlToHtml(input.afterHtml, $scope);

    let uiTextObj = {
        input: input,
        settings: settings,
        tags: tagHTML,
        errors: errorMessages
    };
    let text = new iVXjsUIModule.text(uiTextObj);

    $scope.inputValue = inputValue;

    iElm.html(text.html);

    $compile(iElm.contents())($scope);
}