module.exports = {
    firebase: {
        js: "https://www.gstatic.com/firebasejs/3.2.0/firebase.js",
        injector: "iVXjs.data.firebase",
        directive: "iVXjsDataFirebase",
        configFunction: "data : iVXjsDataFirebase()",
        ivxjs: "js/modules/iVXjs.data.firebase.min.js"
    },
     "ivx-io": {
        js: "",
        injector: "iVXjs.data.iVXio",
        directive: "iVXjsDataiVXIO",
        configFunction: "data : iVXjsDataiVXIO()",
        ivxjs: "js/modules/iVXjs.data.ivx-io.min.js"
    },
    webtasks : {
        js : "",
        injector : "iVXjs.data.webtasks",
        directive: "iVXjsDataWebtasks",
        configFunction : "data : iVXjsDataWebtasks({baseUrl : baseUrl})",
        ivxjs : "js/modules/iVXjs.data.webtasks.min.js"
    }
}