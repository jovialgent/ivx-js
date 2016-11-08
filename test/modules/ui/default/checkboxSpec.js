import { Checkbox } from '../../../../src/modules/ui/default/checkbox.js';

describe('Default Checkbox', () => {
    describe('#html', () => {

        it('should create a checkbox input', () => {
			let checkbox = new Checkbox({
				input: {
					name: 'test',
					id: 'test'
				},
				tags: '',
				settings: {},
				errors: {},
				
			});

			let checkboxHTMLContainer = document.createElement(`div`);
			checkboxHTMLContainer.innerHTML = checkbox.html;
			let checkboxHTML = checkboxHTMLContainer.getElementsByTagName('INPUT');
			let checkboxLableHTML = checkboxHTMLContainer.getElementsByTagName('LABEL');

			expect(checkboxHTML[0].name).toEqual('test');
			expect(checkboxHTML[0].type).toEqual('checkbox');
			expect(checkboxLableHTML[0]).not.toBeUndefined();
		});
	});
});