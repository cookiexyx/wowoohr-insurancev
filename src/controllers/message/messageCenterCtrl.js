angular.module('appmvc')
	.controller('MessageCenterCtrl', function MessageCenterCtrl($scope, $rootScope, appServices, $location,pagenation) {
		'use strict';

	$scope.select_all = false;
	$scope.chooseInfo =  true;
	$scope.chooseCheckbox  =  true;
	$scope.checked = [];
	$scope.checkTitleNum = 0;
	appServices.messageCenter.save().$promise.then(function(data){
    	$scope.totalNum = data.result.totalNum;
    	$scope.billList = data.result.billList;
    })
	// 点击显示对应内容
	$scope.show_details = function(index,read){
		if (read == 'false') {
			//  这一块需要发数据给后端
			$scope.billList[index].readState = "true";
		}
		for(var i = 0; i < $scope.billList.length; i++)
		{
			$scope.billList[i].contShow = false;
		}
		$scope.billList[index].contShow = true;
		$scope.chooseInfo =  false;
	}

	// 点击删除消息
	$scope.delete_news = function(){
		$scope.chooseCheckbox  =  false;
	}

	// 单选择
	$scope.selectOne = function () {
        angular.forEach($scope.billList , function (i) {
            var index = $scope.checked.indexOf(i.id);
            if(i.checked && index === -1) {
                $scope.checked.push(i.id);
            } else if (!i.checked && index !== -1){
                $scope.checked.splice(index, 1);
            };
        })
        if ($scope.billList.length === $scope.checked.length) {
            $scope.select_all = true;
        } else {
            $scope.select_all = false;
        }
        $scope.checkTitleNum = $scope.checked.length;
    }
    // 多选择
    $scope.selectAll = function () {
        if($scope.select_all) {
            $scope.checked = [];
            angular.forEach($scope.billList, function (i) {
                i.checked = true;
                $scope.checked.push(i.id);
            })
        }else {
            angular.forEach($scope.billList, function (i) {
                i.checked = false;
                $scope.checked = [];
            })
        }
         $scope.checkTitleNum = $scope.checked.length;
    };

    // 多删除
    $scope.delete_choose = function(){
    	if($scope.checkTitleNum > 0)
    	{
    		var item = $('.billMessage-pop');
        	$rootScope.alertPop(item);
    	}
    }

    $scope.succOrder = function(){
        appServices.messageCenter.save({
            checked :$scope.checked               
        }).$promise.then(function (data) {
            $rootScope.successPop('')
            $scope.totalNum = data.result.totalNum;
    		$scope.billList = data.result.billList;
            $scope.select_all = false;
			$scope.chooseInfo =  true;
			$scope.chooseCheckbox  =  true;
			$scope.checked = [];
			$scope.checkTitleNum = 0;
            $rootScope.successPop('处理成功');
            $rootScope.closePop();
        });
    }

    //单个删除
    $scope.oneDelete = function(index){
    	$scope.checked.push(index);
    	var item = $('.billMessage-singlePop');
        $rootScope.alertPop(item);
    }
    $scope.succSingleOrder = function(){
        appServices.messageCenter.save({
            checked :$scope.checked               
        }).$promise.then(function (data) {
            $rootScope.successPop('')
            $scope.totalNum = data.data.totalNum;
    		$scope.billList = data.data.billList;
            $scope.select_all = false;
			$scope.chooseInfo =  true;
			$scope.chooseCheckbox  =  true;
			$scope.checked = [];
			$scope.checkTitleNum = 0;
            $rootScope.successPop('处理成功');
            $rootScope.closePop();
        });
    }


});
