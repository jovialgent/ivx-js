import { Form  } from '../../../../library/modules/ui/default/form.js';
import { Style  } from '../../../../library/modules/ui/default/style.js';


describe('Default Form', () => {
    describe('#html', () => {

        it('should create a form input', () => {
        	let formInput = new Form(
        		[{
                    html : `<div class="ivxjs-grid-1-1"><input></div>`,
                    id : "test",
                    name : "test"
                }], 
                'test', 
                '', 
                ''
        	);


			let formInputHTML = document.createElement(`div`);
			formInputHTML.innerHTML = formInput.html
			formInputHTML = formInputHTML.getElementsByTagName('FORM');


			expect(formInputHTML[0].name).toEqual('test');
            
        })

        it('should create a submit button a submit label is defined', () => {
            let formInput = new Form(
                [{
                    html : `<div class="ivxjs-grid-1-1"><input></div>`,
                    id : "test",
                    name : "test"
                }], 
                'test', 
                'Submit', 
                ''
            );


            let formInputHTML = document.createElement(`div`);
            formInputHTML.innerHTML = formInput.html
            formInputHTML = formInputHTML.getElementsByTagName('BUTTON');


            expect(formInputHTML[0].type).toEqual('submit');
            
        });
        
         it('should hide a submit button is hideSubmit is true', () => {
            let formInput = new Form(
                [{
                    html : `<div class="ivxjs-grid-1-1"><input></div>`,
                    id : "test",
                    name : "test"
                }], 
                'test', 
                'Submit', 
                {
                    hideSubmit : true
                }
            );


            let formInputHTML = document.createElement(`div`);
            formInputHTML.innerHTML = formInput.html
            formInputHTML = formInputHTML.getElementsByTagName('BUTTON');


            expect(formInputHTML[0]).not.toBeTruthy();
            
        })
    })
})
