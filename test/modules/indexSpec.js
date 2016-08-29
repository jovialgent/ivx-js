import {Modules} from '../../library/modules/index.js';


describe("Modules", () => {

    it('should exist', () => {
        expect(new Modules()).not.toBeNull();
    });

    describe('#modules', () => {
        let defaultModuleObject, modules;

        beforeEach(() => {
            defaultModuleObject = window.__json__["test/mock-data/default-module-object"];


        });

        it('should produce a defaultModuleObject if settings is empty', () => {
            modules = new Modules();
            let testObject = modules.modules;

            expect(testObject).toEqual(defaultModuleObject);

        });

    })



    describe('#ui', () => {
        let defaultModuleObject, modules;

        beforeEach(() => {
            defaultModuleObject = window.__json__["test/mock-data/default-module-object"];
        });

        it('should replace the ui default settings with settings defined in its constructor.', () => {
    
            modules = new Modules({
                
                    ui: "test"
                
            });

            expect(modules.modules.ui).toEqual("test");

        })


    });

    describe('#validation', () => {
        let defaultModuleObject, modules;

        beforeEach(() => {
            defaultModuleObject = window.__json__["test/mock-data/default-module-object"];
        });

        it('should replace the validation default settings with settings defined in its constructor.', () => {
            
            modules = new Modules({
                validation: "test"    
            });

            expect(modules.modules.validation).toEqual("test");

        })

    });

    describe('#data', () => {
        let defaultModuleObject, modules;

        beforeEach(() => {
            defaultModuleObject = window.__json__["test/mock-data/default-module-object"];
        });

        it('should replace the data default settings with settings defined in its constructor.', () => {
            let testDataModule = {
                "type": "test",

            }

            modules = new Modules({
                
                    data: testDataModule
                
            });

            expect(modules.modules.data).toEqual(testDataModule);

        })

    })





});