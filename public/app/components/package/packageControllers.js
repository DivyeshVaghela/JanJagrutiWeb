(function(){
    'use strict';

    angular
        .module('app')
        .controller('packageListCtrl', packageListCtrl)
        .controller('packageCreateCtrl', packageCreateCtrl)
        .controller('packageDetailsCtrl', packageDetailsCtrl)
        .controller('packageEditCtrl', packageEditCtrl);

    packageListCtrl.$inject = ['$scope', '$rootScope', 'packageService'];
    function packageListCtrl($scope, $rootScope, packageService){

        $rootScope.breadcrumbItems = [
            {
                label: 'Packages',
                state: 'package'
            }
        ];

        $scope.includeCreator = true;
        $scope.includeDetails = true;
        $scope.detailsLimit = 70;

        $scope.loadPackages = function(){

            packageService.get({
                details: $scope.includeDetails,
                creator: $scope.includeCreator,
                detailsLimit: $scope.detailsLimit
            }).$promise
                .then(function(response){
                    $scope.totalPackages = response.count;
                    $scope.packages = response.rows;
                })
                .catch(function(err){
                    if (!err.handled){
                        console.log(err);
                    }
                });
        };
        $scope.loadPackages();
    }

    packageCreateCtrl.$inject = ['$scope', '$rootScope', '$state', 'packageService'];
    function packageCreateCtrl($scope, $rootScope, $state, packageService){

        $rootScope.breadcrumbItems = [
            {
                label: 'Packages',
                state: 'package'
            },
            {
                label: 'Create'
            }
        ];
        $scope.isSubmitionInitiated = false;

        $scope.package = {
            title: null,
            subtitle: null,
            details: null,
            duration: 1,
            durationScale: null,
            rate: null
        };

        $scope.create = function(isValid){

            if (isValid){
                packageService.save({
                    title: $scope.package.title,
                    subtitle: $scope.package.subtitle,
                    details: $scope.package.details,
                    duration: $scope.package.duration,
                    durationScale: $scope.package.durationScale,
                    rate: $scope.package.rate,
                }).$promise
                    .then(function(response){
                        $state.go('package');
                    })
                    .catch(function(err){
                        if (!response.handled){
                            console.log(response);
                            alert(response.data.message);
                        }
                    });
            }
        };

    }

    packageDetailsCtrl.$inject = ['$scope', '$rootScope', '$stateParams', '$state', 'packageService'];
    function packageDetailsCtrl($scope, $rootScope, $stateParams, $state, packageService){

        $rootScope.breadcrumbItems = [
            {
                label: 'Packages',
                state: 'package'
            }
        ];

        packageService.get({
            id: $stateParams.packageId,
            creator: true
        }).$promise
            .then(function(response){
                $scope.package = response;

                $rootScope.breadcrumbItems.push({
                    label: $scope.package.title
                });
            }).catch(function(err){
                if (!err.handled){
                    console.log(err);
                    alert('There was some problem');
                    $state.go('package');
                }
            });
    }

    packageEditCtrl.$inject = ['$scope', '$rootScope', '$stateParams', '$state', 'packageService'];
    function packageEditCtrl($scope, $rootScope, $stateParams, $state, packageService){

        $rootScope.breadcrumbItems = [
            {
                label: 'Packages',
                state: 'package'
            }
        ];

        packageService.get({
            id: $stateParams.packageId,
            creator: false
        }).$promise
            .then(function(response){
                $scope.package = response;

                $rootScope.breadcrumbItems.push({
                    label: $scope.package.title,
                    state: `packageDetails({ packageId : ${$scope.package.id} })`
                }, {
                    label: 'Edit'
                });
            }).catch(function(err){
                if (!err.handled){
                    console.log(err);
                    alert('There was some problem');
                    $state.go('package');
                }
            });

        $scope.update = function(isValid){

            if (isValid){
                packageService.update({ id:$scope.package.id },{
                    title: $scope.package.title,
                    subtitle: $scope.package.subtitle,
                    details: $scope.package.details,
                    duration: $scope.package.duration,
                    durationScale: $scope.package.durationScale,
                    rate: $scope.package.rate,
                }).$promise
                    .then(function(response){
                        $state.go('package');
                    })
                    .catch(function(err){
                        if (!response.handled){
                            console.log(response);
                            alert(response.data.message);
                        }
                    });
            }
        };
    }
})();