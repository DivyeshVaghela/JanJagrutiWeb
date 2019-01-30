(function(){
    'use strict';

    angular
        .module('app')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$scope', 'CONSTANTS','$http'];
    function homeCtrl($scope, CONSTANTS, $http){
        $scope.message = null;

        // $http({
        //     url: CONSTANTS.BASE_URL + '/admin/protected',
        //     method: 'GET'
        // }).then(function(response){
        //     $scope.message = response.data.message;
        // }).catch(function(err){
        //     console.log(err);
        // });
    }

})();