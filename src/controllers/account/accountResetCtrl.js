angular.module('appmvc')
	.controller('AccountResetCtrl', function AccountResetCtrl($scope, $rootScope, appServices, $location) {
		'use strict';
		$scope.modifySucc=false;
        $scope.modify=function() {
        	var status = true;
        	if(!$scope.oldPassword){
        		$scope.oldErr = '请输入旧密码';
        		$(".old-err").show();
        		status = false;
        	}
            if(!$rootScope.checkPassword($scope.newPassword)){
                $scope.newErr = '请输入6-16位的字母、数字或特殊字符，区分大小写';
                $(".new-err").show();
                status = false;
            }
        	if(!$scope.newPassword){
        		$scope.newErr = '请输入新密码';
        		$(".new-err").show();
        		status = false;
        	}
            if(!$rootScope.checkPassword($scope.confirmNewPassword)){
                $scope.confirmErr = '请输入6-16位的字母、数字或特殊字符，区分大小写';
                $(".confirm-err").show();
                status = false;
            }
        	if(!$scope.confirmNewPassword){
        		$scope.confirmErr = '请确认新密码';
        		$(".confirm-err").show();
        		status = false;
        	}
        	if(status&&$scope.confirmNewPassword!=$scope.newPassword){
        		$scope.confirmErr = '两次输入新密码不一致';
        		$(".confirm-err").show();
        		status = false;

        	}
        	if(status){
		        appServices.accountReset.save({
	                oldPassword:$scope.oldPassword,
	                newPassword:$scope.newPassword
	            }).$promise.then(function(data){
	            	if(data.code==1003){
                            $scope.oldErr=data.msg;
                            $(".old-err").show();
                        }else{
                            $scope.modifySucc=true;
                        }
	            });
        	}

        }
	 	
});