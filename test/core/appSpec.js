import {iVXjs} from '../../library/core/app.js';
import iVXjsConfigEvents from '../../library/constants/iVXjs.config.events.js';
import {FakeBus} from './fake-bus.js';

let iVXjsConfigEventNames = new iVXjsConfigEvents();

describe('iVXjs', () => {

    it('should exist', () => {
        expect(new iVXjs()).not.toBeNull();
    });
    
    it('should attach a Bus to the iVXjs Object', () =>{
        expect(new iVXjs().Bus).not.toBeUndefined();
    })

    describe('#setUpiVXjs', () => {
        let myiVXjs, myFakeBus, mockValidExperience, rules;

        beforeEach(() => {
            myiVXjs = new iVXjs();
            myFakeBus = new  FakeBus(myiVXjs);
            rules = function rules() {

            };

            mockValidExperience = {
                modules: Math.random(),
                experience: {},
                config: Math.random(),
                rules: rules,
                actions : Math.random()
            };
        });
        
        it('should set iVXjs\'s properies equal the mock experience ', () =>{
            myiVXjs.setUpiVXjs(mockValidExperience);
            // expect(myiVXjs.modules).toEqual(mockValidExperience.modules);
            expect(myiVXjs.actions).toEqual(mockValidExperience.actions);
            expect(myiVXjs.experience).toEqual(mockValidExperience.experience);
            expect(myiVXjs.config).toEqual(mockValidExperience.config);
            expect(myiVXjs.rules).toEqual(rules);           
        });
        
        it("should not set iVXjs's action property if none provided", () =>{
            delete mockValidExperience.actions;
            myiVXjs.setUpiVXjs(mockValidExperience);
            expect(myiVXjs.actions).toBeUndefined();         
        })

        it('should exist', () => {
            expect(myiVXjs.setUpiVXjs).not.toBeNull();
        });

        it('should emit "validated"', () => {
            myiVXjs.setUpiVXjs(mockValidExperience);
            myFakeBus.emit(iVXjsConfigEventNames.VALIDATED, myiVXjs);
        })
    });

    describe('#init', () => {
        let myiVXjs, myFakeBus, fakeSetUp, mockValidData;

        beforeEach(() => {
            myiVXjs = new iVXjs();
            myFakeBus = new  FakeBus(myiVXjs);
            mockValidData = window.__json__["test/mock-data/valid-input-states-data"];
            spyOn(myiVXjs, 'setUpiVXjs').and.callFake( () =>{
                
            });
        });

        it('should exist', () => {
            expect(myiVXjs.init).not.toBeNull();
        });

        it('should return a promise', () => {
            expect(myiVXjs.init({})).not.toBeNull();   
        }); 
    });
})