import UrlEncodeFilter from "./url-encode.filter";


export default angular.module('ivx-js.filters.url-encode', [])
    .filter('url_encode', UrlEncodeFilter)
    .name;