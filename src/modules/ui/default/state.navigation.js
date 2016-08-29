import { AttributeTags } from '../utilities/attributes.js';

export class NavigationState {
    constructor(data, linkSection) {
        this.data = data;
        this.linkSection = linkSection
    }

    get defaultHeaderClasses() {
        return '';
    }

    get defaultFooterClasses() {
        return '';
    }

    get defaultSectionClasses() {
        return '';
    }

    get defaultLinkContainerClasses() {
        return '';
    }

    get html() {
        let {data, linkSection, defaultFooterClasses, defaultHeaderClasses, defaultSectionClasses, defaultLinkContainerClasses} = this;
        let {header = {}, footer = {}, section = {}, linkContainer = {}} = data;
        let {classes: headerClasses = '', html: headerHTML = ``} = header;
        let {classes: sectionClasses = ''} = section;
        let {classes: footerClasses = '', html: footerHTML = ''} = footer;
        let {classes: linkContainerClasses = '', attributes: linkContainerAttributes = {}} = linkContainer;
        let linkContainerAttributeHTML = new AttributeTags(linkContainerAttributes, Object.keys(linkContainerAttributes)).html;

        return `
            <section class="${sectionClasses} ${defaultSectionClasses}" id="${data.id}">
                 <header class="${headerClasses} ${defaultHeaderClasses}">${headerHTML}</header>
                 <div class='${defaultLinkContainerClasses} ${linkContainerClasses}' ${linkContainerAttributeHTML}>
                    ${linkSection}
                </div>
                <footer class="${footerClasses} ${defaultFooterClasses}">${footerHTML}</footer>
            </section>`;
    }
}