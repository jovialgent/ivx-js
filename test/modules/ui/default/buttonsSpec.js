import {Buttons} from '../../../../library/modules/ui/default/buttons.js';

describe('Default Buttons', () =>{
	let buttonsData;
	beforeEach(() =>{
		buttonsData = {
			buttons : [{
				label : "button 1"
			},{
				label : "button 2"
			},{
				label : "button 3"
			}]
		};
	});
	describe('#html', () =>{
		it('should create the number of buttons in the "buttons" array', () =>{
			
			let buttonsObj = new Buttons(buttonsData.buttons);
			let buttons = document.createElement(`div`);
			buttons.innerHTML = buttonsObj.html
			buttons = buttons.getElementsByTagName('BUTTON');

			expect(buttons.length).toEqual(3);
		});

		it('should add errors.', () =>{
			buttonsData.errors = {
				attributes : {},
				 errors : {}, 
				 messages : {}
			}
			
			let buttonsObj = new Buttons(buttonsData.buttons);
			let buttons = document.createElement(`div`);
			let errors = buttons.getElementsByClassName('error-messages');
			
			buttons.innerHTML = buttonsObj.html

			expect(errors).not.toBeUndefined();
		});

		it('should add classes to a button if classes is defined.', () =>{
			buttonsData.buttons[0].classes = "test-1";
			
			let buttonsObj = new Buttons(buttonsData.buttons, {});
			let buttons = document.createElement(`div`);
			
			buttons.innerHTML = buttonsObj.html
			buttons = buttons.getElementsByClassName('test-1');
			
			expect(buttons).not.toBeUndefined();
		});

	});


});