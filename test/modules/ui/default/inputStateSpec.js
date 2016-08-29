import { InputState } from '../../../../library/modules/ui/default/state.input.js';

describe('Default InputState', () => {
    describe('#html', () => {
        it('should render a section, header, footer with player html in the center', () => {
            let inputSetUp = new InputState({
                    html: "Test"
                },
                `<form class='player-section'></form>`,
                {
                	html : "<div></div>"
                }, {
                    name: 'Test'
                }
            );

            let inputStateHtml = document.createElement(`div`);
            inputStateHtml.innerHTML = inputSetUp.html;
            let headerHtml = inputStateHtml.getElementsByTagName('HEADER');
            let footerHtml = inputStateHtml.getElementsByTagName('FOOTER');
            let player = inputStateHtml.getElementsByTagName('FORM');

            expect(headerHtml).not.toBeUndefined();
            expect(footerHtml).not.toBeUndefined();
            expect(player).not.toBeUndefined();	

        })
    })
})
