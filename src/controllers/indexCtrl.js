angular.module('appmvc')
	.controller('IndexCtrl', function IndexCtrl($scope, $rootScope, appServices, $location,$interval) {
		'use strict';
        $('.index-box').css('visibility','hidden');

        appServices.index.save().$promise.then(function(data){
        	$rootScope.myAvater = data.data.avatar;
        })

        $scope.goto = function(page){
          $location.path(page);
        }

        

    });



    

