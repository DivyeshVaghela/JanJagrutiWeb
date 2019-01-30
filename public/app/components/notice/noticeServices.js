(function(){
    'use strict';

    angular
        .module('app')
        .factory('noticeService', noticeService);

    noticeService.$inject = ['CONSTANTS', '$resource'];
    function noticeService(CONSTANTS, $resource){

        return $resource(CONSTANTS.BASE_URL + '/notice/:id');
    }

})();