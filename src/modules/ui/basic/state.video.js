export class VideoState {
    constructor(playerSection, data) {
        this.playerSection = playerSection;
        this.data = data;

    }

    get iPhoneInlineClasses() {
        let {isIphone = false} = this.data;

        return isIphone ? 'iphone-inline' : '';
    }

    get html() {
        let {playerSection = '', data = { name: '' }} = this;
        let {header: headerSettings = {}, footer: footerSettings = {}, section: sectionSettings = {}} = data;
        let {classes: headerClasses = '', html: headerHTML = ``} = headerSettings;
        let {classes: sectionClasses = '' } = sectionSettings;
        let {classes: footerClasses = '', html: footerHTML = ''} = footerSettings;

        return `
            <section class="${sectionClasses} ivx-state-section ivx-state-video-section" id="${data.id}">
                <header class="${headerClasses} ivx-state-header ivx-state-video-header">${headerHTML}</header>
                ${playerSection}
                <footer class="${footerClasses} ivx-state-footer ivx-state-video-footer">${footerHTML}</footer>
            </section>`;
    }
}