import { DatetimeLocal  } from '../../../../library/modules/ui/default/datetime-local.js';

describe('Default DatetimeLocalInput', () => {
    describe('#html', () => {

        it('should create a datetime-local input', () => {
			let datetimeLocalInput = new DatetimeLocal({
				input: {
					"name": "test",
					"id": "test"
				},
				settings: {},
				tags: {},
				errors: {}
			});


			let datetimeLocalInputHTML = document.createElement(`div`);
			datetimeLocalInputHTML.innerHTML = datetimeLocalInput.html
			datetimeLocalInputHTML = datetimeLocalInputHTML.getElementsByTagName('INPUT');


			expect(datetimeLocalInputHTML[0].name).toEqual('test');
            expect(datetimeLocalInputHTML[0].type).toEqual('datetime-local');

        })
    })
})
