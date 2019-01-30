(function(){
    'use strict';

    angular
        .module('app')
        .filter('utcToLocal', utcToLocal);

    function utcToLocal(){
        return function(date, pattern){
            return moment(moment.utc(date).local()).format(pattern);
        };
    }

})();