import { iVXioActions } from '../../../../library/modules/data/ivx-io/actions.js';
import { MockiVXioExperience } from './mock-experience.js';
import { FakeBus } from "../../../core/fake-bus.js";
import { iVXjs } from '../../../../library/core/app.js';
import iVXioErrors from '../../../../library/constants/iVXio.errors.js';
import Errors  from '../../../../library/constants/errors.js';

let iVXioErrorNames = new iVXioErrors();
let errorNames = new Errors();

describe('iVXioActions', () => {

    function attachExperience(iVXjs) {

    }

    describe('#formatDateForPlatform', () => {
        let theseActions, fakeBus, myiVXjs, mockDate;

        beforeEach(() => {
            myiVXjs = new iVXjs();
            fakeBus = new FakeBus(myiVXjs);
            theseActions = new iVXioActions(new MockiVXioExperience(myiVXjs, fakeBus));

            mockDate = new Date('01/01/2016');
        });

        it('should return the string "2016-01-01" if display is Date and value is 01/01/2016', () => {
            let dateString = theseActions.formatDateForPlatform('testDate', mockDate);
            expect(dateString).toEqual("2016-01-01");
        })

    });

    describe('#recordEvent', () => {
        let theseActions, fakeBus, myiVXjs, eventObj;

        beforeEach(() => {
            myiVXjs = new iVXjs();
            fakeBus = new FakeBus(myiVXjs);
            theseActions = new iVXioActions(new MockiVXioExperience(myiVXjs, fakeBus));
            eventObj = {
                customEvent: 'testEvent'
            };

            spyOn(theseActions.experience, 'recordEvent').and.callThrough();
        });

        it("should return undefined if there is no event arguments are provided", () => {
            expect(theseActions.recordEvent()).not.toBeTruthy();
        });

        it("should return a Promise if the event object is provided.", () => {
            let recordEventPromise = theseActions.recordEvent(eventObj);
            expect(recordEventPromise).not.toBeUndefined();

        });

        it("should call the experience host's recordEvent with event object's customEvent value", () => {
            let recordEventPromise = theseActions.recordEvent(eventObj);
            expect(theseActions.experience.recordEvent).toHaveBeenCalledWith(eventObj.customEvent);
        });
    });


    describe('#setConverted', () => {
        let theseActions, fakeBus, myiVXjs, eventObj;

        beforeEach(() => {
            myiVXjs = new iVXjs();
            fakeBus = new FakeBus(myiVXjs);
            theseActions = new iVXioActions(new MockiVXioExperience(myiVXjs));
            eventObj = {
                label: 'newLabel'
            };

            spyOn(theseActions.experience, 'setConverted').and.callThrough();
        });

        it("should return undefined if there is no event arguments are provided", () => {
            expect(theseActions.setConverted()).not.toBeTruthy();
        });

        it("should return a Promise if the event object is provided.", () => {
            let setConvertedPromise = theseActions.setConverted(eventObj);
            expect(setConvertedPromise).not.toBeUndefined();

        });

        it("should call the experience host's setConverted with event object's label.", () => {
            theseActions.setConverted(eventObj);
            expect(theseActions.experience.setConverted).toHaveBeenCalledWith(eventObj.label);
        });
    });

    describe('#setData', () => {
        let theseActions, fakeBus, myiVXjs, eventObj, dateObj;

        beforeEach(() => {
            myiVXjs = new iVXjs();
            fakeBus = new FakeBus(myiVXjs);
            theseActions = new iVXioActions(new MockiVXioExperience(myiVXjs, fakeBus));

            eventObj = {
                key: 'testKey',
                value: 3
            };

            dateObj = {
                key: 'testDate',
                value: new Date('01/01/2016')
            }

            spyOn(theseActions.experience, 'setData').and.callThrough();
        });

        it("should return undefined if there is no event arguments are provided", () => {
            expect(theseActions.setData()).not.toBeTruthy();
        });

        it("should return a Promise if the event object is provided.", () => {
            let setDataPromise = theseActions.setData(eventObj);
            expect(setDataPromise).not.toBeUndefined();
        });

        it("should call the experience host's setData with event object's key and value.", () => {
            theseActions.setData(eventObj);
            expect(theseActions.experience.setData).toHaveBeenCalledWith(eventObj.key, eventObj.value);
        });

        it("should call the experience host's setData with a valid date string.", () => {
            theseActions.setData(dateObj);
            expect(theseActions.experience.setData).toHaveBeenCalledWith(dateObj.key, theseActions.formatDateForPlatform(dateObj.key, dateObj.value));
        });

        it("should raise an error if it can't find an input", () =>{
            let wrongData = {"non-value" : 123} 
            theseActions.setData(wrongData);

            fakeBus.emit(iVXioErrorNames.EVENT_NOT_FIRED, wrongData,  {message:"iVXjs Error Message: Input not found"});
            fakeBus.emit(errorNames.IVX_IO, {message:"iVXjs Error Message: Input not found"});
            
        })
    });

    describe('#setMilestone', () => {
        let theseActions, fakeBus, myiVXjs, eventObj;

        beforeEach(() => {
            myiVXjs = new iVXjs();
            fakeBus = new FakeBus(myiVXjs);
            theseActions = new iVXioActions(new MockiVXioExperience(myiVXjs, fakeBus));

            eventObj = {
                milestone: 'newLabel'
            };

            spyOn(theseActions.experience, 'setMilestone').and.callThrough();
        });

        it("should return undefined if there is no event arguments are provided", () => {
            expect(theseActions.setMilestone()).not.toBeTruthy();
        });

        it("should return a Promise if the event object is provided.", () => {
            let setMilestonePromise = theseActions.setMilestone(eventObj);
            expect(setMilestonePromise).not.toBeUndefined();

        });

        it("should call the experience host's setMilestone with event object's miletone.", () => {
            theseActions.setMilestone(eventObj);
            expect(theseActions.experience.setMilestone).toHaveBeenCalledWith(eventObj.milestone);
        });
    });



});