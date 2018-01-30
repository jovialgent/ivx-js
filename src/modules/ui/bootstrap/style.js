export class Style {
    constructor() {
    }

    addWidthClasses(inputHTML) {
        let currentWidthTotal = 0.0;
        let columnNames = ["col-md-1", "col-md-2", "col-md-3", "col-md-4", "col-md-5", "col-md-6", "col-md-7", "col-md-8", "col-md-9" ,"col-md-10", "col-md-11", "col-md-12"]
        let contents = inputHTML.reduce((contentHTML, thisInput) => {
            let {html, settings, input = {}} = thisInput;
            const {type} = input;
            let {width = "1", classes= ''} = settings;
            let numericWidth = getNumericWidth(width);

            if (currentWidthTotal <= 0) {
                contentHTML = `${contentHTML}<div class="row"> `
            }

            currentWidthTotal += numericWidth;
            
            let bootstrapWidthStyleName = columnNames[Math.round(numericWidth * columnNames.length) - 1];
           
            html = html.replace('ivxjs-grid-1-1', `form-group ${bootstrapWidthStyleName} ${classes} ivx-input-container ivx-input-container-${type}`);
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
}