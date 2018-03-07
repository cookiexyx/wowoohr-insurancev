angular.module('appmvc')
	.controller('OrderDeclarationMaterialCtrl', function OrderDeclarationMaterialCtrl($scope, $rootScope, appServices, $location) {
		'use strict';
		$scope.ulwidth;
	     appServices.orderDeclarationMaterial.save({

            }).$promise.then(function(data){
            	$scope.materialList = data.data.materialList;
            	for(var i = 1; i<=$scope.materialList.length;i++){
            		$scope.ulwidth = i;
            	}
            	  $scope.slide();

            })
            	 var winH =window.screen.height;
				var winW = window.screen.width;
				 var marginLeft = (winW-816)/2;
           		 $scope.slide = function(){
				
			 
				$("#orderDeclarWrap").height(winH);
				$("#orderDeclarWrap").width(winW);
				 $('.img ').width($scope.ulwidth*winW);
				// 下一个按钮
			}
				$scope.num = 0;
				$scope.next = function(){

					$scope.num++;
					if($scope.num>= $scope.ulwidth ){
					
						$scope.num = $scope.num-1;
 						 $rootScope.successPop('已经是最后一张了');
					}
			
					if($scope.num<$scope.ulwidth){
						$('.img').stop().animate({
						left: -$scope.num * winW
						}, 300);
					}
				}
				// 上一个按钮
				$scope.prev = function(){
						$scope.num--;
					if($scope.num>-1){
						$('.img').stop().animate({
						left: -$scope.num * winW
					}, 300);

					}
					if($scope.num == -1){
						 $rootScope.successPop('已经是第一张了');
						$scope.num = 0;
						
					}

				}

					setTimeout(function(){
						$('#orderDeclarWrap').show();
						$("#orderDeclarWrap .img .imgList").css({
						'margin-left': marginLeft+'px',
						'margin-right': marginLeft+'px',
					});
					},50)
					 
				
		
});
