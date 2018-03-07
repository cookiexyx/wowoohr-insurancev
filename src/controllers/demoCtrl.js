angular.module('appmvc')
	.controller('DemoCtrl', function DemoCtrl($scope, $rootScope, appServices, $location, pagenation) {
		'use strict';
		$rootScope.index = true;
		$rootScope.serviceErrMsg = "aaa";

	 	$scope.renderPage = function(page, evt){
	 		console.log(page);
	 	}

	 	// appServicesNew.demo.save().$promise.then(function(data){
   //         console.log(data);
   //      });

	 	pagenation.init(6, $scope.renderPage);

	 	$scope.pageGoto = function(){
	 		pagenation.goto($scope.page);
	 		$scope.renderPage($scope.page);

	 	}


	 

	 	$('[data-toggle="tooltip"]').tooltip();

	 	// $('.timepicker').timepicker({
	 	// 	timeFormat: 'HH:mm',
		 //    interval: 30,
		 //    minTime: '08:00',
		 //    maxTime: '23:00',
		 //    startTime: '08:00',
		 //    dynamic: true,
		 //    dropdown: true,
		 //    scrollbar: true
	 	// });
	 	// $scope.current = 5;


	 	// $('#datetimepicker9').datetimepicker({
 		// 	viewMode: 'years',
   //          format: 'YYYY-MM',
   //          locale:'zh-cn'
   //      });

        $scope.handleFiles = function(files) {
			if (window.FileReader) {
			    $scope.getAsText(files[0]);
			  } else {
			  	$rootScope.serviceErrMsg = "插件不支持";
			}
		}

		$scope.getAsText = function(fileToRead) {
			var reader = new FileReader();
			reader.onload = $scope.loadHandler;
			reader.onerror = $scope.errorHandler;     
			reader.readAsText(fileToRead);
		}

		$scope.loadHandler = function(event) {
			var csv = event.target.result;
			$scope.drawOutput(new CSV(csv).parse());             
		}

		$scope.errorHandler = function(evt) {
			if(evt.target.error.name == "NotReadableError") {
				alert("Canno't read file !");
			}
		}

		// $(".dropdown").each(function(){
  //           var height = $(this).find(".btn").height();
  //           var width = $(this).find(".btn").width();
  //           $(this).css({
  //               "height":height,
  //               "width":width + 30
  //           });
  //       })
// 回调弹窗
		$scope.succPop = function(){
			  	$rootScope.successPop('alert');
		}
	 	  //弹窗样式
	    $scope.pop = function(){
	        var div = $('.pop');
	        $rootScope.alertPop(div);
	    }


		$scope.drawOutput = function (lines){	
			document.getElementById("output").innerHTML = "";
			var table = document.createElement("table");
			for (var i = 0; i < lines.length; i++) {
				var row = table.insertRow(-1);
				for (var j = 0; j < lines[i].length; j++) {
					var firstNameCell = row.insertCell(-1);
					firstNameCell.appendChild(document.createTextNode(lines[i][j]));
				}
			}
			document.getElementById("output").appendChild(table);
		}

		$scope.slidePop = function() {
			var win = location.href.split("?")[0];
			var dingUrl = win+"?corpid="+window.corpId+"#/index";
			DingTalkPC.ready(function() {
				DingTalkPC.biz.util.openSlidePanel({
				    url: dingUrl, //打开侧边栏的url
				    title: 'title', //侧边栏顶部标题
				    onSuccess : function(result) {
				       /*
				            调用biz.navigation.quit接口进入onSuccess, result为调用biz.navigation.quit传入的数值
				        */
				        alert("成功");
				    },
				    onFail : function() {
				        /*
				            tips:点击右上角上角关闭按钮会进入onFail
				         */
				    }
				})
            })
		}
});









