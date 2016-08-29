// Karma configuration
// Generated on Tue Mar 01 2016 12:10:38 GMT-0700 (MST)

var istanbul = require('browserify-istanbul');
var isparta = require('isparta');
module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'browserify', 'fixture'],

        plugins: [
            'karma-jasmine',
            'karma-babel-preprocessor',
            'karma-browserify',
            'karma-coverage',
            'karma-mocha-reporter',
            'karma-chrome-launcher',
            'karma-fixture',
            'karma-json-fixtures-preprocessor',
            'karma-html-reporter'

        ],

        customLaunchers: {
            Chrome_without_security: {
                base: 'Chrome',
                flags: ['--disable-web-security']
            }
        },


        // list of files / patterns to load in the browser
        files: [
            'node_modules/angular/angular.min.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'test/**/*Spec.js',
            'library/core/**/*.js',
            'library/angular/app.js',
            {
                pattern: 'test/mock-data/**/*.json',
                served: true
            }
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {

            "library/core/**/*.js": ['browserify'],
            "library/angular/app.js": ['browserify'],
            
            
            "test/**/*Spec.js": ['browserify'],
            "test/**/*.json": ['json_fixtures']
        },

        jsonFixturesPreprocessor: {
            variableName: '__json__'
        },

        babelPreprocessor: {
            options: {
                presets: ['es2015'],
                sourceMap: 'inline'
            },
            filename: function (file) {
                return file.originalPath;
            },
            sourceFileName: function (file) {
                return file.originalPath;
            }
        },

        browserify: {
            debug: true,
            transform: [['babelify', { presets: ['es2015'] }], istanbul({
                ignore: ['node_modules/**', 'test/**'],
                instrumenterConfig: { embedSource: true },
                report: {
                    dir: "docs/tests/coverage"
                }

            })]
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha', 'coverage', 'html'],

        // the default configuration 
        htmlReporter: {
            outputDir: 'docs/tests', // where to put the reports  
            templatePath: null, // set if you moved jasmine_template.html 
            focusOnFailures: true, // reports show failures on start 
            namedFiles: false, // name files instead of creating sub-directories 
            pageTitle: null, // page title for reports; browser info by default 
            urlFriendlyName: false, // simply replaces spaces with _ for files/dirs 
            reportName: 'karma-tests', // report summary filename; browser info by default 


            // experimental 
            preserveDescribeNesting: false, // folded suites stay folded  
            foldAll: false, // reports start folded (only with preserveDescribeNesting) 
        },


        // web server port
        port: 9876,

        coverageReporter: {
            type: "html",
            dir: "docs/tests/coverage/"
        },


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome', 'Chrome_without_security'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    })
}
