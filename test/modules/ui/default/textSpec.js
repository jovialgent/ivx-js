import { Text  } from '../../../../library/modules/ui/default/text.js';

describe('Default Text', () => {
    describe('#html', () => {

        it('should create a TYPE input', () => {
			let textInput = new Text({
				input: {
					"name": "test",
					"id": "test"
				},
				settings: {},
				tags: {},
				errors: {}
			});


			let textInputHTML = document.createElement(`div`);
			textInputHTML.innerHTML = textInput.html
			textInputHTML = textInputHTML.getElementsByTagName('INPUT');


			expect(textInputHTML[0].name).toEqual('test');
            expect(textInputHTML[0].type).toEqual('text');

        })
    })
})
