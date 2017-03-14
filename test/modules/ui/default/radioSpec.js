import { Radio } from '../../../../src/modules/ui/default/radio.js';

describe('Default Radio', () => {
    describe('#html', () => {

        xit('should create a radio input', () => {
            let radioInput = new Radio({
                input: {
                    id : 'test',
                    name: 'test'
                },
                radios: [
                    {
                        "value": "Value 1",
                        "label": "Value 1"
                    }, {
                        "value": "Value 2",
                        "label": "Value 2"
                    }, {
                        "value": "Value 3",
                        "label": "Value 3"
                    }],
                errors: {},
                settings: {},
            });


            let radioInputHTML = document.createElement(`div`);
            radioInputHTML.innerHTML = radioInput.html
            radioInputHTML = radioInputHTML.getElementsByTagName('INPUT');

            expect(radioInputHTML).not.toBeUndefined();
            expect(radioInputHTML.length).toEqual(3);
            expect(radioInputHTML[0].type).toEqual('radio');



        })
    })
})
