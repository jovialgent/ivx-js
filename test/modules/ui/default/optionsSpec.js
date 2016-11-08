import { Options  } from '../../../../src/modules/ui/default/options.js';

describe('Default Options', () => {
    describe('#html', () => {
        let optionsInputData;

        beforeEach(() => {
            optionsInputData = {
                input: {
                    "name": "test",
                    "id": "test",
                    "options": [{
                        value: 'option1',
                        display: "Option 1"
                    }, {
                            value: 'option2',
                            display: "Option 2"
                        }, {
                            value: 'option3',
                            display: "Option 3"
                        }]
                }
            }
        });


        it('should create a options input', () => {
            let optionsInput = new Options(
                optionsInputData
            );


            let optionsInputHTML = document.createElement(`div`);
            optionsInputHTML.innerHTML = optionsInput.html
            optionsInputHTML = optionsInputHTML.getElementsByTagName('SELECT');


            expect(optionsInputHTML[0].name).toEqual('test');

        })

        it('should create a number of options equal to the number options input', () => {
           
            let optionsInput = new Options(
                optionsInputData
            );


            let optionsInputHTML = document.createElement(`div`);
            optionsInputHTML.innerHTML = optionsInput.html
            optionsInputHTML = optionsInputHTML.getElementsByTagName('OPTION');


            expect(optionsInputHTML.length).toEqual(4);

        })
    })
})
