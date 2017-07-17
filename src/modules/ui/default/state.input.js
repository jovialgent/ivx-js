export class InputState {
    constructor(formSection, data) {
        this.formSection = formSection;
        this.data = data;
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

    get html() {
        let {formSection, data, defaultFooterClasses, defaultHeaderClasses, defaultSectionClasses} = this;
        let {header = {}, footer = {}, section = {}} = data;
        let {classes: headerClasses = '', html: headerHTML = ``} = header;
        let {classes: sectionClasses = '' } = section;
        let {classes: footerClasses = '', html: footerHTML = ''} = footer;

        return `
            <section class="${sectionClasses} ${defaultSectionClasses}" id="${data.id}">
                 <header class="${headerClasses} ${defaultHeaderClasses}">${headerHTML}</header>
                ${formSection}
                <footer class="${footerClasses} ${defaultFooterClasses}">${footerHTML}</footer>
            </section>`;
    }
}