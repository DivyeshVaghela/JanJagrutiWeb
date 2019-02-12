(function(){
    'use strict';

    angular
        .module('app')
        .factory('subjectService', subjectService);

    subjectService.$inject = ['$resource', 'CONSTANTS'];
    function subjectService($resource, CONSTANTS){

        return $resource(CONSTANTS.BASE_URL + '/subject/:id', {}, {
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