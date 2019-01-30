(function(){
    'use strict';

    var app = angular.module('app', [
        'ui.router',
        'ngAnimate',
        'ngResource'
    ]);

    app.constant('CONSTANTS', (function(){
        return {
            BASE_URL: 'http://localhost:3000',
            LOGIN_URI: '/admin/auth'
        };
    })());

    //intercept state change
    app.run(['$state','$transitions','userService', function($state, $transitions, userService){

        $transitions.onStart({}, function($transitions){
            var toState = $transitions.$to();

            if (toState.name != "login" && 
                    ( !userService.isAuthenticated()
                    || (userService.getExpire() != null && userService.getExpire() < (Date.now() / 1000)) )
                ){
                userService.logout();
                return $transitions.router.stateService.target('login');
            }
        });
    }]);

    //configure the interceptor to pass token with HTTP requests
    app.config(['$httpProvider', function($httpProvider){

        var interceptor = function($state, $q, $injector){
            return {
                request: function(config){
                    var userService = $injector.get('userService');
                    if (userService.isAuthenticated()){
                        config.headers['Authorization'] = 'jwt ' + userService.getToken();
                    }
                    return config;
                },

                responseError: function(rejection){

                    var userService = $injector.get('userService');
                    switch(rejection.status){
                        
                        case 401:
                            if ($state.current.name == 'login'){
                                rejection.handled = false;
                            } else {
                                userService.logout();
                                $state.go('login');
                                rejection.handled = true;
                            }
                            break;

                        case 403:
                            alert(rejection.data.message);
                            $state.go('home');
                            rejection.handled = true;
                            break;

                        default:
                            rejection.handled = false;
                            break;
                    }
                    return $q.reject(rejection);
                }
            }
        };
        interceptor.$injector = ['$state', '$q', '$injector'];

        $httpProvider.interceptors.push(interceptor);
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    }]);

})();