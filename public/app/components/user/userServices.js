(function(){
    'use strict';

    angular
        .module('app')
        .factory('userService', userService);

    userService.$inject = ['$http', '$q', 'CONSTANTS', '$window'];
    function userService($http, $q, CONSTANTS, $window){

        var isAuthenticated = function(){
            return $window.sessionStorage.user != undefined;
        };

        var setToken = function(token, issuedAt, expire){
            $window.sessionStorage.token = token;
            $window.sessionStorage.issuedAt = issuedAt;
            $window.sessionStorage.expire = expire;
        };

        var getToken = function(){
            // var token = undefined;
            // if ($window.sessionStorage.token != null)
            //     token = $window.sessionStorage.token;
            // return token;
            return $window.sessionStorage.token;
        };

        var getTokenObject = function(){
            if ($window.sessionStorage.token == null)
                return null;
            
            return {
                token: $window.sessionStorage.token,
                issuedAt: $window.sessionStorage.issuedAt,
                expire: $window.sessionStorage.expire
            };
        };

        var getExpire = function(){
            if ($window.sessionStorage.token == null)
                return null;
            
            return getTokenObject().expire;
        };

        var setUser = function(user){
            $window.sessionStorage.user = JSON.stringify(user);
        };

        var getUser = function() {
            var user = $window.sessionStorage.user;
            if (user != null)
                user = JSON.parse(user);
            return user;
        };

        var login = function(email, password){

            var defer = $q.defer();

            $http({
                url: (CONSTANTS.BASE_URL + CONSTANTS.LOGIN_URI).toString(),
                method: 'POST',
                data: {
                    email, password
                }
            }).then(function(response){
                if (response == undefined){
                    defer.reject('Invalid Credential');
                }
                setUser(response.data.userProfile);
                setToken(response.data.token, response.data.issuedAt, response.data.expire);
                defer.resolve(response.data);
            }).catch(function(err){
                defer.reject(err);
            });

            return defer.promise;
        };

        var logout = function(){
            delete $window.sessionStorage.user;
        };

        return {
            login,
            logout,
            getUser,
            getToken,
            getTokenObject,
            getExpire,
            isAuthenticated
        };
    }

})();