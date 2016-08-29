export class MockiVXioExperience {
    constructor(iVXjs) {
        if(iVXjs) this.animateElement = iVXjs.animateElement;
        this.Bus = iVXjs.Bus;
    }

    get data() {
        return {
            testKey : "",
            testDate : ""
        };
    }

    get story() {
        let mockStoryData = window.__json__["test/mock-data/mock-story-data"];
        mockStoryData.inputs.testDate = {
            display: "Date"
        }
        mockStoryData.inputs.testDateTime = {
            display: "Date"
        }
        return mockStoryData;
    }

    setData(key, value) {
        return new Promise((res, rej) => {});
    }

    recordEvent(customEvent) {
        return new Promise((res, rej) => {});
    }

    setConverted(label) {
        return new Promise((res, rej) => {});
        
    }

    setMilestone(milestone) {
        return new Promise((res, rej) => {});
        
    }


}