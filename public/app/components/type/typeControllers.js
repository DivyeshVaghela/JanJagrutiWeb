(function(){
    'use strict';

    angular
        .module('app')
        .controller('typeListCtrl', typeListCtrl)
        .controller('typeCreateCtrl', typeCreateCtrl)
        .controller('typeEditCtrl', typeEditCtrl);

    typeListCtrl.$inject = ['$scope', '$rootScope', 'typeService', 'CONSTANTS'];
    function typeListCtrl($scope, $rootScope, typeService, CONSTANTS){

        $rootScope.breadcrumbItems = [
            {
                label: 'Material Types',
                state: 'materialType'
            }
        ];

        $scope.CONSTANTS = CONSTANTS;
        $scope.Math = window.Math;
        $scope.types = [];

        typeService.get().$promise
            .then(function(response){
                $scope.types = response.rows;
            })
            .catch(function(err){
                if(!err.handled)
                    console.log(err);
            });
    }

    typeCreateCtrl.$inject = ['$scope', '$rootScope', '$state', 'typeService', 'formDataService'];
    function typeCreateCtrl($scope, $rootScope, $state, typeService, formDataService){

        $rootScope.breadcrumbItems = [
            {
                label: 'Material Types',
                state: 'materialType'
            },
            {
                label: 'Create'
            }
        ];

        $scope.submitionInitiated = false;
        $scope.type = {
            name: null,
            value: null,
            details: null,
            logo: null
        };

        $scope.create = function(isValid){

            if (isValid){
                typeService.save(formDataService.toFormData($scope.type))
                    .$promise
                    .then(function(type){
                        $state.go('materialType');
                    })
                    .catch(function(err){
                        console.log(err);
                    });
            }
        };

    }

    typeEditCtrl.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'typeService', 'formDataService'];
    function typeEditCtrl($scope, $rootScope, $state, $stateParams, typeService, formDataService){
        
        $rootScope.breadcrumbItems = [
            {
                label: 'Material Types',
                state: 'materialType'
            },
            {
                label: 'Edit'
            }
        ];

        $scope.type = null;

        typeService.get({
            id: $stateParams.typeId
        }).$promise
            .then(function(response){
                $scope.type = response;

                $rootScope.breadcrumbItems.splice(1, 0, {
                    label: $scope.type.name,
                    state: `materialType`
                });
            })
            .catch(function(err){
                if (!err.handled)
                    console.log(err);
                $state.go('materialType');
            });

        $scope.update = function(isValid){

            if (isValid){
                typeService.update({ id:$scope.type.id }, formDataService.toFormData($scope.type))
                    .$promise
                    .then(function(response){
                        $state.go('materialType');
                    })
                    .catch(function(err){
                        if (err.handled){
                            console.log(err);
                            alert('There was some problem');
                        }
                        $state.go('materialType');
                    });
            }
        };

    }

})();