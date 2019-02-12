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
            .state('verifyEmail', {
                url: '/verify-email?email&code',
                templateUrl: '/app/components/user/verifyEmail.html',
                controller: 'verifyEmailCtrl'
            })
            .state('resetPassword', {
                url: '/reset-password?email&code',
                templateUrl: '/app/components/user/resetPassword.html',
                controller: 'resetPasswordCtrl'
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
            })
            .state('noticeDetails', {
                url: '/notice/:noticeId',
                templateUrl: '/app/components/notice/details.html',
                controller: 'noticeDetailsCtrl'
            })
            
            //subjects related to material
            .state('subject', {
                url: '/subject',
                templateUrl: '/app/components/subject/list.html',
                controller: 'subjectListCtrl'
            })
            .state('subjectCreate', {
                url: '/subject/create',
                templateUrl: '/app/components/subject/create.html',
                controller: 'subjectCreateCtrl'
            })
            .state('subjectDetails', {
                url: '/subject/:subjectId',
                templateUrl: '/app/components/subject/details.html',
                controller: 'subjectDetailsCtrl'
            })
            .state('subjectEdit', {
                url: '/subject/:subjectId/edit',
                templateUrl: '/app/components/subject/edit.html',
                controller: 'subjectEditCtrl'
            })
            .state('subjectMaterialCreate', {
                url: '/subject/:subjectId/material/create',
                templateUrl: '/app/components/material/create.html',
                controller: 'materialCreateCtrl'
            })
            .state('subjectMaterials', {
                url: '/subject/:subjectId/material',
                templateUrl: '/app/components/material/list.html',
                controller: 'materialListCtrl'
            })
            
            //material type (MIME types)
            .state('materialType', {
                url: '/material/type',
                templateUrl: '/app/components/type/list.html',
                controller: 'typeListCtrl'
            })
            .state('materialTypeCreate', {
                url: '/material/type/create',
                templateUrl: '/app/components/type/create.html',
                controller: 'typeCreateCtrl'
            })
            .state('materialTypeEdit', {
                url: '/material/type/:typeId/edit',
                templateUrl: '/app/components/type/edit.html',
                controller: 'typeEditCtrl'
            })
            
            //material
            .state('material', {
                url: '/material?subject',
                templateUrl: '/app/components/material/list.html',
                controller: 'materialListCtrl'
            })
            .state('materialCreate', {
                url: '/material/create',
                templateUrl: '/app/components/material/create.html',
                controller: 'materialCreateCtrl'
            })
            .state('materialDetails', {
                url: '/material/:id',
                templateUrl: '/app/components/material/details.html',
                controller: 'materialDetailsCtrl'
            })
            .state('materialEdit', {
                url: '/material/:id/edit',
                templateUrl: '/app/components/material/edit.html',
                controller: 'materialEditCtrl'
            });

    }]);

})();