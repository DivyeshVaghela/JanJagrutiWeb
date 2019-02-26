(function(){
    'use strict';

    angular
        .module('app')
        .factory('packageService', packageService);

    packageService.$inject = ['CONSTANTS', '$resource'];
    function packageService(CONSTANTS, $resource){

        return $resource(CONSTANTS.BASE_URL + '/package/:id', {}, {
            update: {
                method: 'PUT'
            }
        });
    }
    
})();