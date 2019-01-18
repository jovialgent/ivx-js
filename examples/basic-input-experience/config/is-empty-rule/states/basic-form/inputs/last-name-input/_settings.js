
import inputAfterHTML from "./templates/after.html";
import inputBeforeHTML from "./templates/before.html";
import inputLabel from "./templates/label.html";



const settings = {
    id: "last-name-input",
    type: "text",
    name: "lastname",
     
    
                beforeHtml:{
                html: inputBeforeHTML,
                classes: ""
            },
                afterHtml:{
                html: inputAfterHTML,
                classes: ""
            },
                labelHTML:inputLabel,
                input: {},
                container: {}
        ,
    attributes : {},
    settings : {
    width: "1/2"
},
    errors : {},
    
     

}

export default settings;