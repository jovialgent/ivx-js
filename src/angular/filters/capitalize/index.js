import CapitalizeFilter from "./capitalize.filter";


export default angular.module('ivx-js.filters.capitalize', [])
    .filter('capitalize', CapitalizeFilter)
    .name;