(function(){
    'use strict';

    angular
        .module('app')
        .controller('subjectListCtrl', subjectListCtrl)
        .controller('subjectCreateCtrl', subjectCreateCtrl)
        .controller('subjectDetailsCtrl', subjectDetailsCtrl)
        .controller('subjectEditCtrl', subjectEditCtrl);

    subjectListCtrl.$inject = ['$scope', '$rootScope', 'subjectService', 'CONSTANTS'];
    function subjectListCtrl($scope, $rootScope, subjectService, CONSTANTS){

        $scope.Math = window.Math;
        $scope.CONSTANTS = CONSTANTS;
        $scope.subjects = [];
        $scope.includeCreator = true;

        subjectService.get({
            creator: $scope.includeCreator
        }).$promise
            .then(function(subjects){
                console.log(subjects);
                $scope.subjects = subjects.rows;
            })
            .catch(function(err){
                console.log(err);
            });

        $rootScope.breadcrumbItems = [
            {
                label: 'Subjects',
                state: 'subject'
            }
        ];
    }

    subjectCreateCtrl.$inject = ['$scope', '$rootScope', '$state', 'subjectService', 'formDataService'];
    function subjectCreateCtrl($scope, $rootScope, $state, subjectService, formDataService){

        $scope.subject = {
            title: null,
            subtitle: null,
            details: null,
            logo: null
        };

        $scope.create = function(isValid){

            if (isValid){
                
                subjectService.save(formDataService.toFormData($scope.subject))
                    .$promise
                    .then(function(subject){
                        $state.go('subject');
                    })
                    .catch(function(err){
                        console.log(err);
                        alert('There was some error');
                        $state.go('subject');
                    });
            }
        };

        $rootScope.breadcrumbItems = [
            {
                label: 'Subjects',
                state: 'subject'
            },
            {
                label: 'Create',
                state: 'subjectCreate'
            }
        ];
    }

    subjectDetailsCtrl.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'subjectService', 'CONSTANTS'];
    function subjectDetailsCtrl($scope, $rootScope, $state, $stateParams, subjectService, CONSTANTS){

        $rootScope.breadcrumbItems = [
            {
                label: 'Subjects',
                state: 'subject'
            }
        ];

        $scope.subjectId = $stateParams.subjectId;
        $scope.subject = null;
        $scope.CONSTANTS = CONSTANTS;

        subjectService.get({ 
            id: $scope.subjectId,
            details: true,
            creator: true
        }).$promise
            .then(function(response){
                $scope.subject = response;
                $rootScope.breadcrumbItems.push({
                    label: $scope.subject.title
                });
            })
            .catch(function(err){
                console.log(err);
            });
    }

    subjectEditCtrl.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'subjectService', 'formDataService'];
    function subjectEditCtrl($scope, $rootScope, $state, $stateParams, subjectService, formDataService){

        $rootScope.breadcrumbItems = [
            {
                label: 'Subjects',
                state: 'subject'
            }
        ];

        $scope.subject = {
            id: $stateParams.subjectId,
            title: null,
            subtitle: null,
            details: null,
            logo: null
        };

        subjectService.get({
            id: $scope.subject.id
        }).$promise
            .then(function(response){
                $scope.subject = response;
                $rootScope.breadcrumbItems.push({
                    label: $scope.subject.title,
                    state: `subjectDetails({ subjectId: ${$scope.subject.id} })`
                }, {
                    label: 'Edit'
                });
            })
            .catch(function(err){
                console.log(err);
                alert('There was some problem');
                $state.go('subject');
            });

        $scope.update = function(isValid){

            if (isValid){

                subjectService.update({ id: $scope.subject.id },formDataService.toFormData($scope.subject))
                    .$promise
                    .then(function(subject){
                        $state.go('subject');
                    })
                    .catch(function(err){
                        console.log(err);
                        alert('There was some error');
                        $state.go('subject');
                    });
            }
        };
    }

})();