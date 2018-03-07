angular.module('appmvc')
	.controller('BillPayeeCtrl', function BillPayeeCtrl($scope, $rootScope, appServices, $location,pagenation,$timeout) {
		'use strict';
        $scope.pageSize=20;
        $scope.pageNum=1;
        // 进入页面获取数据
        $scope.init = function(){
            $scope.nowPage=1;
            appServices.billPayee.save({
                pageNum:1,
                pageSize:$scope.pageSize
            }).$promise.then(function(data){
                $scope.result=data.result;
                $scope.list = data.result.list;
                $scope.listLength = angular.copy(data.result.totalCount);
                $scope.totalCount = data.result.totalCount;
                $scope.totalPage = data.result.pages;
            });
            appServices.billPayeeDate.save().$promise.then(function(data){
                $scope.fromBillMonth=data.result.minBillMonth;
                $scope.toBillMonth=data.result.maxBillMonth;

                $('#datetimepicker1').datetimepicker({
                    useCurrent: false,//Important! See issue #1075
                    format: 'YYYY-MM',
                    locale: 'zh-cn',
                    ignoreReadonly: true,
                    defaultDate:data.result.minBillMonth,
                    minDate:data.result.minBillMonth,
                    maxDate:data.result.maxBillMonth
                }).on('dp.change', function(ev){
                    if(window.event.keyCode!=46){
                        $(".startMonth-err").hide();
                        var result = new moment(ev.date).format('YYYY-MM');  
                        $scope.fromBillMonth = result;
                        $('#datetimepicker2').data("DateTimePicker").minDate(ev.date);
                        $scope.sendDate();
                        $scope.$apply();
                    }
                });

                $('#datetimepicker2').datetimepicker({
                    useCurrent: false,//Important! See issue #1075
                    format: 'YYYY-MM',
                    locale: 'zh-cn',
                    ignoreReadonly: true,
                    defaultDate:data.result.maxBillMonth,
                    minDate:data.result.minBillMonth,
                    maxDate:data.result.maxBillMonth
                }).on('dp.change', function(ev){
                    if(window.event.keyCode!=46){
                        var result = new moment(ev.date).format('YYYY-MM');
                       $scope.toBillMonth = result;
                       $('#datetimepicker1').data("DateTimePicker").maxDate(ev.date);
                       $scope.sendDate();
                       $scope.$apply();
                    }
                });
                //解决键盘 delete快捷键 删除问题 
                setTimeout(function(){
                  $scope.datetimepicker1Array = [];
                  $("#datetimepicker1").on("click",function(){
                      if($("#datetimepicker1").val().toString().length > 0 && $("#datetimepicker1").val() != 'Invalid date' ){
                          $scope.datetimepicker1Array.push($("#datetimepicker1").val());
                      }
                  });
                  $("#datetimepicker1").on("keydown",function(event){ 
                      if(event.keyCode == 46){
                          $("#datetimepicker1").val($scope.datetimepicker1Array[$scope.datetimepicker1Array.length-1]);
                          $scope.fromBillMonth = $scope.datetimepicker1Array[$scope.datetimepicker1Array.length-1];
                          $scope.$apply();
                          event.preventDefault();
                      }
                  });

                  $scope.datetimepicker2Array = [];
                  $("#datetimepicker2").on("click",function(){
                      if($("#datetimepicker2").val().toString().length > 0 && $("#datetimepicker2").val() != 'Invalid date' ){
                          $scope.datetimepicker2Array.push($("#datetimepicker2").val());
                      }
                  });
                  $("#datetimepicker2").on("keydown",function(event){ 
                      if(event.keyCode == 46){
                          $("#datetimepicker2").val($scope.datetimepicker2Array[$scope.datetimepicker2Array.length-1]);
                          $scope.toBillMonth =  $scope.datetimepicker2Array[$scope.datetimepicker2Array.length-1];
                          $scope.$apply();
                          event.preventDefault();
                      }
                  });
                },300);
            });
        }
        $scope.init();

         // 下拉刷新
        $(window).scroll(function(){
            if(parseInt($(window).scrollTop())+parseInt($(window).height())==parseInt($(document).height())&&$scope.nowPage<$scope.totalPage){
                $scope.pageNum=$scope.nowPage+1;
                appServices.billPayee.save({
                    pageNum:$scope.nowPage+1,
                    pageSize:$scope.pageSize,
                    billMonthFrom:$scope.fromBillMonth,
                    billMonthTo:$scope.toBillMonth
                }).$promise.then(function(data){
                    $scope.list=$scope.list.concat(data.result.list);
                    $scope.nowPage=$scope.nowPage+1;
                    $scope.totalCount = data.result.totalCount;
                    $scope.totalPage = data.result.pages;
                });
            }else if($scope.nowPage==$scope.totalPage&&parseInt($(window).scrollTop())+parseInt($(window).height())==parseInt($(document).height()) ){
              $rootScope.successPop('数据已加载完毕');
              $scope.nowPage=$scope.nowPage+1;
            }
        })

        // 查询列表
        $scope.sendDate=function(){
            $scope.nowPage=1;
            appServices.billPayee.save({
                pageNum:1,
                pageSize:$scope.pageSize,
                billMonthFrom:$scope.fromBillMonth,
                billMonthTo:$scope.toBillMonth
            }).$promise.then(function(data){
                $scope.result = data.result;
                $scope.list=data.result.list;
                $scope.totalCount=data.result.totalCount;
                $scope.totalPage=data.result.pages;
            })
        }

        $scope.dateBlur=function(id,value){
            $scope[value]=$("#"+id).val();
        }

        // 导出EXCEL
        $scope.exportExcel=function(id){
            window.open('/entry/vendorReceiptBillDownload?billId='+id);
        }

        //查看详情跳转
        $scope.goDetail=function(date){
          sessionStorage.setItem('detailDate',date);
          $location.path('bill/payeeDetail');
        }
     
}).filter('numberString', function() { //可以注入依赖
    return function(text) {
        if(typeof(text) == "number" )
        {
            return text.toFixed(2);
        }
        else
        {
            return text;
        }
    }
});
