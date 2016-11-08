import { VideoState } from '../../../../src/modules/ui/default/state.video.js';

describe('Default VideoState', () => {
    describe('#html', () => {
        it('should render a section, header, footer with player html in the center', () => {
            let videoSetUp = new VideoState({
                    html: "Test"
                },
                `<video class='player-section'></video>`,
                {
                	html : "<div></div>"
                }, {
                    name: 'Test'
                }
            );

            let videoStateHtml = document.createElement(`div`);
            videoStateHtml.innerHTML = videoSetUp.html;
            let headerHtml = videoStateHtml.getElementsByTagName('HEADER');
            let footerHtml = videoStateHtml.getElementsByTagName('FOOTER');
            let player = videoStateHtml.getElementsByTagName('VIDEO');

            expect(headerHtml).not.toBeUndefined();
            expect(footerHtml).not.toBeUndefined();
            expect(player).not.toBeUndefined();	

        })
    })
})
