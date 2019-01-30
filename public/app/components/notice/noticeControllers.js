(function(){
    'use strict';

    angular
        .module('app')
        .controller('noticeListCtrl', noticeListCtrl)
        .controller('noticeCreateCtrl', noticeCreateCtrl);

    //notice list
    noticeListCtrl.$inject = ['$scope', 'noticeService'];
    function noticeListCtrl($scope, noticeService){

        $scope.notices = [];

        $scope.totalNotices = 0;

        $scope.details = true;
        $scope.detailsLimit = 30;
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

                        var result = $scope.totalNotices / $scope.pageSize;
                        if (result % 1 != 0){
                            result = parseInt(result + 1);
                        }
                        $scope.totalPages = result;

                        $scope.currentPage = page;
                    })
                    .catch(function(err){
                        if (!err.handled){
                            console.log(err);
                            alert(err.data.message);
                        }
                    });
            }
        };
        $scope.loadNotices(1);

    }

    //create notice
    noticeCreateCtrl.$inject = ['$scope', '$state', 'noticeService'];
    function noticeCreateCtrl($scope, $state, noticeService){

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
    

})();