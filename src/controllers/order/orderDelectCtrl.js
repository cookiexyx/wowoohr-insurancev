angular.module('appmvc')
	.controller('OrderDelectCtrl', function OrderDelectCtrl($scope, $rootScope, appServices, $location, pagenation,$timeout) {
		'use strict';
        // 初始化数据
		$scope.nowPage=1;
		$scope.pageNum=1;
        $scope.pageSize=100;
        //  搜索框 变量
        $scope.name2="";
        $scope.name="";
        //筛选 产品类型 变量
        $scope.statusCheckedCopy = [];
   		$scope.statusCheckedKeyCopy = [];
   		//筛选 缴纳月份 变量
   		// $scope.payMonthEndCopy = "";
   		//筛选 缴纳城市 变量
   		$scope.cityCheckedCopy = [];
    	$scope.cityCheckedKeyCopy = [];
    	$(".orderincrease").hide();

    	$scope.goBackFun=function(){
            //返回存搜索位置
            $scope.orderDeleteList={
                name:$scope.name,
                statusCheckedKey:$scope.statusCheckedKeyCopy,
                statusChecked:$scope.statusCheckedCopy,
                cityCheckedKey:$scope.cityCheckedKeyCopy,
                cityChecked:$scope.cityCheckedCopy,
                select_all:$scope.ctrlScope.select_all,
                checkedShow:$scope.checkedShow,
                checkTitleNum:$scope.checkTitleNum,
                checked:$scope.checkedIdList,
                pageNum:$scope.pageNum,
                nowPage:$scope.nowPage,
                scrollTop:$(window).scrollTop()
            }
            sessionStorage.setItem('orderDelete',JSON.stringify($scope.orderDeleteList));
        }

        // 进入页面获取数据
        $scope.init=function(){
    		appServices.orderDelete.save({
    			pageNum: 1,
    			pageSize: $scope.pageSize
    		}).$promise.then(function(data) {
                $scope.list = data.result.list;
                $scope.totalCount = data.result.totalCount;
                $scope.totalPage = data.result.pages;
                $scope.orderLength = angular.copy(data.result.totalCount);
                //checkbox 初始化
                $rootScope.closePop();
                $scope.ctrlScope = $scope;     // 解决ng-if时ng-model绑定问题
                $scope.ctrlScope.select_all=false;
                $scope.checkedShow = true;
                $scope.checkTitleNum = 0;
                $scope.checkedIdList = [];
			    $scope.checkedApplyIdList = [];
			    $scope.checkedunpaidOrderIdList = [];
			    //返回保留搜索条件和所在位置
                if(!$rootScope.gobackUrl&&sessionStorage.getItem('orderDelete')){
                	$scope.img_url=[];
                    $("#loading").show();
                    var localList=JSON.parse(sessionStorage.getItem('orderDelete'));
                    sessionStorage.removeItem('orderDelete');
                    $scope.ctrlScope = $scope;
                    $scope.name2=localList.name;
                    $scope.name=localList.name;
                    $scope.statusCheckedKeyCopy=localList.statusCheckedKey;
                    $scope.statusCheckedCopy=localList.statusChecked;
                    $scope.cityCheckedKeyCopy=localList.cityCheckedKey;
                    $scope.cityCheckedCopy=localList.cityChecked;
                    $scope.ctrlScope.select_all=localList.select_all;
                    $scope.checkedShow = localList.checkedShow;
                    $scope.checkTitleNum = localList.checkTitleNum;
                    $scope.checkedIdList = localList.checked;
                    $scope.pageNum = localList.pageNum;
                    $scope.nowPage = localList.nowPage;
                    $scope.listArr = [];
        			var i =1;
                    for(var f=1;f<$scope.pageNum+1;f++){
                        appServices.orderDelete.save({
                            pageNum:f,
                            pageSize:$scope.pageSize,
                            nameOrIdCard:localList.name,
                            productType:localList.statusCheckedKey,
                            cityList:localList.cityCheckedKey
                        }).$promise.then(function(data){
                            $("#loading").show();
                            $scope.listArr[data.result.pageNum] = data.result.list;
			                if(i == localList.pageNum){
			                    $scope.list = [];
			                    angular.forEach($scope.listArr, function(data,index,array){
			                        $scope.list = $scope.list.concat(data);
			                    });
			                }
                            if(i==$scope.pageNum){
                                $scope.totalPage = data.result.pages;
                                $scope.totalCount = data.result.totalCount;
                                angular.forEach($scope.list , function (i) {
                                    var index='';
                                    angular.forEach($scope.checkedIdList, function (j) {
                                        if(j.id==i.id){
                                            index=j;
                                        }
                                    });
                                    if(index){
                                        i.checked=true;
                                    }else{
                                        i.checked=false;
                                    }
                                })
								$scope.filtershow = false;
								$(".class-silde-fixed").css("left", "-303px");
								$(".nav-silde-fixed").css("left", "-230px");
								$("body").removeAttr("style");
								$(".nav-silde-fixed-bj").hide();
								$(document).off("keydown");
                                
                            }
                            $timeout(function(){
                                $(".orderincrease").show();
                                $(window).scrollTop(localList.scrollTop);
                                $("#loading").hide();
                            });
                            i++;
                        })
                    }
                }else{
                    $(".orderincrease").show();
                    sessionStorage.removeItem('orderDelete');
                }
                
    		});
        }
        $scope.init();

		//查询 
		$scope.sendDate = function(page) {
			$scope.nowPage = 1;
			$scope.page = page;
			$scope.name=angular.copy($scope.name2);
			
			appServices.orderDelete.save({
				pageNum: $scope.page,
				pageSize: $scope.pageSize,
				nameOrIdCard:$scope.name,
				productType:$scope.statusCheckedKeyCopy,
                // orderMonth:$scope.payMonthEndCopy,
                cityList:$scope.cityCheckedKeyCopy
			}).$promise.then(function(data) {
				$scope.list = data.result.list;
                $scope.totalCount = data.result.totalCount;
                $scope.totalPage = data.result.pages;
                //checkbox 初始化
                $rootScope.closePop();
                $scope.ctrlScope = $scope;     // 解决ng-if时ng-model绑定问题
                $scope.ctrlScope.select_all=false;
                $scope.checkedShow = true;
                $scope.checkTitleNum = 0;
                $scope.checkedIdList = [];
			    $scope.checkedApplyIdList = [];
			    $scope.checkedunpaidOrderIdList = [];
                //  减员完成 (就是删除) 显示正确提示
                if($scope.totalCount==0){
                    appServices.orderDelete.save({
                        pageNum:1,
                        pageSize: $scope.pageSize
                    }).$promise.then(function(data){
                        $scope.orderLength=angular.copy(data.result.totalCount);
                    });
                }

				$scope.filtershow = false;
				$(".class-silde-fixed").css("left", "-303px");
				$(".nav-silde-fixed").css("left", "-230px");
				$("body").removeAttr("style");
				$(".nav-silde-fixed-bj").hide();
				$(document).off("keydown");
			})
		}

		// 侧边栏 进入页面获取数据
	    appServices.increaseSidebar.save({
	        screenType:"2"
	    }).$promise.then(function(data){
	        $scope.citysList = data.result.cityList; 
	        $scope.productStatusList = data.result.productType;
	        angular.forEach($scope.citysList , function (i) {
	            i.cityChecked=false;
	        })
	        angular.forEach($scope.productStatusList , function (i) {
	            i.statusChecked=false;
	        })
	    });

        //搜索框 模糊查询
        $("#tags_dropdown").hide();
        $scope.changeFun=function(){
            if(!$scope.name2){
                $("#tags_dropdown").hide(); 
            }else{
                appServices.orderDeleteSearch.save({
                    nameOrIdCard:$scope.name2
                }).$promise.then(function(data){
                    $scope.nameList = data.result.nameList;
                    if($scope.nameList.length<1){
                       $("#tags_dropdown").hide(); 
                    }else{
                        $("#tags_dropdown").show();
                    }
                });
            }
        }
        $scope.listClick=function(name){
            $scope.name2=name;
            $scope.sendDate(1);
        };
        $(document).bind('click', function(e) {
          $("#tags_dropdown").hide();
        });
        // 点击回车 搜索 
        $("body").on('keydown','.inputName',function(event){
            if(event.keyCode == 13){
                $scope.sendDate(1);
            }
        })

        //checkBox 全选
	    $scope.checkedIdList = [];
	    $scope.checkedApplyIdList = [];
	    $scope.checkedunpaidOrderIdList = [];
	    $scope.selectAll = function (select_all) {
	        $scope.ctrlScope.select_all=select_all;
	        if(select_all) {
	            $scope.checked = [];
	            angular.forEach($scope.list, function (i,index) {
	            	if(index < 100)
	            	{
		                i.checked = true;
		                $scope.checkedIdList.push({id:i.id});
		                $scope.checkedApplyIdList.push({applyId:i.applyId});
		                $scope.checkedunpaidOrderIdList.push({unpaidOrderId:i.unpaidOrderId});
		            }
		            else
	                {
	                    return false;
	                }
	            })
	        }else{
	            angular.forEach($scope.list, function (i) {
	                i.checked = false;
	                $scope.checkedIdList = [];
				    $scope.checkedApplyIdList = [];
				    $scope.checkedunpaidOrderIdList = [];
	            })
	        }
	         $scope.checkTitleNum = $scope.checkedIdList.length;
	        $scope.addOrderCheck();
	    };
	    //checkBox 单选
	    $scope.selectOne = function () {
	        $scope.checkedIdList = [];
		    $scope.checkedApplyIdList = [];
		    $scope.checkedunpaidOrderIdList = [];
	        angular.forEach($scope.list, function (i) {
	            var index;
	            angular.forEach($scope.checkedIdList, function (j) {
	                if(j.id==i.id){
	                    index=j;
	                }
	            });
	            if(i.checked && !index) {
	            	$scope.checkedIdList.push({id:i.id});
	            	$scope.checkedApplyIdList.push({applyId:i.applyId});
	                $scope.checkedunpaidOrderIdList.push({unpaidOrderId:i.unpaidOrderId});
	            }else if(!i.checked && index){
	                $scope.checkedIdList.splice(index, 1);
	                $scope.checkedApplyIdList.splice(index, 1);
	                $scope.checkedunpaidOrderIdList.splice(index, 1);
	            };
	        })
	        if ($scope.list.length === $scope.checkedIdList.length) {
	            $scope.ctrlScope.select_all = true;
	        } else {
	            $scope.ctrlScope.select_all = false;
	        }
	        $scope.checkTitleNum = $scope.checkedIdList.length;
	        $scope.addOrderCheck();
	    }
	    //没选中checkbox禁用
	    $scope.addOrderCheck = function(){
	        if($scope.checkedIdList.length>0){
	            $scope.checkedShow = false;
	        }else{
	            $scope.checkedShow = true;
	        }
	    }
	    //点击“增员完成”按钮
	    $scope.addOrder = function(id,applyId,unpaidOrderId){
	        if(id!=0){
	            $scope.checkedIdList.push({id:id});
            	$scope.checkedApplyIdList.push({applyId:applyId});
                $scope.checkedunpaidOrderIdList.push({unpaidOrderId:unpaidOrderId});
	            $scope.allTip=false;
	        }else{
	            $scope.allTip=true;
	        }
	        var item = $('.addsucc-pop');
	        $rootScope.alertPop(item);
	    }
	    // 点击 “增员完成”弹框 确认按钮
	    $scope.succOrder = function(){
	        appServices.deleteSuccess.save({
	            idList:$scope.checkedIdList,
	            applyIdList:$scope.checkedApplyIdList,
	            unpaidOrderIdList:$scope.checkedunpaidOrderIdList    
	        }).$promise.then(function (data) {
	            $rootScope.successPop('操作成功');
	            $rootScope.closePop();
            	$scope.sendDate(1);
	        });
	    }

        // 清除checkbox选中
		$scope.clearSelct = function(arr, obj) {
			var length = arr.length;
			for(var i = 0; i < arr.length; i++) {
				if(arr[i] == obj) {
					if(i == 0) {
						arr.shift(); //删除并返回数组的第一个元素
						return arr;
					} else if(i == length - 1) {
						arr.pop(); //删除并返回数组的最后一个元素
						return arr;
					} else {
						arr.splice(i, 1); //删除下标为i的元素
						return arr;
					}
				}
			}
		}

		//更多筛选  产品类型
	    $scope.statusChecked = [];
	    $scope.statusCheckedKey = [];
	    $scope.selectProduct = function (value,index) {
	        $scope.statusChecked = [];
	        $scope.statusCheckedKey = [];
	        angular.forEach($scope.productStatusList , function (i) {
	            var index = $scope.statusChecked.indexOf(i);
	            if(i.statusChecked && index === -1) {
	                $scope.statusChecked.push(i);
	                $scope.statusCheckedKey.push(parseInt(i.key));
	            } else if (!i.statusChecked && index !== -1){
	                $scope.statusChecked.splice(index, 1);
	                $scope.statusCheckedKey.splice(index, 1);
	            };
	        })
	    }
	    //清除  产品类型
	    $scope.clearStatus = function(arr,obj,index,sidebar){
	        if(sidebar){
	            angular.forEach($scope.productStatusList , function (i) {
	                if($scope.statusChecked[index].key==i.key){
	                    i.statusChecked=false;
	                }
	            })
	            $scope.statusChecked = $scope.clearSelct(arr,obj);
	            $scope.statusCheckedKey.splice(index, 1);
	        }else{
	            angular.forEach($scope.productStatusList , function (i) {
	                if($scope.statusCheckedCopy[index].key==i.key){
	                    i.statusChecked=false;
	                }
	            })
	            $scope.statusCheckedCopy = $scope.clearSelct(arr,obj);
	            $scope.statusCheckedKeyCopy.splice(index, 1);
	            $scope.sendDate(1);
	        }
	    }

	    //更多筛选  缴纳月份 
	    $('#datetimepickerMonthEnd').datetimepicker({
	        useCurrent: false,   // 当前时间不会选中
	        format: 'YYYY-MM',    // 默认显示月
	        locale: 'zh-cn',
	        ignoreReadonly: true,    // 禁止填写
	        minDate:'2017-01',       //可选范围2017-01至2050-12  
	        maxDate:'2050-12'
	    }).on('dp.change', function(ev){
	       var result = new moment(ev.date).format('YYYY-MM');   // 正确的日期格式
	       $scope.payMonthEnd = result;  
	       $scope.$apply();
	    });

	    $scope.monthBlur=function(id,value){
	        $scope[value]=$("#"+id).val();
	    }
	    // 清除 缴纳月
	    $scope.clearMonth = function(value){
	        $('#datetimepickerMonthEnd').val('');
	        if(value=='sidebar'){
	            $scope.payMonthEnd="";
	        }else{
	            $scope.payMonthEndCopy="";
	            $scope.sendDate(1);
	        }
	    }

	    //更多筛选  缴纳城市 
	    $scope.cityChecked = [];
	    $scope.cityCheckedKey = [];
	    $scope.selectCity = function () {
	        $scope.cityChecked = [];
	        $scope.cityCheckedKey = [];
	        angular.forEach($scope.citysList , function (i) {
	            var index = $scope.cityChecked.indexOf(i);
	            if(i.cityChecked && index === -1) {
	                $scope.cityChecked.push(i);
	                $scope.cityCheckedKey.push(parseInt(i.key));
	            } else if (!i.cityChecked && index !== -1){
	                $scope.cityChecked.splice(index, 1);
	                $scope.cityCheckedKey.splice(index, 1);
	            };
	        })
	    }
	    //清除  缴纳城市 
	    $scope.clearCity = function(arr,obj,index,sidebar){
	        if(sidebar){
	            angular.forEach($scope.citysList , function (i) {
	                if($scope.cityChecked[index].key==i.key){
	                    i.cityChecked=false;
	                }
	            })
	            $scope.cityChecked = $scope.clearSelct(arr,obj);
	            $scope.cityCheckedKey.splice(index, 1);
	        }else{
	            angular.forEach($scope.citysList , function (i) {
	                if($scope.cityCheckedCopy[index].key==i.key){
	                    i.cityChecked=false;
	                }
	            })
	            $scope.cityCheckedCopy = $scope.clearSelct(arr,obj);
	            $scope.cityCheckedKeyCopy.splice(index, 1);
	            $scope.sendDate(1);
	        }
	    }
	    // 确认
	    $scope.save = function(){
	        // 缴纳月份 
	        // $scope.payMonthEndCopy = angular.copy($scope.payMonthEnd);
	        //  缴纳城市
	        $scope.cityCheckedCopy = angular.copy($scope.cityChecked);
	        $scope.cityCheckedKeyCopy = angular.copy($scope.cityCheckedKey);
	        // 产品类型
	        $scope.statusCheckedCopy = angular.copy($scope.statusChecked);
	        $scope.statusCheckedKeyCopy = angular.copy($scope.statusCheckedKey);
	        $scope.sendDate(1);
	    }
	    // 取消筛选
	    $scope.clearSearch=function(){
	        // 缴纳月份 
	        // $scope.payMonthEndCopy="";
	        // $('#datetimepickerMonthEnd').val('');
	        //  缴纳城市
	        $scope.cityCheckedCopy = [];
	        $scope.cityCheckedKeyCopy = [];
	        angular.forEach($scope.citysList , function (i) {
	            i.cityChecked=false;
	        })
	        // 产品类型
	        $scope.statusCheckedCopy = [];
	        $scope.statusCheckedKeyCopy = [];
	        angular.forEach($scope.productStatusList , function (i) {
	            i.statusChecked=false;
	        })
	        $scope.sendDate(1);
	    }

	    //导出EXCEL
	    $scope.downloadOrder = function(){
	        appServices.addOrderDownload.save({
	            downloadType:2,
	            paramContentForm:{
	                nameOrIdCard:$scope.name,
					productType:$scope.statusCheckedKeyCopy,
                	// orderMonth:$scope.payMonthEndCopy,
                	cityCode:$scope.cityCheckedKeyCopy,
	                flagState:""     
	            }
	        }).$promise.then(function(data){
	            var item = $('.download-pop');
	            $rootScope.alertPop(item);
	        });  
	    }
	    $scope.refreshDownload=function() {
	        $scope.closePop();
	        $rootScope.downloadNum();
	    }

		//侧边栏 点击弹出效果
		$scope.filtershow = false;
		$scope.filterShow = function() {
			//  **************选中复位************
	        // 缴纳月份 
	        // $scope.payMonthEnd = angular.copy($scope.payMonthEndCopy);
	        //  缴纳城市
	        $scope.cityChecked = angular.copy($scope.cityCheckedCopy);
	        $scope.cityCheckedKey = angular.copy($scope.cityCheckedKeyCopy);
	        // 产品类型
	        $scope.statusChecked = angular.copy($scope.statusCheckedCopy);
	        $scope.statusCheckedKey = angular.copy($scope.statusCheckedKeyCopy);

	        angular.forEach($scope.citysList , function (i) {
	            i.cityChecked=false;
	            if($scope.cityCheckedCopy.length>0){
	                angular.forEach($scope.cityCheckedCopy , function (j) {
	                    if(i.key==j.key){
	                        i.cityChecked=true;
	                    }
	                })
	            }
	        })
	        angular.forEach($scope.productStatusList , function (i) {
	            i.statusChecked=false;
	            if($scope.statusCheckedCopy.length>0){
	                angular.forEach($scope.statusCheckedCopy , function (j) {
	                    if(i.key==j.key){
	                        i.statusChecked=true;
	                    }
	                })
	            }
	        })

	        // 侧边栏 效果
			$scope.filtershow = !$scope.filtershow;
			if($scope.filtershow == true) {
				$("body").css("overflow", "hidden");
				$(".nav-silde-fixed-bj").show();
				$(".nav-silde-fixed").css("left", "0");
			}

			// 解决键盘 delete快捷键 删除问题 
	        setTimeout(function(){
	            $scope.datetimepickerMonthEndArray = [];
	            $("#datetimepickerMonthEnd").on("click",function(){
	                if($("#datetimepickerMonthEnd").val().toString().length > 0 && $("#datetimepickerMonthEnd").val() != 'Invalid date' ){
	                    $scope.datetimepickerMonthEndArray.push($("#datetimepickerMonthEnd").val());
	                }
	            });
	            $("#datetimepickerMonthEnd").on("keydown",function(event){ 
	                if(event.keyCode == 46){
	                    $("#datetimepickerMonthEnd").val($scope.datetimepickerMonthEndArray[$scope.datetimepickerMonthEndArray.length-1]);
	                    $scope.payMonthEnd = $scope.datetimepickerMonthEndArray[$scope.datetimepickerMonthEndArray.length-1];
	                    $scope.$apply();
	                    event.preventDefault();
	                }
	            });
	        },300);
		}
		$('.nav-silde-fixed>ul>li').click(function() {
			$('.nav-silde-fixed>ul>li').removeClass('active');
			$('.nav-silde-fixed>ul>li .class-silde-fixed').css("left", "-303px");
			$(this).find('.class-silde-fixed').css("left", "230px");
			$(this).addClass('active');
		});
        // 关闭 侧边栏
		$scope.closeNavLarye = function() {
			$scope.filtershow = false;
			$(".class-silde-fixed").css("left", "-303px");
			$(".nav-silde-fixed").css("left", "-230px");
			$("body").removeAttr("style");
			$(".nav-silde-fixed-bj").hide();
			$(document).off("keydown");
		}

		// 下拉刷新
		$(window).scroll(function() {
			if(parseInt($(window).scrollTop()) + parseInt($(window).height()) == parseInt($(document).height()) && $scope.nowPage < $scope.totalPage) {
				$scope.pageNum=$scope.nowPage+1;
				appServices.orderDelete.save({
					pageNum: $scope.pageNum,
					pageSize: $scope.pageSize,
					nameOrIdCard:$scope.name,
					productType:$scope.statusCheckedKeyCopy,
	                // orderMonth:$scope.payMonthEndCopy,
	                cityList:$scope.cityCheckedKeyCopy
				}).$promise.then(function(data) {
					$scope.list = $scope.list.concat(data.result.list);
					$scope.nowPage = $scope.nowPage + 1;
					$scope.totalCount = data.result.totalCount;
                	$scope.totalPage = data.result.pages;
				});
			} else if($scope.nowPage == $scope.totalPage && parseInt($(window).scrollTop()) + parseInt($(window).height()) == parseInt($(document).height())) {
				$rootScope.successPop('数据已加载完毕');
				$scope.nowPage = $scope.nowPage + 1;
			}
		})
		//跳转到详情页
        $scope.goDetail=function(id){
            $scope.goBackFun();
            $location.path('order/delectDetail/'+id);
        }
        //跳转到下载列表
        $scope.goDownload=function(){
            $scope.goBackFun();
            $location.path('order/delectDownload');
        }
	});