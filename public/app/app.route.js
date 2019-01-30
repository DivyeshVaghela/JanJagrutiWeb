(function(){
    'use strict';

    var app = angular.module('app');

    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: '/app/components/user/login.html',
                controller: 'loginCtrl'
            })
            .state('home', {
                url: '/home',
                templateUrl: '/app/components/home/home.html',
                controller: 'homeCtrl'
            })

            //notice or notification
            .state('notice', {
                url: '/notice',
                templateUrl: '/app/components/notice/list.html',
                controller: 'noticeListCtrl'
            })
            .state('noticeCreate', {
                url: '/notice/create',
                templateUrl: '/app/components/notice/create.html',
                controller: 'noticeCreateCtrl'
            });

    }]);

})();