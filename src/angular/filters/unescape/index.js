import UnescapeFilter from "./unescape.filter";


export default angular.module('ivx-js.filters.unescape', [])
    .filter('unescape', UnescapeFilter)
    .name;