export class Style {
    constructor() {

    }

    getInputContainerClassNames(settings) {
        if (!settings) settings = {};

        let {containerClass = 'field', classes = ''} = settings;

        return `${containerClass} ${classes}`;
    }

    addWidthClasses(inputHTML) {
        let currentWidthTotal = 0.0;
        let columns = {string: "twelve", number: 12};
        let columnNames = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine" ,"ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen"]
        let contents = inputHTML.reduce((contentHTML, thisInput) => {
            let {html, settings} = thisInput;
            let {width = "1", container = {}} = settings;
            let {classes = '' } = container;
            let numericWidth = getNumericWidth(width);

            if (currentWidthTotal <= 0) {
                contentHTML = `${contentHTML}<div class="stackable fields"> `
            }

            currentWidthTotal += numericWidth;
            
            let semanticUIwidth = columnNames[Math.round(numericWidth * columnNames.length) - 1];
            
            html = html.replace('ivxjs-grid-1-1', `${semanticUIwidth} wide field ${classes}`);
            contentHTML = `${contentHTML}${html}`;

            if (currentWidthTotal >= 1) {
                contentHTML = `${contentHTML}</div>`;
                currentWidthTotal = 0;
            }

            return contentHTML;
        }, '');
        
        if(contents.substring(contents.length - 7) !== "</div>"){
            contents = `${contents}</div>`;
        }

        return contents;
        
        function getNumericWidth(widthString){
            if(widthString === '1') return 1;

            let parsedWidthFormula = widthString.split('/');
            
            return parseFloat(parsedWidthFormula[0]) / parseFloat(parsedWidthFormula[1]);
        }        
    }
};