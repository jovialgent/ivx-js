const { argv } = require('yargs');
const {local, setup} = argv;
const BaseConfig = require('./webpack.base.config');
const subfolder =  local || setup ? '/modules' : '';
const modules = {
    analytics: {
        entry: {
            google: "./src/modules/analytics/google/index.js"
        }
    },
    data: {
        entry: {
            firebase: "./src/modules/data/firebase/index.js",
            "ivx-io": "./src/modules/data/ivx-io/index.js"
        }
    },
    ui: {
        entry: {
            bootstrap: "./src/modules/ui/bootstrap/index.js",
            materialize: "./src/modules/ui/materialize/index.js",
            "semantic-ui": "./src/modules/ui/semantic-ui/index.js"
        }
    },
    validation: {
        entry: {
            schema: "./src/modules/validation/schema/index.js"
        }
    }
};
const configs = Object
    .keys(modules)
    .reduce((moduleConfigs, moduleType) => {
        const configOutput = {
            filename: `iVXjs.${moduleType}.[name].js`
        }
        const minOutput = {
            filename: `iVXjs.${moduleType}.[name].min.js`
        };
        const moduleConfig = Object.assign({},
            modules[moduleType],
            {
                output: configOutput
            });
        const minModuleConfig = Object.assign({},
            modules[moduleType],
            {
                output: minOutput
            });
        return [].concat(
            moduleConfigs,
            new BaseConfig(moduleConfig, false, subfolder),
            new BaseConfig(minModuleConfig, true, subfolder)
        )
    }, []);

module.exports = configs;