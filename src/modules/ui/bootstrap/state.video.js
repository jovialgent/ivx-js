export class VideoState { 
    constructor(playerSection, data){
        this.playerSection = playerSection;
        this.data = data;
    }
    
    get html() {
        let {playerSection, data} = this;
        let {header = {}, footer = {}, section = {}} = data;
        let {classes : headerClasses = '', html: headerHTML = ``} = header;
        let {classes : sectionClasses = '' } = section;
        let {classes : footerClasses = '', html : footerHTML = ''} = footer;
        
        return `
            <section class="ui container ${sectionClasses}" id="${data.id}">
                <header class="${headerClasses}">${headerHTML}</header>
                ${playerSection}
                <footer class="${footerClasses}">${footerHTML}</footer>
            </section>
        `
    }
}