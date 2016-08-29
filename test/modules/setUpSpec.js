import {Setup} from '../../library/modules/setup.js';
import {SimpleIterate} from '../../library/utilities/simple-iterate.js';

describe('Setup', () => {

    let thisSetup;

    describe('#runSetup', () => {
        let thisSetup, goodData, order, error;
        beforeEach(() => {
            goodData = window.__json__["test/mock-data/valid-input-states-data"];
            thisSetup = new Setup(goodData);
            order = [];

            spyOn(thisSetup, 'setupData').and.callFake(() => {
                order.push('setupData');
                return {
                    then: function (resolve) {

                        resolve();

                        return {
                            then: function (resolve, reject) {
                                if (error) reject();
                                resolve();
                            }
                        }
                    }
                }
            });
            spyOn(thisSetup, 'runValidation').and.callFake(() => {
                order.push('runValidation')
            });
            



        });

        it('should return a promise that will resolve once all setup is done', () => {
            let setUpPromise = thisSetup.runSetup();
            expect(setUpPromise).not.toBeUndefined();
            expect(setUpPromise instanceof Promise).toBeTruthy();

        });

        it('should run in order "setupData", "runValidation".', () => {
            let rightOrder = ["setupData", "runValidation"];
            thisSetup.runSetup();

            expect(order).toEqual(rightOrder);

        });
    });

    describe('#setupData', () => {
        let thisSetup, goodData;

        beforeEach(() => {
            goodData = window.__json__["test/mock-data/valid-input-states-data"];
            thisSetup = new Setup(goodData);

        });

        it('should return a promise.', () => {

            let setupDataPromise = thisSetup.setupData(goodData);

            expect(setupDataPromise).not.toBeUndefined();
            expect(setupDataPromise instanceof Promise).toBeTruthy();

        });
    })
    
});