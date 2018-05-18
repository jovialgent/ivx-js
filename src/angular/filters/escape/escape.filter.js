

export default (iVXjs) => {
    "ngInject";

    return (text) => {
        //Inspired by lodashes escape: https://github.com/lodash/lodash/blob/3.0.0-npm-packages/lodash.escape/index.js
        const reUnescapedHtml = /[&<>"'`]/g;
        const reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
        const htmlEscapes = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '`': '&#96;'
        };

        if (!reHasUnescapedHtml.test(text)) return text;

        return text.replace(reUnescapedHtml, runEscape);

        function runEscape(char) {
            return htmlEscapes[char];
        }
    }
}