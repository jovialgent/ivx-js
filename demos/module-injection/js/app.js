(function () {
    angular
        .module('app', ['ivx-js'])
        .config(['iVXjs','iVXjs.ui.bootstrap', function (iVXjs, iVXjsUIBootstrap) {
            iVXjs.init({
                config: "data/module-injection.json",
                ui : iVXjsUIBootstrap()
            });
        }]);
})();