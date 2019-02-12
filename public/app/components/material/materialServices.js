(function(){
    'use strict';

    angular
        .module('app')
        .factory('materialService', materialService);

    materialService.$inject = ['$resource', 'CONSTANTS'];
    function materialService($resource, CONSTANTS){

        return $resource(CONSTANTS.BASE_URL + '/material/:id', {}, {
            save: {
                method: 'POST',
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            },
            update: {
                method: 'PUT',
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }
        });
    }

})();