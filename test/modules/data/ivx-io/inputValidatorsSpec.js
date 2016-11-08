import InputValidators from '../../../../src/modules/data/ivx-io/input-validators/index.js';
import {InputValidatorMocks} from "./mock-data.js";

describe('iVXioInputValidators', ()=>{
    let inputValidatorMock, inputValidator, validatedStates;

    beforeEach(()=>{
        inputValidatorMock = new InputValidatorMocks();
        let {mockData} = inputValidatorMock;
        let {story, json} = mockData;
        let {states} = json;

        inputValidator = new InputValidators(states, story);
        validatedStates = inputValidator.states;
        
    });

    describe("#TextShort", () =>{

        it("should add maxlength of 64 to a text input", () =>{
           let testInput = validatedStates[0].inputs[0];
           
           expect(testInput.attributes.maxlength).toEqual(64);
        });


        it("should add maxlength to equal minlength and maxlegnth to a text input attribute", () =>{
           let testInput = validatedStates[0].inputs[1];
           
           expect(testInput.attributes.minlength).toEqual(5);
           expect(testInput.attributes.maxlength).toEqual(10);           
        });

    });

    describe("#TextMedium", () =>{

        it("should add maxlength of 128 to a text input", () =>{
           let testInput = validatedStates[0].inputs[2];
           
           expect(testInput.attributes.maxlength).toEqual(128);
        });


        it("should add maxlength to equal minlength and maxlegnth to a text input attribute", () =>{
           let testInput = validatedStates[0].inputs[3];
           
           expect(testInput.attributes.minlength).toEqual(10);
           expect(testInput.attributes.maxlength).toEqual(45);           
        });

    });

    describe("#TextLarge", () =>{

        it("should add maxlength of 256 to a text input", () =>{
           let testInput = validatedStates[0].inputs[4];
           
           expect(testInput.attributes.maxlength).toEqual(256);
        });


        it("should add maxlength to equal minlength and maxlegnth to a text input attribute", () =>{
           let testInput = validatedStates[0].inputs[5];
           
           expect(testInput.attributes.minlength).toEqual(20);
           expect(testInput.attributes.maxlength).toEqual(90);           
        });

    });

    describe("#TextArea", () =>{

        it("should add maxlength of 1024 to a text input", () =>{
           let testInput = validatedStates[0].inputs[6];
           
           expect(testInput.attributes.maxlength).toEqual(1024);
        });


        it("should be text area", () =>{
           let testInput = validatedStates[0].inputs[6];
           
           expect(testInput.type).toEqual("textarea");      
        });

    });

    describe("#Number", () =>{

        it("should add min and max to a to be the story input.", () =>{
           let testInput = validatedStates[0].inputs[7];
           
           expect(testInput.attributes.max).toEqual(100);
           expect(testInput.attributes.min).toEqual(-100);
        });


        it("should be number.", () =>{
           let testInput = validatedStates[0].inputs[7];
           
           expect(testInput.type).toEqual("number");      
        });

    });

     describe("#Email", () =>{

        it("should be email.", () =>{
           let testInput = validatedStates[0].inputs[8];
           
           expect(testInput.type).toEqual("email");      
        });

    });

    describe("#Url", () =>{

        it("should be url.", () =>{
           let testInput = validatedStates[0].inputs[9];
           
           expect(testInput.type).toEqual("url");      
        });

    });

    describe("#Checkbox", () =>{

        it("should be checkbox.", () =>{
           let testInput = validatedStates[0].inputs[10];
           
           expect(testInput.type).toEqual("checkbox");      
        });

    });

    describe("#Options", () =>{
        let testInput;

        beforeEach(()=>{
            testInput = validatedStates[0].inputs[11];
        })

        it("should be options.", () =>{
           expect(testInput.type).toEqual("options");      
        });

        it("options should be the same as the options in the story.", () =>{
           expect(testInput.options).toEqual(inputValidator.storyInputs.optionstest.options);      
        });

    });
    
});
    