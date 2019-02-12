(function(){
    'use strict';

    angular
        .module('app')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$scope', '$rootScope', 'CONSTANTS','$http'];
    function homeCtrl($scope, $rootScope, CONSTANTS, $http){

        $rootScope.breadcrumbItems = [];

    }

})();