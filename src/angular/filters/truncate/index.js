import TruncateFilter from "./truncate.filter";


export default angular.module('ivx-js.filters.truncate', [])
    .filter('truncate', TruncateFilter)
    .name;