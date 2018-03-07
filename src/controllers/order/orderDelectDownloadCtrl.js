angular.module('appmvc')
	.controller('OrderDelectDownloadCtrl', function OrderDelectDownloadCtrl($scope, $rootScope, appServices, $location,pagenation,$routeParams) {
		'use strict';

    $scope.titleName = '下载列表';
    $scope.pageSize=20;
    $scope.nowPage=1;
    $scope.init=function(){
        $scope.nowPage=1;
        appServices.downloadList.save({
            pageSize:$scope.pageSize,
            pageNum:1
        }).$promise.then(function(data){
            $scope.result = data.result;
            $scope.totalCount=data.result.totalCount;
            if($scope.totalCount>0){
                for(var i=0;i<$scope.result.fileDownloadList.length;i++){
                   $scope.result.fileDownloadList[i].paramContent=$scope.result.fileDownloadList[i].paramContent.replace(/\|/g,"<br>");
                }
            }
            $scope.totalPage=data.result.pages;
        });
    }
    $scope.init();

    $scope.downloadPdf=function(downloadNumber,url,taskId){
        window.open('/entry/exportExcel?exportExcel='+taskId);
        appServices.downloadExcel.save({
            downloadNumber:downloadNumber, //下载任务id,
            taskId:taskId
        }).$promise.then(function(data){
            $scope.init();
        });
    }

    // 下拉刷新
    $(window).scroll(function(){
        if(parseInt($(window).scrollTop())+parseInt($(window).height())==parseInt($(document).height())&&$scope.nowPage<$scope.totalPage){
            appServices.downloadList.save({
                    pageNum: $scope.nowPage+1,
                    pageSize: $scope.pageSize
                }).$promise.then(function (data){
                    $scope.result.fileDownloadList = $scope.result.fileDownloadList.concat(data.result.fileDownloadList);
                    $scope.nowPage=$scope.nowPage+1;
                });
        }else if($scope.nowPage==$scope.totalPage&&parseInt($(window).scrollTop())+parseInt($(window).height())==parseInt($(document).height()) ){
            $rootScope.successPop('数据已加载完毕');
            $scope.nowPage=$scope.nowPage+1;
        }
    })
});