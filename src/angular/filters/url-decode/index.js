import UrlDecodeFilter from "./url-decode.filter";


export default angular.module('ivx-js.filters.url-decode', [])
    .filter('url_decode', UrlDecodeFilter)
    .name;