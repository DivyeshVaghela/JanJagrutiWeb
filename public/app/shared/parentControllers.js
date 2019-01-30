(function(){
    'use strict';

    angular
        .module('app')
        .controller('parentCtrl', parentCtrl);

    parentCtrl.$inject = ['$scope', '$rootScope', 'CONSTANTS', '$state', 'userService'];
    function parentCtrl($scope, $rootScope, CONSTANTS, $state, userService){

        $rootScope.appName = 'Jan Jagruti';

        $scope.isAuthenticated = function(){
            return userService.isAuthenticated();
        };

        $scope.logout = function(){
            userService.logout();
            $state.go('login');
        };

        $rootScope.$on('loginEvent', function(event, data){
            //TODO: hanlde loginEvent
        });
    }

})();