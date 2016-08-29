import { Anchor } from '../../../../library/modules/ui/default/anchor.js';

describe('Default Anchor', () => {
    describe('#html', () => {
    	let anchorData, anchor, anchorHTMLContainer, anchorTag;

    	beforeEach(() =>{
    		anchorData = {
    			"href" : "http://www.google.com",
				"attributes" : {
					"target" : "_blank"
				},
				"id" : "new-anchor",
				"classes" : "test"
    		}

    		anchor = new Anchor(anchorData);

			anchorHTMLContainer = document.createElement(`div`);
			
			anchorHTMLContainer.innerHTML = anchor.html;

			anchorTag = anchorHTMLContainer.getElementsByTagName('A')[0];

    	})

        it('should create a anchor tag', () => {	
			expect(anchorTag).not.toBeUndefined();
		});

		it('should add a target equal to the value in attributes', () =>{
			expect(anchorTag.getAttribute('target')).toEqual('_blank');
		})

		it('should add classes defined in the anchor data', () =>{
			expect(anchorTag.className.indexOf('test') >= 0).toBeTruthy();
		});

		it('should have a link equal to the href', ()=>{
			expect(anchorTag.getAttribute('href')).toEqual(anchorData.href);
		})

		it('should have an id equal to the id defined in the init', ()=>{
			expect(anchorTag.getAttribute('id')).toEqual(anchorData.id);
		})

	});
});