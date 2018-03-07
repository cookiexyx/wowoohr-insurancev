angular.module('appmvc')
	.controller('OrderDelectDetailCtrl', function OrderDelectDetailCtrl($scope, $rootScope, appServices, $location,pagenation,$routeParams) {
		'use strict';
    $scope.titleName = '订单详情';
    $scope.id=$routeParams.id;
    appServices.orderDeleteDetail.save({
        id:$scope.id
    }).$promise.then(function(data){
        $scope.result = data.result;
    });
    
});