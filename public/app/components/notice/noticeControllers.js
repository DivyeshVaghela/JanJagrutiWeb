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
                        console.log(err);
                        alert('There was some problem while fetching notice list');
                    });
            }
        };
        $scope.loadNotices(1);

        $scope.getFormattedDate = function(date, pattern){
            return moment(moment.utc(date).local()).format(pattern);
            //return new Date(date).toString('dd MM, yyyy (hh:mm a)');
        }

        // $scope.getDate = function(date){
        //     return date.substring(0, date.lastIndexOf('.'));
        // };
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
                    .catch(function(err){
                        console.log(err);
                        alert('There was some problem while saving notice, please try again');
                    });
            }
        };
    }
    

})();