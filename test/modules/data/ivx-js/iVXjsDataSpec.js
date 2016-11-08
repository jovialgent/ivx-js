import {iVXjsData} from '../../../../src/modules/data/ivx-js/index.js';
import {Actions} from '../../../../src/modules/data/ivx-js/actions.js';
import {Rules} from '../../../../src/modules/data/ivx-js/rules.js';

describe('iVXjsData', () => {

    describe('#setUpExperience', () => {
        let thisData, settings, promises, defaultActions, defaultRules;

        beforeEach(() => {
            defaultActions = new Actions();
            defaultRules = new Rules();
        });

        it('should add experience settings', () => {
            settings = {
                moduleSettings: {},
                iVXjsSettings: {
                    experience: {
                        testA: 5
                    }
                }
            };
            defaultActions.testA = 5;
            let testEnhance = {
                rules: defaultRules,
                experience: defaultActions,
                config: {},
                modules: {}
            }




            promises = {
                resolve: (enhance) => {
                    expect(enhance.experience).toEqual(defaultActions);

                }
            }

            thisData = new iVXjsData(settings.moduleSettings, settings.iVXjsSettings);

            thisData.setUpExperience({}, promises.resolve);

        });

        xit('should add module data into  modules when resolved', () => {
            settings = {
                moduleSettings: {
                    modules : { 
                        test: 123
                    }
                },
                iVXjsSettings: {
                   modules : {
                       test: 123
                   },
                    experience: {
                        testA: 5
                    }
                }
            };
            defaultActions.testA = 5;
            let testEnhance = {
                rules: defaultRules,
                experience: defaultActions,
                config: {},
                
            }

            promises = {
                resolve: (enhance) => {
                    expect(enhance.modules.test).toEqual(123);
                }
            }

            thisData = new iVXjsData(settings.moduleSettings, settings.iVXjsSettings);

            thisData.setUpExperience({}, promises.resolve);

        });

    });

    describe('#enhance', () => {
        let thisData, settings;

        beforeEach(() => {


        });

        it('should return a promise.', () => {
            settings = {
                moduleSettings: {},
                iVXjsSettings: {}
            };

            thisData = new iVXjsData(settings.moduleSettings, settings.iVXjsSettings);

            spyOn(thisData, 'getConfigJSON').and.callFake(() => {
                return {
                    then: (reject, resolve) => {
                        resolve();
                    }
                }
            });

            spyOn(thisData, 'setUpExperience').and.callFake((config, enhancePromise) => {

            });
            let enhancePromise = thisData.enhance();
            expect(enhancePromise).not.toBeUndefined();
            expect(enhancePromise instanceof Promise).toBeTruthy()
        });

        it('should call setUpExperience if config is not a string.', () => {
            settings = {
                moduleSettings: {},
                iVXjsSettings: {
                    config: {
                        test: '111'
                    }
                }
            };

            thisData = new iVXjsData(settings.moduleSettings, settings.iVXjsSettings);

            spyOn(thisData, 'setUpExperience').and.callFake((config, enhancePromise) => {

            });
            let enhancePromise = thisData.enhance();

            expect(thisData.setUpExperience).toHaveBeenCalled();

        });

        it('should call getConfigJSON if config is a string.', () => {
            settings = {
                moduleSettings: {},
                iVXjsSettings: {
                    config: "test"
                }
            };

            thisData = new iVXjsData(settings.moduleSettings, settings.iVXjsSettings);

            spyOn(thisData, 'getConfigJSON').and.callFake((config, enhancePromise) => {
                return {
                    then: (reject, resolve) => {
                        resolve();
                    }
                }
            });
            let enhancePromise = thisData.enhance();

            expect(thisData.getConfigJSON).toHaveBeenCalled();

        });
    })

    describe('#isValidJSONRequest', () => {
        let thisData, settings, promise, xhr;

        beforeEach(() => {
            settings = {
                moduleSettings: {},
                iVXjsSettings: {}
            };

            promise = {
                resolve: () => { },
                reject: () => { }
            };


            spyOn(promise, 'resolve').and.callFake(() => {

            })

            spyOn(promise, 'reject').and.callFake(() => {

            })



            thisData = new iVXjsData(settings.moduleSettings, settings.iVXjsSettings);
        });




        it('should call this promises resolve if XHR\'s readyState is 4 and XHR\'s status is 200.', () => {
            thisData.isValidJSONRequest(promise.resolve, promise.reject, {
                readyState: 4,
                status: 200,
                responseText: "{}"
            });

            expect(promise.resolve).toHaveBeenCalled();
        });

        it('should call this promises reject if XHR\'s readyState is 4 and XHR\'s status is not 200.', () => {
            thisData.isValidJSONRequest(promise.resolve, promise.reject, {
                readyState: 4,
                status: 404,
                responseText: "{}"
            });

            expect(promise.reject).toHaveBeenCalled();
        });


    })

})