export class Style {
    constructor() { }

    getWidth(width) {
        if (width === '1') return 'ivx-grid-1-1 ivxjs-grid-1-1';

        let gridString = width.replace('/', '-');

        return `ivx-grid-${gridString} ivxjs-grid-${gridString}`;
    }

    get containerClasses() {
        return 'input-container ivx-input-container';
    }

    addWidthClasses(inputsHTML) {
        let self = this;
        let { containerClasses = '' } = this;
        let contents = inputsHTML.reduce((currentHTML, inputHTML) => {
            let { html, settings = {}, input = {} } = inputHTML;
            const { type = "" } = input;
            let { width = '1', container = {} } = settings;
            let { classes = '' } = container;
            
            classes = `${classes} ${containerClasses} ivx-input-container-${type}`

            let thisWidth = self.getWidth(width);

            html = html.replace("ivxjs-grid-1-1", `${thisWidth} ${classes}`);

            return `${currentHTML} ${html}`;
        }, '')

        return contents;
    }
}