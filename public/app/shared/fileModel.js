(function(){
    'use strict';

    angular
        .module('app')
        .directive('fileModel', fileModel)
        .factory('formDataService', formDataService);

    fileModel.$inject = ['$parse'];
    function fileModel($parse){

        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attr, ctrl){
                var model = $parse(attr.fileModel);
                var modelSetter = model.assign;

                if (attr.hasOwnProperty('required') && attr.required)
                    ctrl.$setValidity('required', element.val() != '');         //required validation
                element.bind('change', function(){
                    modelSetter(scope, element[0].files[0]);

                    if (attr.hasOwnProperty('required') && attr.required){
                        ctrl.$setValidity('required', element.val() != '');     //required validation
                        scope.$apply(function(){
                            //ctrl.$setViewValue(element.val());
                            ctrl.$render();
                        });
                    }
                });
            }
        };
    }

    formDataService.$inject = [];
    function formDataService(){

        var toFormData = function(data){
            var formData = new FormData();
            angular.forEach(data, function(value, key){
                formData.append(key, value);
            });
            return formData;
        };

        return {
            toFormData
        };
    }

})();