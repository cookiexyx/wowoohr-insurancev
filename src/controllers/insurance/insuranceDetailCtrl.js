angular.module('appmvc')
	.controller('InsuranceDetailCtrl', function InsuranceDetailCtrl($scope, $rootScope, appServices, $location,pagenation,$routeParams) {
		'use strict';
    $scope.titleName = '产品详情';
    $scope.id=$routeParams.id;
    $scope.inputData={};
    $scope.inputData[$routeParams.auditState]=$scope.id;
    $scope.auditState=$routeParams.auditState;
    if($routeParams.auditState == 'auditLogId'){
        appServices.getRefuseProductInfo.save({
            auditId:$scope.id
        }).$promise.then(function(data){
            $scope.data = data.result;
            $scope.insuranceFormList=data.result.insuranceList;
        });
    }else{
        appServices.insuranceDetail.save($scope.inputData).$promise.then(function(data){
            $scope.data = data.result;
            $scope.insuranceFormList=data.result.insuranceList;
        });
    }


    $scope.goEditHistory=function() {
        if($scope.auditState=='productId'){
            $location.path('insurance/editHistory/'+$scope.auditState+'/'+$scope.data.id);
        }else{
            $location.path('insurance/editHistory/'+$scope.auditState+'/'+$scope.data.auditId);
        }
    }
    
	
}).filter('ntobr', function(){
    var filter = function(input){
        var out = "";
        if (input&&input.indexOf("\\n") >= 0) {
           out = input.replace(/\\n/g," "); 
        }
        else
        {
            out = input;
        }
        return out;
    };
    return filter;
});