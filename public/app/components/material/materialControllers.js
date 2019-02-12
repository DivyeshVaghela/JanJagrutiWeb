(function(){
    'use strict';

    angular
        .module('app')
        .controller('materialListCtrl', materialListCtrl)
        .controller('materialCreateCtrl', materialCreateCtrl)
        .controller('materialDetailsCtrl', materialDetailsCtrl)
        .controller('materialEditCtrl', materialEditCtrl);

    materialListCtrl.$inject = ['$scope', '$rootScope', '$stateParams', 'materialService', 'subjectService', 'CONSTANTS'];
    function materialListCtrl($scope, $rootScope, $stateParams, materialService, subjectService, CONSTANTS){

        $rootScope.breadcrumbItems = [
            {
                label: 'Subjects',
                state: 'subject'
            },
            {
                label: 'Materials',
                state: 'material'
            }
        ];

        $scope.Math = window.Math;
        $scope.CONSTANTS = CONSTANTS;

        $scope.materials = [];
        $scope.totalMaterials = 0;
        $scope.includeDetails = false;
        $scope.includeCreator = false;
        $scope.pageSize = 20;

        if ($stateParams.hasOwnProperty('subjectId'))
            $scope.subjectId = $stateParams.subjectId;

        if ($scope.subjectId){
            subjectService.get({ 
                id: $scope.subjectId,
                details: false,
                creator: false
            }).$promise
                .then(function(respose){
                    $scope.subject = respose;
                    $rootScope.breadcrumbItems.splice(1, 0, {
                        label: $scope.subject.title,
                        state: `subjectDetails({ subjectId:${$scope.subject.id} })`
                    });
                })
                .catch(function(err){
                    console.log(err);
                });
        }

        $scope.totalPages = 0;
        $scope.currentPage = 0;

        $scope.loadMaterials = function(page){

            if (page != $scope.currentPage){

                var query = {
                    details: $scope.includeDetails,
                    creator: $scope.includeCreator,
                    pageSize: $scope.pageSize,
                    page: page
                };

                if ($scope.subjectId)
                    query.subjectId = $scope.subjectId;

                materialService.get(query).$promise
                    .then(function(response){

                        $scope.totalMaterials = response.count;
                        $scope.materials = response.rows;

                        $scope.totalPages = $scope.Math.ceil($scope.totalMaterials / $scope.pageSize);
                        $scope.currentPage = page;
                    })
                    .catch(function(err){
                        console.log(err);
                    });
            }
        };
        $scope.loadMaterials(1);
    }

    materialCreateCtrl.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'subjectService', 'typeService', 'materialService', 'formDataService'];
    function materialCreateCtrl($scope, $rootScope, $state, $stateParams, subjectService, typeService, materialService, formDataService){
        
        $rootScope.breadcrumbItems = [
            {
                label: 'Subjects',
                state: 'subject'
            },
            {
                label: 'Materials',
                state: 'material'
            },
            {
                label: 'Create'
            }
        ];

        $scope.material = {
            title: null,
            subtitle: null,
            details: null,
            subjectId: null,
            typeId: null,
            materialFile: null
        };

        $scope.subjects = [];
        subjectService.get()
            .$promise
            .then(function(response){
                $scope.subjects = response.rows;

                if ($stateParams.hasOwnProperty('subjectId')){
                    $scope.material.subjectId = $stateParams.subjectId;

                    angular.forEach($scope.subjects, function(value, index){
                        if (value.id == $stateParams.subjectId){
                            $rootScope.breadcrumbItems.splice(1, 1, {
                                label: value.title,
                                state: `subjectDetails({ subjectId : ${value.id} })`
                            }, {
                                label: 'Materials',
                                state: `subjectMaterials({ subjectId : ${value.id} })`
                            });
                        }
                    });
                }
            }).catch(function(err){
                console.log(err);
                // $state.go('material');
            });

        $scope.mimeTypes = [];
        typeService.get()
            .$promise
            .then(function(response){
                $scope.mimeTypes = response.rows;
            }).catch(function(err){
                console.log(err);
                // $state.go('material');
            });

        $scope.selectedType = null;
        $scope.$watch('material.typeId', function(newValue, oldValue){
            var selectedType = $scope.mimeTypes.filter(function(mimeType){
                if (mimeType.id == newValue){
                    return mimeType;
                }
            })[0];
            if (selectedType){ 
                $scope.selectedType = selectedType.value;
            }
        });

        $scope.create = function(isValid){
            
            if (isValid){
                materialService.save(formDataService.toFormData($scope.material))
                    .$promise
                    .then(function(response){
                        $state.go('material');
                    })
                    .catch(function(err){
                        console.log(err);
                    });
            }
        };
    }

    materialDetailsCtrl.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'materialService', 'CONSTANTS'];
    function materialDetailsCtrl($scope, $rootScope, $state, $stateParams, materialService, CONSTANTS){

        $rootScope.breadcrumbItems = [
            {
                label: 'Subjects',
                state: 'subject'
            },
            {
                label: 'Materials',
                state: 'material'
            }
        ];

        $scope.id = $stateParams.id;
        $scope.material = null;
        $scope.CONSTANTS = CONSTANTS;

        materialService.get({
            id:$scope.id,
            subject: true,
            creator: true,
            type: true
        }).$promise
            .then(function(response){
                $scope.material = response;
                $rootScope.breadcrumbItems.splice(1, 1, {
                    label: $scope.material.subject.title,
                    state: `subjectDetails({ subjectId : ${$scope.material.subject.id} })`
                }, {
                    label: 'Materials',
                    state: `subjectMaterials({ subjectId : ${$scope.material.subject.id} })`
                }, {
                    label: $scope.material.title
                });
            })
            .catch(function(err){
                console.log(err);
            });
    }

    materialEditCtrl.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'subjectService', 'typeService', 'materialService', 'formDataService'];
    function materialEditCtrl($scope, $rootScope, $state, $stateParams, subjectService, typeService, materialService, formDataService){

        $rootScope.breadcrumbItems = [
            {
                label: 'Subjects',
                state: 'subject'
            },
            {
                label: 'Materials',
                state: 'material'
            },
            {
                label: 'Edit'
            }
        ];

        $scope.subjects = [];
        $scope.mimeTypes = [];
        $scope.material = null;

        $scope.$watch('material.typeId', function(newValue, oldValue){
            var selectedType = $scope.mimeTypes.filter(function(mimeType){
                if (mimeType.id == newValue){
                    return mimeType;
                }
            })[0];
            if (selectedType){ 
                $scope.selectedType = selectedType.value;
            }
        });

        subjectService.get()
            .$promise
            .then(function(response){
                //fetch subjects
                $scope.subjects = response.rows;
                return new Promise(function(resolve, reject){
                    resolve();
                });
            })
            .then(function(){
                //fetch types
                return typeService.get().$promise;
            })
            .then(function(response){
                $scope.mimeTypes = response.rows;
                return new Promise(function(resolve, reject){
                    resolve();
                });
            })
            .then(function(){
                return materialService.get({
                            id: $stateParams.id,
                            type: false,
                            creator: false,
                            subject: false,
                            details: true
                        }).$promise;
            })
            .then(function(response){
                $scope.material = response;

                angular.forEach($scope.subjects, function(value, index){
                    if (value.id == $scope.material.subjectId){
                        $rootScope.breadcrumbItems.splice(1, 2, {
                            label: value.title,
                            state: `subjectDetails({ subjectId : ${value.id} })`
                        }, {
                            label: 'Materials',
                            state: `subjectMaterials({ subjectId : ${value.id} })`
                        }, {
                            label: $scope.material.title,
                            state: `materialDetails({ id:${$scope.material.id} })`
                        }, {
                            label: 'Edit'
                        });
                    }
                });

            })
            .catch(function(err){
                console.log(err);
                alert('There was some problem');
                $state.go('material');
            });

        $scope.update = function(isValid){

            materialService.update({id:$scope.material.id},formDataService.toFormData($scope.material))
                .$promise
                .then(function(response){
                    $state.go('material');
                })
                .catch(function(err){
                    console.log(err);
                });
        };
    }

})();