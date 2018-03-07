angular.module('appmvc')
	.controller('InsuranceFundCtrl', function InsuranceFundCtrl($scope, $rootScope, appServices, $location,pagenation,$timeout) {
		'use strict';

		// $scope.province="请选择";
		// $scope.city="请选择";
        // $scope.cityCode="";
        
		// $('.dropdown-menu').bind("click",function(event){
  //       	event.stopPropagation();    //  阻止事件冒泡
  //   	});


        $scope.pageSize=10;
        $scope.pageNum=1;
        $scope.nowPage=1;
        // $(".insurance-fund-box").hide();
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
            $scope.insuranceFundList={
                cityAllMap:$scope.cityAllMap,
                typeMap:$scope.typeMap,
                pageNum:$scope.pageNum,
                nowPage:$scope.nowPage,
                scrollTop:$(window).scrollTop()
            }
            sessionStorage.setItem('insuranceFund',JSON.stringify($scope.insuranceFundList));
        }


        $scope.init=function() {
            //返回保留搜索条件和所在位置
                $scope.nowPage=1;
                appServices.insuranceFund.save({
                    pageNum:1,
                    pageSize:$scope.pageSize,
                    cityCode:$scope.cityAllMap,
                    type:$scope.typeMap
                }).$promise.then(function(data){
                    $scope.dataList=data.result.dataList;
                    $scope.auditingLength = data.result.auditingLength;
                    $scope.refuseLength = data.result.refuseLength;
                    $scope.approvedLength=data.result.approvedLength;
                    $scope.totalPage = data.result.pages;
                    if(!$rootScope.gobackUrl&&sessionStorage.getItem('insuranceFund')){
                        var localList=JSON.parse(sessionStorage.getItem('insuranceFund'));
                        sessionStorage.removeItem('insuranceFund');
                        $scope.cityAllMap=localList.cityAllMap;
                        $scope.typeMap=localList.typeMap;
                        $scope.pageNum = localList.pageNum;
                        $scope.nowPage = localList.nowPage;
                        $scope.listArr = [];
                        var i =1;
                        for(var f=1;f<$scope.pageNum+1;f++){
                            appServices.insuranceFund.save({
                                pageNum:f,
                                pageSize:$scope.pageSize,
                                cityCode:$scope.cityAllMap,
                                type:$scope.typeMap
                            }).$promise.then(function(data){
                                $("#loading").show();
                                $scope.auditingLength = data.result.auditingLength;
                                $scope.refuseLength = data.result.refuseLength;
                                $scope.approvedLength=data.result.approvedLength;
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
                        sessionStorage.removeItem('insuranceFund');
                    }
                })
        }
        

        $scope.selectType = function(key,code) {
            if(key==1){
                $scope.cityAllMap=code;
            }else{
                $scope.typeMap=code;
            }
            $scope.init();
        }

        // 下拉刷新
        $(window).scroll(function(){
            if(parseInt($(window).scrollTop())+parseInt($(window).height())==parseInt($(document).height())&&$scope.nowPage<$scope.totalPage){
                $scope.pageNum=$scope.nowPage+1;
                appServices.insuranceFund.save({
                    pageNum:$scope.nowPage+1,
                    pageSize:$scope.pageSize,
                    cityCode:$scope.cityAllMap,
                    type:$scope.typeMap
                }).$promise.then(function(data){
                    $scope.dataList=$scope.dataList.concat(data.result.dataList);
                    $scope.nowPage=$scope.nowPage+1;
                });
            }else if($scope.nowPage==$scope.totalPage&&parseInt($(window).scrollTop())+parseInt($(window).height())==parseInt($(document).height()) ){
              $rootScope.successPop('数据已加载完毕');
              $scope.nowPage=$scope.nowPage+1;
            }
        })


    	// $scope.hideBox=function(){
    	// 	$("body").click();
    	// }

    	// $scope.provinceCity=function (key) {
    	// 	$scope.type = key;
    	// }
    	// $scope.liClick=function(value) {
    	// 	if($scope.type==1){
    	// 		$scope.province=value;
    	// 	}else{
    	// 		$scope.city=value;
    	// 	}
    	// }

        //跳转到详情页
        $scope.goDetail=function(id){
            $scope.goBackFun();
            $location.path('insurance/detail/productId/'+id);
        }

        //url
        $scope.goUrl=function(url){
            $scope.goBackFun();
            $location.path(url);
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