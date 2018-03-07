angular.module('appmvc')
	.controller('LoginCtrl', function LoginCtrl($scope, $rootScope, appServices, $location) {
		'use strict';
        
		sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId');
        $scope.login=function() {
        	if(!$scope.name){
        		$scope.nameErr = '请输入用户名';
        		$(".name-err").show();
        	}
        	if(!$scope.password){
        		$scope.passwordErr = '请输入密码';
        		$(".password-err").show();
        	}
        	if($scope.name&&$scope.password){
        		appServices.login.save({
                    authAccount:$scope.name,
                    password:$scope.password,
                    auto:"false",
                    loginType:"1"
                }).$promise.then(function(data){
	                if(data.code==1002){
	                	$scope.passwordErr=data.msg;
	                	$(".password-err").show();
	                }else{
                        sessionStorage.setItem('token',data.result.token);
                        sessionStorage.setItem('userId',data.result.userId);
                        sessionStorage.setItem('userName',$scope.name);
                        $rootScope.userName=sessionStorage.getItem('userName');
	                	$location.path('/order/increase');
	                }
	            });
        	}
        }
        $scope.KeyDown=function(argument) {
            if(event.keyCode == 13){
                $scope.login();
            }
        }
});
