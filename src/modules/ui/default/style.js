export class Style {
    constructor() {}

    getWidth(width) {
        if (width === '1') return 'ivxjs-grid-1-1';
        
        let gridString = width.replace('/', '-');

        return `ivxjs-grid-${gridString}`;
    }
    
    get containerClasses(){
        return 'input-container';
    }

    addWidthClasses(inputsHTML) {
        let self = this;
        let {containerClasses = ''} = this;
        let contents = inputsHTML.reduce((currentHTML, inputHTML) => {
            let {html, settings = {}} = inputHTML;
            let {width = '1', container={}} = settings;
            let {classes=''} = container;
            
            classes = `${classes} ${containerClasses}`
            
            let thisWidth = self.getWidth(width);

            html = html.replace("ivxjs-grid-1-1", `${thisWidth} ${classes}`);

            return `${currentHTML} ${html}`;
        }, '')

        return contents;
    }
}