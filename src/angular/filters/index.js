import StringParser from "./string-parsers";
import Capitalize from "./capitalize";
import Truncate from "./truncate";
import UrlEncode from "./url-encode";
import UrlDecode from "./url-decode";
import Escape from "./escape";
import Unescape from "./unescape";

export default angular.module('ivx-js.filters', [
    Capitalize,
    Truncate,
    StringParser,
    UrlEncode,
    UrlDecode,
    Escape,
    Unescape
])
    .name