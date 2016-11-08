import { NavigationState } from '../../../../src/modules/ui/default/state.navigation.js';

describe('Default Navigation State', () => {
    describe('#html', () => {
        it('should render a section, header, footer with player html in the center', () => {
            let navigationState = new NavigationState({
                    html: "Test"
                },
                `<a></a>`,
                {
                	html : "<div></div>"
                }, {
                    name: 'Test'
                }
            );

            let navigationStateHtml = document.createElement(`div`);
            navigationStateHtml.innerHTML = navigationState.html;
            let headerHtml = navigationStateHtml.getElementsByTagName('HEADER');
            let footerHtml = navigationStateHtml.getElementsByTagName('FOOTER');
            let anchor = navigationStateHtml.getElementsByTagName('A');

            expect(headerHtml).not.toBeUndefined();
            expect(footerHtml).not.toBeUndefined();
            expect(anchor).not.toBeUndefined();	

        })
    })
})
