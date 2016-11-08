import { Textarea  } from '../../../../src/modules/ui/default/textarea.js';

describe('Default Textarea', () => {
    describe('#html', () => {

        it('should create a textarea input', () => {
			let textareaInput = new Textarea({
				input: {
					"name": "test",
					"id": "test"
				},
				settings: {},
				tags: {},
				errors: {}
			});


			let textareaInputHTML = document.createElement(`div`);
			textareaInputHTML.innerHTML = textareaInput.html
			textareaInputHTML = textareaInputHTML.getElementsByTagName('TEXTAREA');


			expect(textareaInputHTML).not.toBeUndefined();
            expect(textareaInputHTML[0].name).toEqual('test');

        })
    })
})
