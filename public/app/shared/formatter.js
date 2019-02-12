(function(){
    'use strict';

    angular
        .module('app')
        .filter('utcToLocal', utcToLocal)
        .directive('convertNumber', convertNumber);

    function utcToLocal(){
        return function(date, pattern){
            return moment(moment.utc(date).local()).format(pattern);
        };
    }

    function convertNumber(){
        return {
          require: 'ngModel',
          link: function(scope, el, attr, ctrl) {
            ctrl.$parsers.push(function(value) {
              return (value) ? parseInt(value, 10) : null;
            });
      
            ctrl.$formatters.push(function(value) {
              return value ? value.toString() : null;
            });      
          }
        }
      }
      

})();