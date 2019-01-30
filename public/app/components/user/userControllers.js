(function(){
    'use strict';

    angular
        .module('app')
        .controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$scope', '$state', 'userService'];

    function loginCtrl($scope, $state, userService){

        if (userService.isAuthenticated())
            $state.go('home');

        $scope.errorMessage = null;
        $scope.isSubmitionInitiated = false;
        $scope.credential = {
            email: null,
            password: null
        };

        $scope.login = function(isValid){

            if (isValid){
                userService
                    .login($scope.credential.email, $scope.credential.password)
                    .then(function(data){
                        $scope.$emit("loginEvent", {
                            success: true
                        });
                        $state.go('home');
                    })
                    .catch(function(err){
                        if (err.hasOwnProperty('data'))
                            $scope.errorMessage = err.data.message;
                        else
                        $scope.errorMessage = err;
                    });
            }
        };
    }

})();