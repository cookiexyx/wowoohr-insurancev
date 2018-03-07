angular.module('appmvc')
	.controller('OrderDetailCtrl', function OrderDetailCtrl($scope, $rootScope, appServices, $location,pagenation,$routeParams) {
		'use strict';
    $scope.titleName = '订单详情';
    $scope.id=$routeParams.id;
    $scope.type=$routeParams.type;
    if($routeParams.state=="increaseOrder"){
        $scope.payFeedbackBtn=true;
    }
    $scope.init=function(){
        $scope.payFeedbackIndex=-1;
        appServices.orderIncreaseDetail.save({
            id:$scope.id
        }).$promise.then(function(data){
            $scope.result = data.result;
        });
    }
    $scope.init();
    
    $scope.payFeedbackClick=function(index){
        $scope.payFeedbackIndex=index;
        angular.forEach($scope.result.insuranceDetialDtoList, function(data,index,array){
            if(data.status!=3&&data.status!=4){
                data.status2="3";
            }else{
                data.status2=angular.copy(data.status.toString());
            }
            if(data.paymentMethod == 1)
            {
                data.failReason2 = $scope.result.reasonList[0].failReason;
            }
            else
            {
                data.failReason2 = $scope.result.reasonListBarringAnnual[0].failReason;
            }
        });
    }
    $scope.cancle=function(){
    	$scope.payFeedbackIndex=-1;
    	$scope.titleName = '订单详情';
    }
    $scope.apply=function(orderDetailId,applyResult,failReason){
        $scope.orderDetailId = orderDetailId;
        $scope.applyResult = applyResult;
        $scope.failReason = failReason;
        if($scope.applyResult==3){
            $scope.failReason='';
        }
        var item = $('.addsucc-pop');
        $rootScope.alertPop(item);
    }
    $scope.selectResult=function(key,index){
    	if(key=="3"){
    		$scope.result.insuranceDetialDtoList[index].failReason2="";
    	}else{
            if($scope.result.insuranceDetialDtoList[index].paymentMethod == 1)
            {
                $scope.result.insuranceDetialDtoList[index].failReason2=$scope.result.reasonList[0].failReason;
            }
            else
            {
                $scope.result.insuranceDetialDtoList[index].failReason2=$scope.result.reasonListBarringAnnual[0].failReason;
            }
    	}
    }
    $scope.succApply=function(){
        appServices.feedbackByInsurance.save({
            orderDetailId:$scope.orderDetailId,
            applyResult:$scope.applyResult,
            failReason:$scope.failReason
        }).$promise.then(function(data){
            $scope.init();
            if(data.result){
                $scope.succApplyLink = true;
            }
            $scope.closePop();
        });
    }

    $scope.cancelFeedback=function(){
        $scope.payFeedbackIndex=-1;
    }
});