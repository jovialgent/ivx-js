import { Url  } from '../../../../src/modules/ui/default/url.js';

describe('Default Url', () => {
    describe('#html', () => {

        it('should create a url input', () => {
			let urlInput = new Url({
				input: {
					"name": "test",
					"id": "test"
				},
				settings: {},
				tags: {},
				errors: {}
			});


			let urlInputHTML = document.createElement(`div`);
			urlInputHTML.innerHTML = urlInput.html
			urlInputHTML = urlInputHTML.getElementsByTagName('INPUT');


			expect(urlInputHTML[0].name).toEqual('test');
            expect(urlInputHTML[0].type).toEqual('url');

        })
    })
})
