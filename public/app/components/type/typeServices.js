(function(){
    'use strict';

    angular
        .module('app')
        .factory('typeService', typeService);

    typeService.$inject = ['$resource', 'CONSTANTS'];
    function typeService($resource, CONSTANTS){

        return $resource(CONSTANTS.BASE_URL + '/type/:id', {} ,{
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