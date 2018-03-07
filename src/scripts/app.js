angular.module('appmvc', ["oc.lazyLoad", 'ngRoute', 'ngResource', 'ngTouch', 'ngSanitize','angucomplete-alt'])
	.config(function ($routeProvider, $locationProvider, $httpProvider, $touchProvider, $resourceProvider) {
		'use strict';	
		
		var LoginConfig = {
			controller: 'LoginCtrl',
			templateUrl: 'views/login.html?'+(new Date()).getTime(),
        	resolve: { 
        		authenticate: authenticate,
        		loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
		             return $ocLazyLoad.load('scripts/controllers/loginCtrl.js?'+(new Date()).getTime());
		    	}]
		    }
		};
		var DemoConfig = {
			controller: 'DemoCtrl',
			templateUrl: 'views/demo.html?'+(new Date()).getTime(),
        	resolve: { 
	        	authenticate: authenticate,
	        	loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
		             return $ocLazyLoad.load('scripts/controllers/demoCtrl.js?'+(new Date()).getTime());
		    	}] }
		};
	
		var OrderConfig = {
			controller: function($routeParams, $controller, $scope, $rootScope) { 
				var name = $routeParams.status.substr(0,1).toUpperCase() + $routeParams.status.substr(1,$routeParams.status.length);
			    $controller("Order"+ name + "Ctrl",{
			    	$scope:$scope,
			    	$rootScope:$rootScope
			    });
			},
			templateUrl: function($routeParams){
				var name = $routeParams.status.substr(0,1).toUpperCase() + $routeParams.status.substr(1,$routeParams.status.length);
				return 'views/order/order'+name+'.html?'+(new Date()).getTime();
			},
        	resolve: { 
        		authenticate: authenticate,
        		loadMyCtrl: ['$ocLazyLoad', '$route', function($ocLazyLoad, $route) {
		            return $ocLazyLoad.load('scripts/controllers/order/order'+$route.current.params.status.substr(0,1).toUpperCase() + $route.current.params.status.substr(1,$route.current.params.status.length)+'Ctrl.js?'+(new Date()).getTime());
		    	}]
		    }
		};

		var MessageConfig = {
			controller: function($routeParams, $controller, $scope, $rootScope) { 
				var name = $routeParams.status.substr(0,1).toUpperCase() + $routeParams.status.substr(1,$routeParams.status.length);
			    $controller("Message"+ name + "Ctrl",{
			    	$scope:$scope,
			    	$rootScope:$rootScope
			    });
			},
			templateUrl: function($routeParams){
				var name = $routeParams.status.substr(0,1).toUpperCase() + $routeParams.status.substr(1,$routeParams.status.length);
				return 'views/message/message'+name+'.html?'+(new Date()).getTime();
			},
        	resolve: { 
        		authenticate: authenticate,
        		loadMyCtrl: ['$ocLazyLoad', '$route', function($ocLazyLoad, $route) {
		            return $ocLazyLoad.load('scripts/controllers/message/message'+$route.current.params.status.substr(0,1).toUpperCase() + $route.current.params.status.substr(1,$route.current.params.status.length)+'Ctrl.js?'+(new Date()).getTime());
		    	}]
		    }
		};

		var InsuranceConfig = {
			controller: function($routeParams, $controller, $scope, $rootScope) { 
				var name = $routeParams.status.substr(0,1).toUpperCase() + $routeParams.status.substr(1,$routeParams.status.length);
			    $controller("Insurance"+ name + "Ctrl",{
			    	$scope:$scope,
			    	$rootScope:$rootScope
			    });
			},
			templateUrl: function($routeParams){
				var name = $routeParams.status.substr(0,1).toUpperCase() + $routeParams.status.substr(1,$routeParams.status.length);
				return 'views/insurance/insurance'+name+'.html?'+(new Date()).getTime();
			},
        	resolve: { 
        		authenticate: authenticate,
        		loadMyCtrl: ['$ocLazyLoad', '$route', function($ocLazyLoad, $route) {
		            return $ocLazyLoad.load('scripts/controllers/insurance/insurance'+$route.current.params.status.substr(0,1).toUpperCase() + $route.current.params.status.substr(1,$route.current.params.status.length)+'Ctrl.js?'+(new Date()).getTime());
		    	}]
		    }
		};

		var BillConfig = {
			controller: function($routeParams, $controller, $scope, $rootScope) { 
				var name = $routeParams.status.substr(0,1).toUpperCase() + $routeParams.status.substr(1,$routeParams.status.length);
			    $controller("Bill"+ name + "Ctrl",{
			    	$scope:$scope,
			    	$rootScope:$rootScope
			    });
			},
			templateUrl: function($routeParams){
				var name = $routeParams.status.substr(0,1).toUpperCase() + $routeParams.status.substr(1,$routeParams.status.length);
				return 'views/bill/bill'+name+'.html?'+(new Date()).getTime();
			},
        	resolve: { 
        		authenticate: authenticate,
        		loadMyCtrl: ['$ocLazyLoad', '$route', function($ocLazyLoad, $route) {
		            return $ocLazyLoad.load('scripts/controllers/bill/bill'+$route.current.params.status.substr(0,1).toUpperCase() + $route.current.params.status.substr(1,$route.current.params.status.length)+'Ctrl.js?'+(new Date()).getTime());
		    	}]
		    }
		};
		var AccountConfig = {
			controller: function($routeParams, $controller, $scope, $rootScope) { 
				var name = $routeParams.status.substr(0,1).toUpperCase() + $routeParams.status.substr(1,$routeParams.status.length);
			    $controller("Account"+ name + "Ctrl",{
			    	$scope:$scope,
			    	$rootScope:$rootScope
			    });
			},
			templateUrl: function($routeParams){
				var name = $routeParams.status.substr(0,1).toUpperCase() + $routeParams.status.substr(1,$routeParams.status.length);
				return 'views/account/account'+name+'.html?'+(new Date()).getTime();
			},
        	resolve: { 
        		authenticate: authenticate,
        		loadMyCtrl: ['$ocLazyLoad', '$route', function($ocLazyLoad, $route) {
		            return $ocLazyLoad.load('scripts/controllers/account/account'+$route.current.params.status.substr(0,1).toUpperCase() + $route.current.params.status.substr(1,$route.current.params.status.length)+'Ctrl.js?'+(new Date()).getTime());
		    	}]
		    }
		};
		
		$routeProvider
			.when('/login', LoginConfig)
			.when('/demo', DemoConfig)
			.when('/order/:status',OrderConfig)
			.when('/order/:status/:id',OrderConfig)
			.when('/order/:status/:id/:type',OrderConfig)
			.when('/order/:status/:state/:id/:type',OrderConfig)
			.when('/message/:status',MessageConfig)
			.when('/insurance/:status',InsuranceConfig)
			.when('/insurance/:status/:id',InsuranceConfig)
			.when('/insurance/:status/:auditState/:id',InsuranceConfig)
			.when('/bill/:status',BillConfig)
			.when('/account/:status',AccountConfig)
			.otherwise({
				redirectTo: '/login'
			});

		$touchProvider.ngClickOverrideEnabled(true);
		$resourceProvider.defaults.stripTrailingSlashes = false;
		// $httpProvider.defaults.withCredentials = true;

		function authenticate($q, appServices, $location, $rootScope) {
          	var defer = $q.defer();
          	// var corpidApp = params.corpid;
          	if(config.environment==="local"){          		
          		defer.resolve();
          	}
          	else{
     //      		appServices.ifLogin.get().$promise.then(function(data) {
	  		// 		console.log("ifLogin");
		  	// // 		$rootScope.ifHr = data.data.ifHr;
					// // $rootScope.hrAavatar = data.data.hrAavatar;
					// // $rootScope.hrName = data.data.hrName;
			  // //       $rootScope.hrUserDingId = data.data.hrUserDingId;
			  // //       $rootScope.ifLogined = data.data.ifLogined;
			  // //       $rootScope.ifFirst = data.data.ifFirst;
			  // 		$rootScope.userId=123;
			  // 		$rootScope.vendorId=456;
			  //       $rootScope.helpRightTop();
			        defer.resolve();
				// });
		  	}
			
          	return defer.promise;
        }
			
	
})

	.run(function ($rootScope, $location, appServices, $interval, $window, $routeParams, $timeout,$route, $templateCache) {		
		$rootScope.$on("$locationChangeStart", function(event, next, current){
			$(".header").hide();
			$(".subnav").hide();
			$rootScope.navPath();
			$(window).unbind("scroll");
			$("body").unbind("keydown");
			$rootScope.is404=false;
			$rootScope.gobackUrl=false;
			$rootScope.closePop();
			if(!sessionStorage.getItem('token')){
				$location.path("/login");
			}
			if(sessionStorage.getItem('userName')){
				$rootScope.userName=sessionStorage.getItem('userName');
			}
			if (typeof(current) !== 'undefined'){
	            $templateCache.remove(current.templateUrl);
	        }
    	});
    	

    	$(document).on('input propertychange', '.form-control', function () {
			if($(this).val()!=""||$(this).parent().parent().next().hasClass("err")){
				$(this).parent().parent().next().hide();
			}		    
		});	
    	$(document).on('input propertychange', '.input-err input', function () {
			if($(this).val()!=""){
				$(this).parent().children('small').hide();
			}		    
		});	
    	// 验证联系电话格式
    	$rootScope.checkContactNumber = function(obj) {
			var mobile = $.trim(obj);			
			//如果为1开头则验证手机号码
			if (!config.checkMatch.isPhone.regStr.test(mobile) || mobile.length != 11) {
				return false;
			}
			return true;

		} 	
		
		// 验证银行卡
    	$rootScope.checkBankNumber = function(obj) {
			var isCreditcard = $.trim(obj);
			if (!config.checkMatch.isCreditcard.regStr.test(isCreditcard)){
				return false;
			}
			return true;
		}
		// 验证身份证格式
		$rootScope.checkCertNo = function(obj) {
			var idNumber = $.trim(obj);
			if (!config.checkMatch.isIDCard.regStr.test(idNumber)){
				return false;
			}

			return true;
		}
		// 验证手机号码
	 	$rootScope.checkEmail = function(obj) {
			var email = $.trim(obj);			
			//如果为1开头则验证手机号码
			if (!config.checkMatch.isEmail.regStr.test(email) ) {
				return false;
			}
			return true;

		}
		//  验证表情
		$rootScope.checkEmoji = function(obj) {
			var text = $.trim(obj);	
			if (!config.checkMatch.isEmoji.regStr.test(text) ) {
				return false;
			}
			return true;

		}	
		// 验证金钱  8位整位2位小数
    	$rootScope.checkMoney = function(obj) {
			var isMoney =$.trim(obj);
			if (!config.checkMatch.isMoney.regStr.test(isMoney)){
				return false;
			}
			return true;
		}
		// 验证金钱  5位整位2位小数
    	$rootScope.checkMoney5 = function(obj) {
			var isMoney =$.trim(obj);
			if (!config.checkMatch.isMoney5.regStr.test(isMoney)){
				return false;
			}
			return true;
		}
		// 验证金钱  0-100 4位小数
    	$rootScope.checkMoney2 = function(obj) {
			var isMoney =$.trim(obj);
			if (!config.checkMatch.isMoney2.regStr.test(isMoney)){
				return false;
			}
			return true;
		}

		//密码校验
		$rootScope.checkPassword = function(obj) {
			var isPassword =$.trim(obj);
			if (!config.checkMatch.isPassword.regStr.test(isPassword)){
				return false;
			}
			return true;
		}


		$rootScope.hidePopup = function(){
			$("#errorPromte").fadeOut();
		}

		$rootScope.goBack = function(){
			// $rootScope.gobackUrl=true;
			history.go(-1);
		}

		$rootScope.redirect = function(url){
			setTimeout(function(){
				$rootScope.gobackUrl=true;
			})
			if($location.path()==url){
				$route.reload();
			}
			$location.path(url);
		}

		$rootScope.slidePage = function(url){
			window.salt.router.push({
	            id:url,
	            url:'#/'+url+"?corpid="+window.corpId,
	            anim:1,
	            needPost:false
	        }).then().catch(function(e){
	            if(e.errorCode == 1001){
	                console.log("error");
	            }
	        })
		}

		$rootScope.downloadNum=function(){
            appServices.downloadList.save({
                pageSize:10,
                pageNum:-1
            }).$promise.then(function(data){
                $rootScope.totalFileNum = data.result.totalFileNum;
            });
        }

		$rootScope.navPath = function (){
			$rootScope.locationPath = $location.path();
			$rootScope.isOrder = false;
			$rootScope.isMessage = false;
			$rootScope.isInsurance = false;
			$rootScope.isRegister = false;
			$rootScope.isBill = false;
			$rootScope.isAccount = false;
			if($rootScope.locationPath.indexOf('/order/')>=0){
				 $rootScope.downloadNum();
			}
			var path =$rootScope.locationPath.substr(0,$rootScope.locationPath.indexOf('/',1));
			if(path=="/order"){
				$rootScope.isOrder = true;	
				$rootScope.downloadNum();
			}
			if(path=="/message"){
				$rootScope.isMessage = true;	
			}
			if(path=="/Insurance"){
				$rootScope.isInsurance = true;	
			}
			if(path=="/Bill"){
				$rootScope.isBill = true;	
			}
			if(path=="/Account"){
				$rootScope.isAccount = true;	
			}
			if($rootScope.locationPath!="/login"){
				$(".header").show();
				$(".subnav").show();
			}

			if(path=="/checkIn" && $rootScope.locationPath.split('/').length!=3){
				$rootScope.isRegister = true;
			}
			

		}
		$rootScope.navPath();

		$rootScope.logOut=function() {
			appServices.logOut.save().$promise.then(function(data){
				sessionStorage.removeItem('token');
				sessionStorage.removeItem('userId');
            	$location.path('/login');
            });
		}

		$rootScope.errAlert = function (errMsg){
			$(".service-err-msg").html(errMsg);
			$("#errorPromte").removeClass("fadeInDown");
			$("#errorPromte").removeClass("fadeOutDown");
			$("#errorPromte").show().addClass("fadeInDown");
			setTimeout(function(){
				$("#errorPromte").removeClass("fadeInDown");
				$("#errorPromte").addClass("fadeOutDown").hide();
			}, 4000);
		}

		//成功弹窗
		$rootScope.successPop = function(item){
			$("#successPop").css({'top': '-999px'})
			$('#successPop').text(item);
			$('#successPop').animate({
				'top': '50%',
				'z-index':'100'	
			 },500);
			setTimeout(function(){
				$('#successPop').animate({
				'top': '-999px'	
			 },300);
			},4000)
		}
		//弹窗动画
		$rootScope.alertPop = function(item){
			var winH =$(window).height();
        	var winW = $(window).width();
				item.css({
				'position': 'fixed',
				'top': '-999px',
				'left':'50%',
				'margin-left': -item.width()/2+'px',
				'z-index':'10',
				'display':'block'
			}).animate({
				'position': 'fixed',
				'top': '0'	
			 },300);

			$('#popAlert').css({
				'height':winH,
				'width':winW+20,
				'display':'block'
			});
			$('html').css({'overflow':'hidden'});
			$rootScope.resizePop();
		}



		$rootScope.closePop = function(){
			$('#popAlert').hide();
			$('.pop').animate({
				'position': 'absolute',
				'top': '-999px'
			 },300);
			$('html').css({'overflow':'auto'});
			$(document).off("keydown");
		}

		$rootScope.resizePop=function() {
			$(window).resize(function(){
		        var winH =$(window).height();
		        var winW = $(window).width();
		        $('#popAlert').css({
					'height':winH,
					'width':winW
				});
		    });
		}
		// $('#popAlert').click(function() {
		// 	$rootScope.closePop();
		// });
		//  解决fixed 滚动条问题
		window.onscroll=function(){
		    var sl=-Math.max(document.body.scrollLeft,document.documentElement.scrollLeft);
		    document.getElementById('headerFixed').style.left=sl+'px';
		    document.getElementById('subnavFixed').style.left=sl+'px';
		};

	
			
    });






