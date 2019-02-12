(function(){
    'use strict';

    angular
        .module('app')
        .controller('noticeListCtrl', noticeListCtrl)
        .controller('noticeCreateCtrl', noticeCreateCtrl)
        .controller('noticeDetailsCtrl', noticeDetailsCtrl);

    //notice list
    noticeListCtrl.$inject = ['$scope', '$rootScope', 'noticeService'];
    function noticeListCtrl($scope, $rootScope, noticeService){

        $rootScope.breadcrumbItems = [
            {
                label: 'Notices',
                state: 'notice'
            }
        ];

        $scope.Math = window.Math;
        
        $scope.notices = [];
        $scope.totalNotices = 0;
        $scope.details = true;
        $scope.detailsLimit = 70;
        $scope.pageSize = 20;

        $scope.totalPages = 0;
        $scope.currentPage = 0;

        $scope.loadNotices = function(page){

            if ($scope.currentPage != page){
                noticeService.get({
                    details: $scope.details,
                    detailsLimit: $scope.detailsLimit,
                    page: page,
                    pageSize: $scope.pageSize
                }).$promise
                    .then(function(response){
                        $scope.totalNotices = response.count;
                        $scope.notices = response.rows;
                        $scope.totalPages = $scope.Math.ceil($scope.totalNotices / $scope.pageSize);

                        $scope.currentPage = page;
                    })
                    .catch(function(err){
                        if (!err.handled){
                            console.log(err);
                        }
                    });
            }
        };
        $scope.loadNotices(1);

    }

    //create notice
    noticeCreateCtrl.$inject = ['$scope', '$rootScope', '$state', 'noticeService'];
    function noticeCreateCtrl($scope, $rootScope, $state, noticeService){
        
        $rootScope.breadcrumbItems = [
            {
                label: 'Notices',
                state: 'notice'
            },
            {
                label: 'Create'
            }
        ];
        $scope.isSubmitionInitiated = false;

        $scope.notice = {
            title: null,
            noticeDetails: null
        };

        $scope.create = function(isValid){

            if (isValid){
                noticeService.save({
                    title: $scope.notice.title,
                    details: $scope.notice.noticeDetails
                }).$promise
                    .then(function(response){
                        $state.go('notice');
                    })
                    .catch(function(response){
                        if (!response.handled){
                            console.log(response);
                            alert(response.data.message);
                        }
                    });
            }
        };
    }
    
    noticeDetailsCtrl.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'noticeService'];
    function noticeDetailsCtrl($scope, $rootScope, $state, $stateParams, noticeService){
        
        $rootScope.breadcrumbItems = [
            {
                label: 'Notices',
                state: 'notice'
            }
        ];
        noticeService.get({
            id: $stateParams.noticeId
        }).$promise
            .then(function(response){
                $scope.notice = response;

                $rootScope.breadcrumbItems.push({
                    label: $scope.notice.title
                });
            })
            .catch(function(err){
                if (!err.handled){
                    console.log(err);
                    alert('There was some problem');
                    $state.go('notice');
                }
            });

    }

})();