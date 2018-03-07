angular.module('appmvc')
	.controller('InsuranceRefuseCtrl', function InsuranceRefuseCtrl($scope, $rootScope, appServices, $location,pagenation,$timeout) {
		'use strict';
    $scope.titleName = '审核拒绝';
    $scope.pageSize=10;
    $scope.pageNum=1;
    $scope.nowPage=1;
    $scope.type=[{
            itemCode:"-1",
            itemName:"全部"
          }];
    $scope.cityAll=[{
        id: "",
        code: "-1",
        city: "全部",
        province: ""
      }];

      $(".insurance-fund-box").hide();

    appServices.getCityList.save().$promise.then(function(data){
        $scope.cityOptions=data.result.list;
        $scope.cityOptions.unshift($scope.cityAll[0]);
        $scope.cityAllMap=$scope.cityAll[0].code;
        appServices.getSiPrdType.save().$promise.then(function(data){
            $scope.typeOptions=data.result;
            $scope.typeOptions.unshift($scope.type[0]);
            $scope.typeMap=$scope.type[0].itemCode;
            $scope.init();
        });
    });

    $scope.goBackFun=function(){
        //返回存搜索位置
        $scope.insuranceRefuseList={
            cityCode:$scope.cityAllMap,
            type:$scope.typeMap,
            pageNum:$scope.pageNum,
            nowPage:$scope.nowPage,
            scrollTop:$(window).scrollTop()
        }
        sessionStorage.setItem('insuranceRefuse',JSON.stringify($scope.insuranceRefuseList));
    }

    $scope.init=function() {
        $scope.nowPage=1;
        appServices.insuranceChecking.save({
            pageNum:1,
            pageSize:$scope.pageSize,
            cityCode:$scope.cityAllMap,
            type:$scope.typeMap,
            auditState:2
        }).$promise.then(function(data){
            $scope.dataList=data.result.dataList;
            $scope.auditingLength = data.result.auditingLength;
            $scope.refuseLength = data.result.refuseLength;
            $scope.totalPage = data.result.pages;
            //返回保留搜索条件和所在位置
            if(!$rootScope.gobackUrl&&sessionStorage.getItem('insuranceRefuse')){
                var localList=JSON.parse(sessionStorage.getItem('insuranceRefuse'));
                sessionStorage.removeItem('insuranceRefuse');
                $scope.cityAllMap=localList.cityCode;
                $scope.typeMap=localList.type;
                $scope.pageNum = localList.pageNum;
                $scope.nowPage = localList.nowPage;
                $scope.listArr = [];
                var i =1;
                for(var f=1;f<$scope.pageNum+1;f++){
                    appServices.insuranceChecking.save({
                        pageNum:f,
                        pageSize:$scope.pageSize,
                        cityCode:$scope.cityAllMap,
                        type:$scope.typeMap,
                        auditState:2
                    }).$promise.then(function(data){
                        $("#loading").show();
                        $scope.auditingLength = data.result.auditingLength;
                        $scope.refuseLength = data.result.refuseLength;
                        $scope.listArr[data.result.pageNum] = data.result.dataList;
                        if(i == localList.pageNum){
                            $scope.dataList = [];
                            angular.forEach($scope.listArr, function(data,index,array){
                                $scope.dataList = $scope.dataList.concat(data);
                            });
                        }
                        if(i==$scope.pageNum){
                            $scope.totalPage = data.result.pages;
                        }
                        $timeout(function(){
                            $(".insurance-fund-box").show();
                            $(window).scrollTop(localList.scrollTop);
                            $("#loading").hide();
                        });
                        i++;
                    })
                }
            }else{
                $(".insurance-fund-box").show();
                sessionStorage.removeItem('insuranceRefuse');
            }
        });
    }

    $scope.selectType = function(key,code) {
        if(key==1){
            $scope.cityAllMap=code;
        }else{
            $scope.typeMap=code;
        }
        $scope.init();
    }
    $scope.goChecking = function(){
        $location.path('insurance/checking').replace();
    }
    

    // 下拉刷新
    $(window).scroll(function(){
        if(parseInt($(window).scrollTop())+parseInt($(window).height())==parseInt($(document).height())&&$scope.nowPage<$scope.totalPage){
            $scope.pageNum=$scope.nowPage+1;
            appServices.insuranceChecking.save({
                pageNum:$scope.nowPage+1,
                pageSize:$scope.pageSize,
                cityCode:$scope.cityAllMap,
                type:$scope.typeMap,
                auditState:2
            }).$promise.then(function(data){
                $scope.dataList=$scope.dataList.concat(data.result.dataList);
                $scope.nowPage=$scope.nowPage+1;
            });
        }else if($scope.nowPage==$scope.totalPage&&parseInt($(window).scrollTop())+parseInt($(window).height())==parseInt($(document).height()) ){
          $rootScope.successPop('数据已加载完毕');
          $scope.nowPage=$scope.nowPage+1;
        }
    })

    //跳转到详情页
    $scope.goDetail=function(id){
        $scope.goBackFun();
        $location.path('insurance/detail/auditLogId/'+id);
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