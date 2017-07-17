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
            <section class="${sectionClasses}" id="${data.id}">
                <header class="${headerClasses}">${headerHTML}</header>
                ${playerSection}
                <footer class="${footerClasses}">${footerHTML}</footer>
            </section>`;
    }
}