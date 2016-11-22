import { Date as DateInput } from '../../../../src/modules/ui/default/date.js';

describe('Default DateInput', () => {
    describe('#html', () => {

        it('should create a dateInput input', () => {
			let dateInput = new DateInput({
				input :{
					"name" : "test",
					"id" : "test"
				},
				settings : {},
				tags : {},
				errors : {}
			});


			let dateInputHTML = document.createElement(`div`);
			dateInputHTML.innerHTML = dateInput.html
			dateInputHTML = dateInputHTML.getElementsByTagName('INPUT');

			expect(dateInputHTML[0].name).toEqual('test');
			// expect(dateInputHTML[0].type).toEqual('date');

        })
    })
})
