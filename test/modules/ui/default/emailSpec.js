import { Email  } from '../../../../library/modules/ui/default/email.js';

describe('Default Email', () => {
    describe('#html', () => {

        it('should create a email input', () => {
            let emailInput = new Email({
				input :{
					"name" : "test",
					"id" : "test"
				},
				settings : {},
				tags : {},
				errors : {}
			});


            let emailInputHTML = document.createElement(`div`);
            emailInputHTML.innerHTML = emailInput.html
            emailInputHTML = emailInputHTML.getElementsByTagName('INPUT');


            expect(emailInputHTML[0].name).toEqual('test');
            expect(emailInputHTML[0].type).toEqual('email');

        })
    })
})
