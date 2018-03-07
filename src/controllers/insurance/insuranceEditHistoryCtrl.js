angular.module('appmvc')
	.controller('InsuranceEditHistoryCtrl', function InsuranceEditHistoryCtrl($scope, $rootScope, appServices, $location,pagenation,$routeParams,$timeout) {
		'use strict';
    $scope.titleName = '产品修改历史';
    $scope.pageNum=1;
    $scope.localPageNum=1;
    $scope.localTimeList=[];
    $scope.index=0;
    $(document).on('click', '.history-time>li.timeList', function () {
        $(this).addClass('active').siblings('li').removeClass('active');          
    }); 

    $scope.time=function() {
        if($routeParams.auditState=='productId'){
            appServices.insuranceHistoryTimeAudit.save({
                pageNum:$scope.pageNum,
                pageSize:8,
                productId:$routeParams.id
            }).$promise.then(function(data){
                $scope.auditTimeList=data.result.auditTimeList;
                $scope.pages = data.result.pages;
                $scope.pageSize=data.result.pageSize;
                $scope.localTimeList[$scope.index]=data.result.auditTimeList;
                $scope.index=$scope.index+1;
                if($scope.auditTimeList.length > 0)
                {
                   $scope.init($scope.auditTimeList[0].key); 
                }
                $scope.checkBtn();
            });
        }else{
            appServices.insuranceHistoryTime.save({
                pageNum:$scope.pageNum,
                pageSize:8,
                auditId:$routeParams.id
            }).$promise.then(function(data){
                $scope.auditTimeList=data.result.auditTimeList;
                $scope.pages = data.result.pages;
                $scope.pageSize=data.result.pageSize;
                $scope.localTimeList[$scope.index]=data.result.auditTimeList;
                $scope.index=$scope.index+1;
                if($scope.auditTimeList.length > 0)
                {
                    $scope.init($scope.auditTimeList[0].key);
                }
                $scope.checkBtn();
            });
        }
        
    }
    $scope.time();

    $scope.init=function(id) {
        if($routeParams.auditState=='productId'){
            appServices.insuranceEditHistoryAudit.save({
                auditLogId:id    //历史修改id
            }).$promise.then(function(data){
                $scope.data = data.result;
                $scope.insuranceFormList=data.result.insuranceList;
            });
        }else{
            appServices.insuranceEditHistory.save({
                auditLogId:id    //历史修改id
            }).$promise.then(function(data){
                $scope.data = data.result;
                $scope.insuranceFormList=data.result.insuranceList;
            });
        }
        
    }
    $scope.next=function(status) {
        if(status){
            $scope.pageNum=$scope.pageNum+1;
            $(".history-time").fadeOut(300); 
            $scope.time();
            $(".history-time").fadeIn(300); 
            $timeout(function(argument) {
                $scope.checkBtn();
            },300)
            // console.log($scope.pageNum);
        }
    }
    $scope.prev=function(status) {
        if(status){
            $(".history-time").fadeOut(300); 
            $scope.pageNum=$scope.pageNum-1;
            $scope.time();
            $(".history-time").fadeIn(300); 
            $timeout(function(argument) {
                $scope.checkBtn();
            },300);
            // console.log($scope.pageNum);
        }
        
    }

    //判断翻页按钮使能
    $scope.checkBtn=function () {
        if($scope.pageNum==$scope.pages){
            $scope.nextBtn=false;
        }else{
            $scope.nextBtn=true;
        }
        if($scope.pageNum==1){
            $scope.prevBtn=false;
        }else{
            $scope.prevBtn=true;
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