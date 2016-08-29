import { Number as NumberInput } from '../../../../library/modules/ui/default/number.js';

describe('Default Number', () => {
    describe('#html', () => {

        it('should create a number input', () => {
			let numberInput = new NumberInput({
				input: {
					"name": "test",
					"id": "test"
				},
				settings: {},
				tags: {},
				errors: {}
			});


			let numberInputHTML = document.createElement(`div`);
			numberInputHTML.innerHTML = numberInput.html
			numberInputHTML = numberInputHTML.getElementsByTagName('INPUT');


			expect(numberInputHTML[0].name).toEqual('test');
            expect(numberInputHTML[0].type).toEqual('number');

        })
    })
})
