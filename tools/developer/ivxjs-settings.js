const Immutable = require('immutable');

const uiModuleConfigurations = require('./ui-module-deps');
const dataModuleConfigurations = require('./data-module-deps');
const analyticModuleConfigurations = require('./analytics-module-deps');
const validationModuleConfigurations = require('./validation-module-deps');

const allUIModules = Object.keys(uiModuleConfigurations);
const allDataModules = Object.keys(dataModuleConfigurations);
const allAnalyticModules = Object.keys(analyticModuleConfigurations);
const allValidationModules = Object.keys(validationModuleConfigurations);

module.exports.generateSettings = (coreDest, moduleDest, watch) => {
    return generateFiles().map(fileConfig => {
        let newFileConfig = Immutable.Map(fileConfig);
        let {src} = newFileConfig.toJS();

        if (src.indexOf('angular') >= 0) {
            newFileConfig = newFileConfig.set('dest', coreDest);
        } else {
            newFileConfig = newFileConfig.set('dest', moduleDest ? moduleDest : coreDest);
        }
        newFileConfig = newFileConfig.set('watch', watch);

        return newFileConfig.toJS();
    })
}

module.exports.generateSelectedModules = (coreDest, moduleDest, modules, watch)=>{
     let allModuleSettings = getModuleSettings(modules);
     let {moduleNames = {}} = allModuleSettings;
     let {ui, data, validation, analytics} = moduleNames; 
     let uiModules = ui ? [ui] : ['basic'];
     let dataModules = data ? [data] : [];
     let validationModules = validation ? [validation] : [];
     let analyticsModules = analytics ? [analytics] : [];

     return generateFiles(uiModules, dataModules, validationModules, analyticsModules).map(fileConfig => {
        let newFileConfig = Immutable.Map(fileConfig);
        let {src} = newFileConfig.toJS();

        if (src.indexOf('angular') >= 0) {
            newFileConfig = newFileConfig.set('dest', coreDest);
        } else {
            newFileConfig = newFileConfig.set('dest', moduleDest ? moduleDest : coreDest);
        }
        newFileConfig = newFileConfig.set('watch', watch);

        return newFileConfig.toJS();
    })
}

module.exports.getModuleSettings = getModuleSettings;

function getModuleSettings(modules) {
    return modules.reduce((configurations, moduleName) => {
        let newCongurations = Immutable.Map(configurations);
        let moduleNames = newCongurations.get('moduleNames');

        if (uiModuleConfigurations[moduleName]) {
            moduleNames.ui = moduleName;

            newCongurations = newCongurations.set('ui', uiModuleConfigurations[moduleName]);
        }

        if (dataModuleConfigurations[moduleName]) {
            moduleNames.data = moduleName;
            
            newCongurations = newCongurations.set('data', dataModuleConfigurations[moduleName]);
        }

        if (analyticModuleConfigurations[moduleName]) {
            moduleNames.analytics = moduleName;
            

            newCongurations = newCongurations.set('analytics', analyticModuleConfigurations[moduleName]);
        }

        if (validationModuleConfigurations[moduleName]) {
            moduleNames.validation = moduleName;
            
            newCongurations = newCongurations.set('validation', validationModuleConfigurations[moduleName]);
        }

        newCongurations = newCongurations.set('moduleNames', moduleNames);

        return newCongurations.toJS();
    }, { 
        moduleNames : {}
    });
}


function generateFiles(ui, data, validation, analytics) {
    let generateUI = ui ? ui : allUIModules;
    let generateData = data ? data : allDataModules;
    let generateValidation = validation ? validation : allValidationModules;
    let generateAnalytics = analytics ? analytics : allAnalyticModules;

    return [].concat([{
        src: "src/angular/app.js",
        dest: "public/js",
        preprocessor: "browserify",
        options: {
            fileName: "angular.ivx.min.js",
            transformer: {
                name: "babelify",
                options: {
                    presets: ["es2015"]
                }
            },
            minified: true,
            sourceMaps: false
        }
    }, {
        src: "src/angular/app.js",
        dest: "public/js",
        preprocessor: "browserify",
        options: {
            fileName: "angular.ivx.js",
            transformer: {
                name: "babelify",
                options: {
                    presets: ["es2015"]
                }
            },
            minified: false,
            sourceMaps: true
        }
    }],
        uiModuleConfigs(generateUI),
        dataModuleConfigs(generateData),
        analyticModuleConfigs(generateAnalytics),
        validationModuleConfigs(generateValidation));
}

function uiModuleConfigs(uiModules) {

    return uiModules.reduce((configs, uiModule) => {
        let configArray = [];

        if (uiModule !== 'basic') {
            configArray = [generateUIModuleConfig(uiModule, false), generateUIModuleConfig(uiModule, true)]
        }

        return [].concat(configs, configArray);
    }, []);
}

function generateUIModuleConfig(uiModule, minified) {
    return {
        src: `src/modules/ui/${uiModule}/index.js`,
        dest: "public/js",
        preprocessor: "browserify",
        options: {
            fileName: minified ? `iVXjs.ui.${uiModule}.min.js` : `iVXjs.ui.${uiModule}.js`,
            transformer: {
                name: "babelify",
                options: {
                    presets: ["es2015"]
                }
            },
            minified,
            sourceMaps: !minified
        }
    }
}

function dataModuleConfigs(dataModules) {
    return dataModules.reduce((configs, dataModule) => {
        return [].concat(configs, [
            generateDataModuleConfig(dataModule, false),
            generateDataModuleConfig(dataModule, true)
        ]);
    }, []);
}

function generateDataModuleConfig(dataModule, minified) {
    return {
        src: `src/modules/data/${dataModule}/index.js`,
        dest: "public/js",
        preprocessor: "browserify",
        options: {
            fileName: minified ? `iVXjs.data.${dataModule}.min.js` : `iVXjs.data.${dataModule}.js`,
            transformer: {
                name: "babelify",
                options: {
                    presets: ["es2015"]
                }
            },
            minified,
            sourceMaps: !minified
        }
    }
}

function analyticModuleConfigs(analyticModules) {
    return analyticModules.reduce((configs, analyticModule) => {
        return [].concat(configs, [
            generateAnalyticModuleConfig(analyticModule, false),
            generateAnalyticModuleConfig(analyticModule, true)
        ]);
    }, []);
}

function generateAnalyticModuleConfig(analyticModule, minified) {
    return {
        src: `src/modules/analytics/${analyticModule}/index.js`,
        dest: "public/js",
        preprocessor: "browserify",
        options: {
            fileName: minified ? `iVXjs.analytics.${analyticModule}.min.js` : `iVXjs.analytics.${analyticModule}.js`,
            transformer: {
                name: "babelify",
                options: {
                    presets: ["es2015"]
                }
            },
            minified,
            sourceMaps: !minified
        }
    }
}

function validationModuleConfigs(validationModules) {
    return validationModules.reduce((configs, validationModule) => {
        return [].concat(configs, [
            generateValidationModuleConfig(validationModule, false),
            generateValidationModuleConfig(validationModule, true)
        ]);
    }, []);
}

function generateValidationModuleConfig(validationModule, minified) {
    return {
        src: `src/modules/validation/${validationModule}/index.js`,
        dest: "public/js",
        preprocessor: "browserify",
        options: {
            fileName: minified ? `iVXjs.validation.${validationModule}.min.js` : `iVXjs.validation.${validationModule}.js`,
            transformer: {
                name: "babelify",
                options: {
                    presets: ["es2015"]
                }
            },
            minified,
            sourceMaps: !minified
        }
    }
}