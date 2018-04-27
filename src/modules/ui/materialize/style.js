export class Style {
    constructor() {
    }

    addWidthClasses(inputHTML) {
        let currentWidthTotal = 0.0;
        let columnNames = ["col s1", "col s2", "col s3", "col s4", "col s5", "col s6", "col s7", "col s8", "col s9" ,"col s10", "col s11", "col s12"]
        let contents = inputHTML.reduce((contentHTML, thisInput) => {
            let {html, settings} = thisInput;
            let {width = "1", classes= ''} = settings;
            let numericWidth = getNumericWidth(width);

            if (currentWidthTotal <= 0) {
                contentHTML = `${contentHTML}<div class="row"> `
            }

            currentWidthTotal += numericWidth;
            
            let bootstrapWidthStyleName = columnNames[Math.round(numericWidth * columnNames.length) - 1];

          
            html = html.replace('ivxjs-grid-1-1', `input-field ${bootstrapWidthStyleName} ${classes}`);
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