angular.module('appmvc')
	.controller('OrderAllDetailCtrl', function OrderAllDetailCtrl($scope, $rootScope, appServices, $location,pagenation,$routeParams) {
		'use strict';
		$scope.state=$routeParams.id;
		$scope.id=$routeParams.type;
    	$scope.titleName = '订单详情（共申报'+$scope.state+'个月）';
		    appServices.orderAllDetail.save({
	    	applyId:$scope.id
	    }).$promise.then(function(data){
	        $scope.result = data.result;
	        $scope.orderMonthMax = data.result.orderMonthMax;
	        $scope.orderMonthMin = data.result.orderMonthMin;
	        $scope.beginDate = $scope.orderMonthMax;
	        $('#datetimepicker1').data("DateTimePicker").minDate($scope.orderMonthMin);
	        $('#datetimepicker1').data("DateTimePicker").maxDate($scope.orderMonthMax);
	         // 解决键盘 delete快捷键 删除问题 
	        setTimeout(function(){
	            $scope.datetimepicker1Array = [];
	            $scope.datetimepicker1Array.push($scope.beginDate);
	            $("#datetimepicker1").on("click",function(){
	                if($("#datetimepicker1").val().toString().length > 0 && $("#datetimepicker1").val() != 'Invalid date' ){
	                    $scope.datetimepicker1Array.push($("#datetimepicker1").val());
	                }
	            });
	            $("#datetimepicker1").on("keydown",function(event){ 
	                if(event.keyCode == 46){
	                    $("#datetimepicker1").val($scope.datetimepicker1Array[$scope.datetimepicker1Array.length-1]);
	                    $scope.beginDate = $scope.datetimepicker1Array[$scope.datetimepicker1Array.length-1];
	                    $scope.$apply();
	                    event.preventDefault();
	                }
	            });
	        },300);
	    });


	    $('#datetimepicker1').datetimepicker({
	        useCurrent: false,   // 当前时间不会选中
	        format: 'YYYY-MM',    // 默认显示月
	        locale: 'zh-cn',
	        ignoreReadonly: true    // 禁止填写  showTodayButton: true
	    }).on('dp.change', function(ev){
	       var result = new moment(ev.date).format('YYYY-MM');   // 正确的日期格式
	       $scope.beginDate = result;  
	       $scope.$apply();
	       if($scope.beginDate != "Invalid date")
	       {
		       appServices.orderAllDetail.save({
					applyId:$scope.id,
					orderMonth:$scope.beginDate
			    }).$promise.then(function(data){
			        $scope.result = data.result;
			    });
		    }
	    });

	    $scope.dateBlur=function(id,value){
	        $scope[value]=$("#"+id).val();
	    }
    
    
});