(function(){
    'use strict';

    angular
        .module('app')
        .controller('loginCtrl', loginCtrl)
        .controller('verifyEmailCtrl', verifyEmailCtrl)
        .controller('resetPasswordCtrl', resetPasswordCtrl);

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

    verifyEmailCtrl.$inject = ['$scope', '$rootScope', '$stateParams', 'userService'];
    function verifyEmailCtrl($scope, $rootScope, $stateParams, userService){

        $rootScope.hideNavigation = true;

        $scope.inProgress = true;
        $scope.isVerified = false;

        $scope.email = $stateParams.email;
        $scope.code = $stateParams.code;

        $scope.verify = function(email, code){
            userService.verifyEmail(email, code)
                .then(function(responseMessage){
                    $scope.inProgress = false;
                    $scope.isVerified = true;
                })
                .catch(function(err){
                    $scope.inProgress = false;
                    if (err.status == 404)
                        $scope.failureMessage = "Invalid email address and/or verification code";
                    else
                        $scope.failureMessage = "There was some problem, please try again";
                });
        };

        console.log($stateParams);
        if (!$scope.email || !$scope.code){
            $scope.inProgress = false;
            $scope.failureMessage = "There was some problem, please try again";
        } else {
            $scope.verify($scope.email, $scope.code);
        }
    }

    resetPasswordCtrl.$inject = ['$scope', '$rootScope', '$stateParams', 'userService'];
    function resetPasswordCtrl($scope, $rootScope, $stateParams, userService){

        $rootScope.hideNavigation = true;

        if (!$stateParams.email || !$stateParams.code){
            $scope.invalidRequest = true;
        }

        $scope.credential = {
            email: $stateParams.email,
            verificationCode: $stateParams.code,
            newPassword: null,
            cofirmPassword: null
        };;

        $scope.isSubmitionInitiated = false;
        $scope.isSuccess = false;

        $scope.resetPassword = function(isValid){
            if (isValid){
                console.log($scope.credential.newPassword);
                console.log($scope.credential.cofirmPassword);
                userService.resetPassword($scope.credential.email, $scope.credential.newPassword, $scope.credential.verificationCode)
                    .then(function(response){
                        if (response == null){
                            $scope.isSuccess = false;
                            $scope.failureMessage = "There was some problem, please try again";
                        } else if (response.data.success == true){
                            $scope.isSuccess = true;
                            $scope.successMessage = response.data.hasOwnProperty('message') ? response.data.message : "Password reset successfully, you can login now by using new password";
                        } else {
                            $scope.isSuccess = false;
                            $scope.failureMessage = response.data.hasOwnProperty('message') ? response.data.message : "There was some problem, please try again";
                        }
                    })
                    .catch(function(err){

                        console.log(err);
                        $scope.isSuccess = false;
                        $scope.failureMessage = err.data.hasOwnProperty('message') ? err.data.message : "There was some problem, please try again";
                    });
            }
        };


    }
})();