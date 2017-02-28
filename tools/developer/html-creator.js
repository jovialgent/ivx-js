let fs = require('fs');
let analytics = require('./analytics-module-deps');
let data = require('./data-module-deps');
let uiModuleDeps = require('./ui-module-deps');
let validation = require('./validation-module-deps');
let getModuleSettings = require('./ivxjs-settings').getModuleSettings;
let colors = require('colors');
const Immutable = require('immutable');

class HTMLCreator {
    constructor(src, dest, modules) {
        let {
            data = false,
            analytics = false,
            validation = false,
            ui = "basic"
        } = getModuleSettings(modules);

        this.data = data;
        this.analytics = analytics;
        this.validation = validation;
        this.ui = ui;

        this.src = src;
        this.dest = dest;
    }

    build() {
        let {src, dest} = this;
        let html = fs.readFileSync(src, "utf8");
        let downloadHTML = this.createHTML(html);

        console.log(`Creating the project's index.html file from ${src} to ${dest}`.blue)

        return new Promise((resolve, reject) => {
            fs.writeFile(`${dest}/index.html`, downloadHTML, (err) => {
                if (err) {
                    console.log(`Failed creating the project's index.html file from ${src} to ${dest} due to: ${err}`.red);
                    reject(err);
                    return;
                }

                console.log(`Created the project's index.html file from ${src} to ${dest}`.green);

                resolve();
            })
        });
    }

    createHTML(template) {
        let {ui, data, validation, analytics, src, dest} = this;
        let allInjectors = Immutable.List();
        let allDirectives = Immutable.List();
        let allConfigFunctions = Immutable.List();
        let html = template;

        if (ui) {

            let uiData = this.replaceUIDeps(html, ui === "basic" ? uiModuleDeps.basic : ui);
            let {injector, directive, configFunction, html: uiHTML} = uiData;

            allInjectors = allInjectors.push(injector);
            allDirectives = allDirectives.push(directive);
            allConfigFunctions = allConfigFunctions.push(configFunction);
            html = uiHTML;
        } else {
            html = html.replace('[UI-SCRIPT]', '')
            html = html.replace('[UI-CSS]', '');
        }

        if (analytics) {
            let analyticData = this.replaceAnalytics(html, "UA-XXXXX-XXX");
            let {injector, directive, configFunction, html: analyticHTML} = analyticData;

            allInjectors = allInjectors.push(injector);
            allDirectives = allDirectives.push(directive);
            allConfigFunctions = allConfigFunctions.push(configFunction);
            html = analyticHTML;
        } else {
            html = html.replace('[ANALYTIC-SCRIPT]', '');
        }

        if (data) {
            let dataModuleConfig = this.replaceData(html, data);
            let {injector, directive, configFunction, html: dataHTML} = dataModuleConfig;

            allInjectors = allInjectors.push(injector);
            allDirectives = allDirectives.push(directive);
            allConfigFunctions = allConfigFunctions.push(configFunction);
            html = dataHTML;

        } else {
            html = html.replace('[DATA-SCRIPT]', '');
        }

        if (validation) {
            let validationModuleConfig = this.replaceValidation(html, validation);
            let {injector, directive, configFunction, html: validationHTML} = validationModuleConfig;

            allInjectors = allInjectors.push(injector);
            allDirectives = allDirectives.push(directive);
            allConfigFunctions = allConfigFunctions.push(configFunction);
            html = validationHTML;
        }else {
            html = html.replace('[VALIDATION-SCRIPT]', '');
        }

        html = html.replace('INJECTORS', createInjectors(allInjectors.toJS()));
        html = html.replace('DIRECTIVES', createDirective(allDirectives.toJS()));
        html = html.replace('CONFIG-SETTINGS', createConfig(allConfigFunctions.toJS()));

        return html;

        function createInjectors(injectors) {
            return injectors.reduce((injectorString, injector, index) => {
                if (injector && injector.length && injector.length > 0) {
                    injectorString = `${injectorString},"${injector}"`;
                }

                return injectorString;
            }, `"iVXjs"`);
        }

        function createDirective(directives) {
            return directives.reduce((directiveString, directive, index) => {
                if (directive && directive.length && directive.length > 0) {
                    directiveString = `${directiveString},${directive}`;
                }

                return directiveString;
            }, `iVXjs`);
        }

        function createConfig(configFunctions) {
            return configFunctions.reduce((configSettings, configFunction, index) => {
                if (configFunction && configFunction.length && configFunction.length > 0) {
                    configSettings = `${configSettings}
                    ${configFunction},`
                }

                return configSettings;
            }, ``) + `
            config : 'data/project.json'
            `;
        }
    }

    replaceUIDeps(html, currentFramework, theme) {
        let {ivxjs, js, css, injector, directive, configFunction} = currentFramework;
        let uiCSS = this.createCSSLinkTags([css, theme]);
        let uiJS = this.createScript([js, ivxjs]);

        let newHTML = html.replace('[UI-SCRIPT]', uiJS).replace('[UI-CSS]', uiCSS)

        return {
            html: newHTML,
            injector,
            directive,
            configFunction
        }
    }

    replaceData(html, dataConfig) {
        let {ivxjs, js, injector, directive, configFunction} = dataConfig;
        let dataJS = this.createScript([js, ivxjs]);
        let newHTML = html.replace('[DATA-SCRIPT]', dataJS);

        return {
            html: newHTML,
            injector,
            directive,
            configFunction
        }
    }

    replaceValidation(html, validationConfig) {
        let {ivxjs, js, injector, directive, configFunction} = validationConfig;
        let validationJS = this.createScript([js, ivxjs]);
        let newHTML = html.replace('[VALIDATION-SCRIPT]', validationJS);

        return {
            html: newHTML,
            injector,
            directive,
            configFunction
        }
    }

    replaceAnalytics(html, trackingId) {
        let {analytics} = this;
        let {js, configFunction, directive, injector, ivxjs} = analytics;
        let jsScripts = `
        ${js}
        ${this.createScript([ivxjs])}`;
        let hasTrackingId = trackingId && trackingId.length && trackingId.length > 0;

        let newHTML = html.replace('[ANALYTIC-SCRIPT]', hasTrackingId ? jsScripts : '');



        return {
            injector: hasTrackingId ? injector : '',
            js,
            directive: hasTrackingId ? directive : '',
            configFunction: hasTrackingId ? configFunction : '',
            html: newHTML
        }
    }

    createCSSLinkTags(hrefs) {
        return hrefs.reduce((linkElements, link) => {
            if (link && link.length && link.length > 0) {
                linkElements = `${linkElements}
                <link href="${link}" rel="stylesheet">`;
            }

            return linkElements;
        }, '');
    }

    createScript(srcs) {
        return srcs.reduce((scriptTags, src) => {
            if (src && src.length && src.length > 0) {
                scriptTags = `${scriptTags}
                    <script src="${src}"></script>
                `;
            }

            return scriptTags;
        }, '')
    }
}

module.exports = HTMLCreator; 