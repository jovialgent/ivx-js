export default (iVXjs) => {
    "ngInject";

    return (text) => {
        //Inspired by lodashes escape: https://github.com/lodash/lodash/blob/3.0.0-npm-packages/lodash.unescape/index.js
        const reEscapedHtml = /&(?:amp|lt|gt|quot|#39|#96);/g;
        const reHasEscapedHtml = RegExp(reEscapedHtml.source);
        const htmlUnescapes = {
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            '&quot;': '"',
            '&#39;': "'",
            '&#96;': '`'
          };

        if (!reHasEscapedHtml.test(text)) return text;

        return text.replace(reEscapedHtml, runUnescape);

        function runUnescape(char) {
            return htmlUnescapes[char];
        }

    }
}