import EscapeFilter from "./escape.filter";


export default angular.module('ivx-js.filters.escape', [])
    .filter('escape', EscapeFilter)
    .name;