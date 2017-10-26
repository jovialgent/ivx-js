const {argv} = require('yargs');
const {local} = argv;
const webpack = require('webpack');
const colors = require('colors');

module.exports.create = (appConfig) => {
    return new Promise((resolve, reject) => {
        console.log(`Compiling Files`.blue);

        // if(local){
        //     resolve(webpack(appConfig));
        //     return
        // }

        let compiler = webpack(appConfig, (err) => {
            if (err) {
                console.log(`Error in Compiling Files`.error);
                console.error(err);
                reject(err);
                return;
            }
        
            console.log(`Finished Compiling Files`.green);
            resolve();
        });   
    });
}

