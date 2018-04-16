import {Actions} from '../../../../src/modules/data/ivx-js/actions.js';
import {iVXjs} from '../../../../src/core/app.js';
import {FakeBus} from '../../../core/fake-bus.js';

describe('iVXjsActions', () => {


    describe('#setData', () => {
        let actions;
        beforeEach(() => {
            actions = new Actions();
        });

        it('should set the data to the key and value in event args.', () => {
            actions.setData({
                key: "test",
                value: 123
            });

            expect(actions.data.test).toEqual(123);
        })

    });

    describe('#goToState', () => {
        let actions, fakeBus, myiVXjs;
        beforeEach(() => {
            myiVXjs = new iVXjs();
            fakeBus = new FakeBus(myiVXjs);
            actions = new Actions();
            
        });

        xit('should emit a goToState event with the state', () => {
            actions.goToState({
                state: "test"
            });
            
            fakeBus.emit('goToState', {
                state : 'test'
            });
        });


    });

    describe('#setElementClasses', () => {
        let actions, element, eventObj;

        beforeEach(() => {
            actions = new Actions();
        })

        it('should add class name if animation class.', () => {
            const element = document.createElement("div");

            element.className = "hide";

            actions.setElementClasses(element, {
                animationClasses: 'test'
            });

            expect(element.className.indexOf('test') >= 0).toEqual(true);
        });

        it('should replace animationClass on the element with the new animation class.', () => {
            const element = document.createElement("div");

            element.className = "old-animation";
            element.animationClass = "old-animation";

            actions.setElementClasses(element, {
                animationClasses : 'new-animation'
            });

            
            expect(element.className).toEqual('new-animation');
        });
    });

    describe('#animateElement', () => {
        let actions, element, eventObj;

        beforeEach(() => {
            actions = new Actions();
        });

        it('should return a promise if element exists.', () => {
            let animationPromise = actions.animateElement({
                element : "body",
                animationClass : "test"
            });
            expect(animationPromise).not.toBeUndefined();
            expect(animationPromise instanceof Promise).toBeTruthy()
        });
        
        it('should return undefined if element is not found.', () => {
            let animationPromise = actions.animateElement({
                element : "#asdasdasdasd",
                animationClass : "test"
            });
            expect(animationPromise).toBeUndefined();
           
        });
    })
});