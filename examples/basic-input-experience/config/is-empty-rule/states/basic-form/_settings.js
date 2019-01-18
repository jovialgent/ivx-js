import events from "./events";
import headerHtml from "./templates/header.html";
import footerHtml from "./templates/footer.html";

import submtAfterHTML from "./templates/submit.after.html";
import submtBeforeHTML from "./templates/submit.before.html";
import submitButtonLabelHtml from "./templates/submit.label.html";

 
import inputs from "./inputs";

const stateSettings = {
    id: "basic-form",
    url: "/basic-form",
    name: "New Form Scene: 3",
    type: "input",
    next: [
    {
        route: "all-empty",
        rule: {
            conditionOperator: "and",
            conditions: [
                {
                    key: "firstname",
                    is: "empty",
                    value: ""
                },
                {
                    key: "lastname",
                    is: "empty",
                    value: ""
                },
                {
                    key: "email",
                    is: "empty",
                    value: ""
                }
            ]
        }
    },
    {
        route: "first-name-empty",
        rule: {
            conditionOperator: "and",
            conditions: [
                {
                    key: "firstname",
                    is: "empty",
                    value: ""
                }
            ]
        }
    },
    {
        route: "last-name-empty",
        rule: {
            conditionOperator: "and",
            conditions: [
                {
                    key: "lastname",
                    is: "empty",
                    value: ""
                }
            ]
        }
    },
    {
        route: "email-empty",
        rule: {
            conditionOperator: "and",
            conditions: [
                {
                    key: "email",
                    is: "empty",
                    value: ""
                }
            ]
        }
    },
    {
        route: "none-are-empty",
        rule: {
            conditionOperator: "not",
            conditions: [
                {
                    key: "firstname",
                    is: "empty",
                    value: ""
                },
                {
                    key: "lastname",
                    is: "empty",
                    value: ""
                },
                {
                    key: "email",
                    is: "empty",
                    value: ""
                }
            ]
        }
    }
],
    embedded:false,
    ...events(),
    section: {
    classes: "basic-form ivx-grid-container-fluid"
},
    header:{
    html : headerHtml,
    classes: ""
}, 
    footer:{
        html: footerHtml,
        classes: ""
    }
        ,
    
     form:{
      submit: {
                beforeHtml:{
                html: submtBeforeHTML,
                classes: ""
            },
                afterHtml:{
                html: submtAfterHTML,
                classes: ""
            },
                labelHTML:submitButtonLabelHtml,
                input: {},
                container: {}
        }
    },
   
   
    inputs: [...inputs()]
};

export default [
    
    stateSettings
]