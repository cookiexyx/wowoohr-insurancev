angular.module('appmvc')
	.controller('OrderIncreaseCtrl', function OrderIncreaseCtrl($scope, $rootScope, appServices, $location,pagenation,$timeout) {
		'use strict';
        $scope.pageSize=100;
        $scope.productType=-1;
        $scope.nowPage=1;
        $scope.cityCheckedKey2=[];
        $scope.cityChecked2=[];
        $scope.statusCheckedKey2=[];
        $scope.statusChecked2=[];
        $scope.beginDate2="";
        $scope.endDate2="";
        $scope.payMonth2="";
        $scope.orderCheckedCopy = {};
        $scope.orderCheckedKeyCopy = '';
        $scope.orderCheckedIsRead = -1;
        $scope.ulwidth;
        $scope.error=[];
        $scope.i=0;
        $scope.name2="";
        $scope.name="";
        $scope.img_url = [];
        $scope.orderIncreaseList={};
        $scope.pageNum=1;
        $scope.noApplyCheckedKey2=[];
        $scope.noApplyChecked2=[];
        var img_url_array = {};
        $(".orderincrease").hide();

        $scope.goBackFun=function(){
            //返回存搜索位置
            $scope.orderIncreaseList={
                name:$scope.name,
                statusCheckedKey:$scope.statusCheckedKey2,
                beginDate:$scope.beginDate2,
                endDate:$scope.endDate2,
                cityCheckedKey:$scope.cityCheckedKey2,
                statusChecked:$scope.statusChecked2,
                cityChecked:$scope.cityChecked2,
                payMonth:$scope.payMonth2,
                orderCheckedKey:$scope.orderCheckedKeyCopy,
                orderChecked:$scope.orderCheckedCopy,
                select_all:$scope.ctrlScope.select_all,
                checkedShow:$scope.checkedShow,
                checkTitleNum:$scope.checkTitleNum,
                noApplyCheckedKey:$scope.noApplyCheckedKey2,
                noApplyChecked:$scope.noApplyChecked2,
                checked:$scope.checked,
                pageNum:$scope.pageNum,
                nowPage:$scope.nowPage,
                scrollTop:$(window).scrollTop()
            }
            sessionStorage.setItem('orderIncrease',JSON.stringify($scope.orderIncreaseList));
        }

        $scope.init=function(){
            appServices.orderIncrease.save({
                pageNum:1,
                pageSize: $scope.pageSize
            }).$promise.then(function(data){
                $scope.list = data.result.list;
                //图片 url
                angular.forEach(data.result.list, function(data,index,array){
                    img_url_array = {
                        "idCardPicUrlAMap":data.material.idCardPicUrlAMap.value,
                        "idCardPicUrlBMap":data.material.idCardPicUrlBMap.value
                    }
                    if(data.material.hkPicUrlOfHomepageMap)
                    {
                       img_url_array.hkPicUrlOfHomepageMap = data.material.hkPicUrlOfHomepageMap.value
                    }
                    if(data.material.hkPicUrlOfOwnpageMap)
                    {
                        img_url_array.hkPicUrlOfOwnpageMap = data.material.hkPicUrlOfOwnpageMap.value
                    }
                    if(data.material.hkPicUrlOfHeaderpageMap)
                    {
                        img_url_array.hkPicUrlOfHeaderpageMap = data.material.hkPicUrlOfHeaderpageMap.value
                    }
                    $scope.img_url.push(img_url_array);
                });
                $scope.declarationMaterial();
                $scope.totalPage = data.result.pages;
                $scope.totalCount = data.result.totalCount;
                $scope.orderLength=angular.copy(data.result.totalCount);
                $scope.ctrlScope = $scope;
                for(var i = 1; i<=$scope.list.length;i++){
                   $scope.ulwidth = i;
                }
                //初始化
                $rootScope.closePop();
                $scope.ctrlScope.select_all=false;
                $scope.checkedShow = true;
                $scope.checkTitleNum = 0;
                $scope.checked = [];
                //返回保留搜索条件和所在位置
                if(!$rootScope.gobackUrl&&sessionStorage.getItem('orderIncrease')){
                    $scope.img_url=[];
                    $("#loading").show();
                    var localList=JSON.parse(sessionStorage.getItem('orderIncrease'));
                    sessionStorage.removeItem('orderIncrease');
                    $scope.ctrlScope = $scope;
                    $scope.name2=localList.name;
                    $scope.name=localList.name;
                    $scope.statusCheckedKey2=localList.statusCheckedKey;
                    $scope.cityCheckedKey2=localList.cityCheckedKey;
                    $scope.statusChecked2=localList.statusChecked;
                    $scope.cityChecked2=localList.cityChecked;
                    $scope.payMonth2=localList.payMonth;
                    $scope.beginDate2=localList.beginDate;
                    $scope.endDate2=localList.endDate;
                    $scope.orderCheckedKeyCopy=localList.orderCheckedKey;
                    $scope.orderCheckedCopy=localList.orderChecked;
                    $scope.ctrlScope.select_all=localList.select_all;
                    $scope.checkedShow = localList.checkedShow;
                    $scope.checkTitleNum = localList.checkTitleNum;
                    $scope.noApplyCheckedKey2=localList.noApplyCheckedKey;
                    $scope.noApplyChecked2=localList.noApplyChecked;
                    $scope.checked = localList.checked;
                    $scope.pageNum = localList.pageNum;
                    $scope.nowPage = localList.nowPage;
                    $scope.listArr = [];
                    var i =1;
                    for(var f=1;f<$scope.pageNum+1;f++){
                        appServices.orderIncrease.save({
                            pageNum:f,
                            pageSize:$scope.pageSize,
                            name:localList.name,
                            productType:localList.statusCheckedKey,
                            beginDate:localList.beginDate,
                            endDate:localList.endDate,
                            city:localList.cityCheckedKey,
                            noApply:localList.noApplyCheckedKey
                        }).$promise.then(function(data){
                            $("#loading").show();
                            $scope.listArr[data.result.pageNum] = data.result.list;
                            if(i == localList.pageNum){
                                $scope.list = [];
                                angular.forEach($scope.listArr, function(data,index,array){
                                    $scope.list = $scope.list.concat(data);
                                });
                            }
                            // 图片 url
                            angular.forEach(data.result.list, function(data,index,array){
                                img_url_array = {
                                    "idCardPicUrlAMap":data.material.idCardPicUrlAMap.value,
                                    "idCardPicUrlBMap":data.material.idCardPicUrlBMap.value
                                }
                                if(data.material.hkPicUrlOfHomepageMap)
                                {
                                   img_url_array.hkPicUrlOfHomepageMap = data.material.hkPicUrlOfHomepageMap.value
                                }
                                if(data.material.hkPicUrlOfOwnpageMap)
                                {
                                    img_url_array.hkPicUrlOfOwnpageMap = data.material.hkPicUrlOfOwnpageMap.value
                                }
                                if(data.material.hkPicUrlOfHeaderpageMap)
                                {
                                    img_url_array.hkPicUrlOfHeaderpageMap = data.material.hkPicUrlOfHeaderpageMap.value
                                }
                                $scope.img_url.push(img_url_array);
                            });
                            if(i==$scope.pageNum){
                                $scope.totalPage = data.result.pages;
                                $scope.totalCount = data.result.totalCount;
                                angular.forEach($scope.list , function (i) {
                                    var index='';
                                    angular.forEach($scope.checked, function (j) {
                                        if(j.id==i.orderId){
                                            index=j;
                                        }
                                    });
                                    if(index){
                                        i.checked=true;
                                    }else{
                                        i.checked=false;
                                    }
                                })
                                $scope.filtershowIf = false;
                                $scope.declarationMaterial();
                                //初始化
                                $rootScope.closePop();
                                // 时间插件重置
                                $('#datetimepicker2').data("DateTimePicker").minDate('2017-01-01');
                                $('#datetimepicker1').data("DateTimePicker").maxDate('2050-12-31');
                                
                                $(".class-silde-fixed").css("left","-303px");
                                $(".nav-silde-fixed").css("left","-230px");
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
                    sessionStorage.removeItem('orderIncrease');
                }
            });
        }
        $scope.init();

        appServices.increaseSidebar.save({
            screenType:"1"
        }).$promise.then(function(data){
            $scope.productStatusList = data.result.productType;
            $scope.citysList = data.result.cityList;
            $scope.noApplyList = data.result.insuranceType;
            angular.forEach($scope.citysList , function (i) {
                i.cityChecked=false;
            });
            angular.forEach($scope.productStatusList , function (i) {
                i.statusChecked=false;
            });
            $scope.orderIsReadList = data.result.isRead;
            angular.forEach($scope.noApplyList , function (i) {
                i.noApplyChecked=false;
            })
        });
        
           //查询 
        $scope.sendDate=function(page){
            $scope.page=page;
            $scope.nowPage=1;
            $scope.name=angular.copy($scope.name2);
            // 解决加密问题
            if($scope.orderCheckedKeyCopy == "")
            {
                $scope.orderCheckedIsRead = -1;
            }
            else
            {
                $scope.orderCheckedIsRead = $scope.orderCheckedKeyCopy;
            }
            appServices.orderIncrease.save({
                pageNum:$scope.page,
                pageSize: $scope.pageSize,
                name:$scope.name,
                productType:$scope.statusCheckedKey2,
                beginDate:$scope.beginDate2,
                endDate:$scope.endDate2,
                // payMonth:$scope.payMonth2,
                city:$scope.cityCheckedKey2,
                isRead:$scope.orderCheckedIsRead,
                insuranceType:$scope.noApplyCheckedKey2
            }).$promise.then(function(data){
            	$scope.list = data.result.list;
                //图片 url
                $scope.img_url = [];
                angular.forEach($scope.list, function(data,index,array){
                    img_url_array = {
                        "idCardPicUrlAMap":data.material.idCardPicUrlAMap.value,
                        "idCardPicUrlBMap":data.material.idCardPicUrlBMap.value
                    }
                    if(data.material.hkPicUrlOfHomepageMap)
                    {
                       img_url_array.hkPicUrlOfHomepageMap = data.material.hkPicUrlOfHomepageMap.value
                    }
                    if(data.material.hkPicUrlOfOwnpageMap)
                    {
                        img_url_array.hkPicUrlOfOwnpageMap = data.material.hkPicUrlOfOwnpageMap.value
                    }
                    if(data.material.hkPicUrlOfHeaderpageMap)
                    {
                        img_url_array.hkPicUrlOfHeaderpageMap = data.material.hkPicUrlOfHeaderpageMap.value
                    }
                    $scope.img_url.push(img_url_array);
                });
            	$scope.totalPage = data.result.pages;
                $scope.totalCount = data.result.totalCount;
                if($scope.totalCount==0){
                    appServices.orderIncrease.save({
                        pageNum:1,
                        pageSize: $scope.pageSize
                    }).$promise.then(function(data){
                        $scope.orderLength=angular.copy(data.result.totalCount);
                    });
                }
                $scope.filtershowIf = false;
                $scope.declarationMaterial();
                //初始化
                $rootScope.closePop();
                $scope.ctrlScope = $scope;
                $scope.ctrlScope.select_all=false;
                $scope.checkedShow = true;
                $scope.checkTitleNum = 0;
                $scope.checked = [];
                // 时间插件重置
                $('#datetimepicker2').data("DateTimePicker").minDate('2017-01-01');
                $('#datetimepicker1').data("DateTimePicker").maxDate('2050-12-31');
                
                $(".class-silde-fixed").css("left","-303px");
                $(".nav-silde-fixed").css("left","-230px");
                $("body").removeAttr("style");
                $(".nav-silde-fixed-bj").hide();
                $(document).off("keydown");
            })
        }


    //组合查询
    $scope.filtershowIf = false;
    $scope.filterShow = function(){
        $scope.statusChecked = angular.copy($scope.statusChecked2);
        $scope.statusCheckedKey = angular.copy($scope.statusCheckedKey2);
        $scope.cityChecked = angular.copy($scope.cityChecked2);
        $scope.cityCheckedKey = angular.copy($scope.cityCheckedKey2);
        $scope.beginDate = angular.copy($scope.beginDate2);
        $scope.endDate = angular.copy($scope.endDate2);
        $scope.payMonth = angular.copy($scope.payMonth2);
        $scope.noApplyChecked = angular.copy($scope.noApplyChecked2);
        $scope.noApplyCheckedKey = angular.copy($scope.noApplyCheckedKey2);
        // 阅读状态
        $scope.orderChecked = angular.copy($scope.orderCheckedCopy);
        $scope.orderCheckedKey = angular.copy($scope.orderCheckedKeyCopy);
        angular.forEach($scope.productStatusList , function (i) {
            i.statusChecked=false;
            if($scope.statusChecked.length>0){
                angular.forEach($scope.statusChecked, function (j) {
                    if(i.key==j.key){
                        i.statusChecked=true;
                    }
                })
            }
        })
        angular.forEach($scope.noApplyList,function(i){
            i.noApplyChecked=false;
            if($scope.noApplyChecked.length>0){
                angular.forEach($scope.noApplyChecked, function (j) {
                    if(i.key==j.key){
                        i.noApplyChecked=true;
                    }
                })
            }
        })
        angular.forEach($scope.citysList,function(i){
            i.cityChecked=false;
            if($scope.cityChecked.length>0){
                angular.forEach($scope.cityChecked, function (j) {
                    if(i.key==j.key){
                        i.cityChecked=true;
                    }
                })
            }
        })
         $scope.filtershowIf = ! $scope.filtershowIf;
         if ($scope.filtershowIf == true) {
            $("body").css("overflow","hidden");
            $(".nav-silde-fixed-bj").show();
            $(".nav-silde-fixed").css("left","0");
         }
         $(document).on("keydown",function(event){ 
            if(event.keyCode == 9 || event.keyCode == 32 || event.keyCode == 13){ 
                event.preventDefault();
            }
        });

         // 解决键盘 delete快捷键 删除问题 
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
                    $scope.beginDate = $scope.datetimepicker1Array[$scope.datetimepicker1Array.length-1];
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
                    $scope.endDate =  $scope.datetimepicker2Array[$scope.datetimepicker2Array.length-1];
                    $scope.$apply();
                    event.preventDefault();
                }
            });
        },300);
    }

    $('.nav-silde-fixed>ul>li').click(function() {
        $('.nav-silde-fixed>ul>li').removeClass('active');
         $('.nav-silde-fixed>ul>li .class-silde-fixed').css("left","-303px");
         $(this).find('.class-silde-fixed').css("left","230px");
        $(this).addClass('active');
    });

    $scope.closeNavLarye = function(){
        $scope.filtershowIf = false;
        $(".class-silde-fixed").css("left","-303px");
        $(".nav-silde-fixed").css("left","-230px");
        $("body").removeAttr("style");
        $(".nav-silde-fixed-bj").hide();
    }

    $scope.cancelSearch=function(){
        $scope.statusChecked2=[];
        $scope.cityChecked2=[];
        $scope.statusCheckedKey2=[];
        $scope.cityCheckedKey2=[];
        $scope.beginDate2="";
        $scope.endDate2="";
        $scope.noApplyCheckedKey2=[];
        $scope.noApplyChecked2=[];
        // 阅读状态
        $scope.orderCheckedCopy ={};
        $scope.orderCheckedKeyCopy = '';
        $('#datetimepicker1').val('');
        $('#datetimepicker2').val('');
        $scope.payMonth2="";
        $('#datetimepicker3').val('');
        angular.forEach($scope.citysList , function (i) {
            i.cityChecked=false;
        })
        angular.forEach($scope.productStatusList , function (i) {
            i.statusChecked=false;
        })
        angular.forEach($scope.noApplyList , function (i) {
            i.noApplyChecked=false;
        })
        $scope.sendDate(1);
    }

    //模糊查询-产品类型
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

    //模糊查询-城市选择
    $scope.cityChecked = [];
    $scope.cityCheckedKey = [];
    $scope.selectCity = function () {
        $scope.cityChecked = [];
        $scope.cityCheckedKey = [];
        angular.forEach($scope.citysList , function (i) {
            var index = $scope.cityChecked.indexOf(i);
            if(i.cityChecked && index === -1) {
                $scope.cityChecked.push(i);
                $scope.cityCheckedKey.push(i.key);
            } else if (!i.cityChecked && index !== -1){
                $scope.cityChecked.splice(index, 1);
                $scope.cityCheckedKey.splice(index, 1);
            };
        })
    }

    //模糊查询-未提交项选择
    $scope.noApplyChecked = [];
    $scope.noApplyCheckedKey = [];
    $scope.selectNoApply = function () {
        $scope.noApplyChecked = [];
        $scope.noApplyCheckedKey = [];
        angular.forEach($scope.noApplyList , function (i) {
            var index = $scope.noApplyChecked.indexOf(i);
            if(i.noApplyChecked && index === -1) {
                $scope.noApplyChecked.push(i);
                $scope.noApplyCheckedKey.push(i.key);
            } else if (!i.noApplyChecked && index !== -1){
                $scope.noApplyChecked.splice(index, 1);
                $scope.noApplyCheckedKey.splice(index, 1);
            };
        })
    }
    //清除未提交项选择
    $scope.clearNoApply = function(arr,obj,index,sidebar){
        if(sidebar){
            angular.forEach($scope.noApplyList , function (i) {
                if($scope.noApplyChecked[index].key==i.key){
                    i.noApplyChecked=false;
                }
            })
            $scope.noApplyChecked = $scope.clearSelct(arr,obj);
            $scope.noApplyCheckedKey.splice(index, 1);
        }else{
            angular.forEach($scope.noApplyList , function (i) {
                if($scope.noApplyChecked2[index].key==i.key){
                    i.noApplyChecked=false;
                }
            })
            $scope.noApplyChecked2 = $scope.clearSelct(arr,obj);
            $scope.noApplyCheckedKey2.splice(index, 1);
            $scope.sendDate(1);
        }
    }

    //清除选中产品类型
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
                if($scope.statusChecked2[index].key==i.key){
                    i.statusChecked=false;
                }
            })
            $scope.statusChecked2 = $scope.clearSelct(arr,obj);
            $scope.statusCheckedKey2.splice(index, 1);
            $scope.sendDate(1);
        }
    }
     //清除选中城市
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
                if($scope.cityChecked2[index].key==i.key){
                    i.cityChecked=false;
                }
            })
            $scope.cityChecked2 = $scope.clearSelct(arr,obj);
            $scope.cityCheckedKey2.splice(index, 1);
            $scope.sendDate(1);
        }
    }

    // 更多筛选 阅读状态
    $scope.orderChecked ={};
    $scope.orderCheckedKey='';
    $scope.selectOrder = function (arr) {
        if(arr){
            $scope.orderCheckedKey=arr.key;
            $scope.orderChecked=arr;
        }else{
            $scope.orderCheckedKey='';
            $scope.orderChecked={};
        }
    }
    // 清除 阅读状态
    $scope.clearOrder= function(){
        $scope.orderCheckedCopy ={};
        $scope.orderCheckedKeyCopy='';
        $scope.sendDate(1);
    }

     //清除选中日期
     $scope.clearDate = function(value){
        $('#datetimepicker1').val('');
        $('#datetimepicker2').val('');
        if(value=='sidebar'){
            $scope.beginDate="";
            $scope.endDate="";
        }else{
            $scope.beginDate2="";
            $scope.endDate2="";
            $scope.sendDate(1);
        }
    }
     //清除选中月份
    $scope.clearMonth = function(value){
        $('#datetimepicker3').val('');
        if(value=='sidebar'){
            $scope.payMonth="";
        }else{
            $scope.payMonth2="";
            $scope.sendDate(1);
        }
    }
    // 清除选中
    $scope.clearSelct= function(arr,obj){
      var length = arr.length;
      for(var i = 0 ;i<arr.length;i++){
        if(arr[i]== obj){
           if(i == 0)
            {
                arr.shift(); //删除并返回数组的第一个元素
                return arr;
            }
            else if(i == length-1)
            {
                arr.pop();  //删除并返回数组的最后一个元素
                return arr;
            }
            else
            {
                arr.splice(i,1); //删除下标为i的元素
                return arr;
            }
        }
      }

    }

    $('#datetimepicker1').datetimepicker({
        useCurrent: false,//Important! See issue #1075
        format: 'YYYY-MM-DD',
        locale: 'zh-cn',
        ignoreReadonly: true,
        showTodayButton: true,
        minDate:'2017-01-01',
        maxDate:'2050-12-31'
    }).on('dp.change', function(ev){
        $(".startMonth-err").hide();
           var result = new moment(ev.date).format('YYYY-MM-DD');  
           $scope.beginDate = result;
           $('#datetimepicker2').data("DateTimePicker").minDate(ev.date);
           $scope.$apply();
    });

    $('#datetimepicker2').datetimepicker({
        useCurrent: false,//Important! See issue #1075
        format: 'YYYY-MM-DD',
        locale: 'zh-cn',
        ignoreReadonly: true,
        showTodayButton: true,
        minDate:'2017-01-01',
        maxDate:'2050-12-31'
    }).on('dp.change', function(ev){
        $(".startMonth-err").hide();
       var result = new moment(ev.date).format('YYYY-MM-DD');  
       $scope.endDate = result;
       $('#datetimepicker1').data("DateTimePicker").maxDate(ev.date);
       $scope.$apply();
    });

    $('#datetimepicker3').datetimepicker({
        useCurrent: false,//Important! See issue #1075
        format: 'YYYY-MM',
        locale: 'zh-cn',
        ignoreReadonly: true,
        minDate:'2017-01',
        maxDate:'2050-12'
    }).on('dp.change', function(ev){
        $(".startMonth-err").hide();
       var result = new moment(ev.date).format('YYYY-MM');  
       $scope.payMonth = result;  
       $scope.$apply();
    });

    $scope.dateBlur=function(id,value){
        $scope[value]=$("#"+id).val();
    }

    //导出EXCEL
    $scope.downloadOrder = function(){
        appServices.addOrderDownload.save({
            downloadType:1,
            paramContentForm:{
                cityCode:$scope.cityCheckedKey2,
                productTypeList:$scope.statusCheckedKey2,
                beginDate:$scope.beginDate2,
                endDate:$scope.endDate2,
                name:$scope.name,
                flagState:"",
                isRead:$scope.orderCheckedKeyCopy,
                insuranceType:$scope.noApplyCheckedKey2
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
    // 申报失败
    $scope.failPop = function(id){
        $scope.failId = id;
        appServices.failReason.save({
            id:id
        }).$promise.then(function(data){
            $scope.failOptions=data.result.failReasionList;
            $scope.failReasonValue=$scope.failOptions[0].failReason;
            var item = $('.fail-pop');
            $rootScope.alertPop(item);
        });  
    }
  
   
    
    //checkBox
    $scope.m = [];
    $scope.checked = [];
    $scope.selectAll = function (select_all) {
        $scope.ctrlScope.select_all=select_all;
        if(select_all) {
            $scope.checked = [];
            angular.forEach($scope.list, function (i,index) {
                if(index < 100)
                {
                   i.checked = true;
                    $scope.checked.push({id:i.orderId}); 
                } 
                else
                {
                    return false;
                }
            })
        }else{
            angular.forEach($scope.list, function (i) {
                i.checked = false;
                $scope.checked = [];
            })
        }
         $scope.checkTitleNum = $scope.checked.length;
        $scope.addOrderCheck();
    };

    $scope.selectOne = function () {
        $scope.checked=[];
        angular.forEach($scope.list , function (i) {
            var index;
            angular.forEach($scope.checked, function (j) {
                if(j.id==i.orderId){
                    index=j;
                }
            });
            if(i.checked && !index) {
                $scope.checked.push({id:i.orderId});
            }else if(!i.checked && index){
                $scope.checked.splice(index, 1);
            };
        })
        if ($scope.list.length === $scope.checked.length) {
            $scope.ctrlScope.select_all = true;
        } else {
            $scope.ctrlScope.select_all = false;
        }
        $scope.checkTitleNum = $scope.checked.length;
        $scope.addOrderCheck();
    }
    //没选中checkbox禁用
    $scope.addOrderCheck = function(){
        if($scope.checked.length>0){
            $scope.checkedShow = false;
        }else{
            $scope.checkedShow = true;
        }
    }
    //增员完成
    $scope.addOrder = function(id){
        if(id!=0){
            $scope.checked = [{id:id}];
            $scope.allTip=false;
        }else{
            $scope.allTip=true;
        }
        var item = $('.addsucc-pop');
        $rootScope.alertPop(item);
    }
    // 增员完成
    $scope.succOrder = function(){
        appServices.addSuccess.save({
            orderList :$scope.checked               
        }).$promise.then(function (data) {
            if(data.result.fail)
            {
                $rootScope.errAlert(data.result.fail); 
            }else{
                $rootScope.successPop('操作成功');   
            } 
            $rootScope.closePop();
            $scope.sendDate(1);
        });
    }
    // 申报失败
    $scope.failOrder = function(){
        appServices.failApply.save({
            id:$scope.failId,
            failReason:$scope.failReasonValue            
        }).$promise.then(function (data) {
            $rootScope.successPop('操作成功');
            $rootScope.closePop();
            $scope.sendDate(1);
        });
    }

    //标记

    $scope.mark = function(i,event){
         $scope.markText = "";
            $scope.markId = "";
           $(event.target).parent().hide();
          $scope.saveMark(i,event);
         
    }
     $scope.addMark = function(event){
         $(event.target).parent().parent().siblings('.add-mark').show();
     }
      $scope.saveMark = function(i,event){
        $scope.markText = i.markText;
        $scope.markId = i.orderId;
         appServices.orderIncrease.save({
            markText: $scope.markText,
            checked : $scope.markId
        }).$promise.then(function (data) {
            $scope.markText = "";
            $scope.markId = "";
            $rootScope.successPop('保存成功');
            $(event.target).parent().hide();
        });
      }
      $scope.closeMark = function(event){
        $(event.target).parent().parent().hide();
      }

      //  更多筛选确认
      $scope.save = function(){
        $scope.statusChecked2 = angular.copy($scope.statusChecked);
        $scope.statusCheckedKey2 = angular.copy($scope.statusCheckedKey);
        $scope.cityChecked2 = angular.copy($scope.cityChecked);
        $scope.cityCheckedKey2 = angular.copy($scope.cityCheckedKey);
        $scope.beginDate2 = angular.copy($scope.beginDate);
        $scope.endDate2 = angular.copy($scope.endDate);
        $scope.payMonth2 = angular.copy($scope.payMonth);
        $scope.noApplyChecked2 = angular.copy($scope.noApplyChecked);
        $scope.noApplyCheckedKey2 = angular.copy($scope.noApplyCheckedKey);
        // 标记状态
        $scope.orderCheckedCopy = angular.copy($scope.orderChecked);
        $scope.orderCheckedKeyCopy = angular.copy($scope.orderCheckedKey);
        $scope.sendDate(1);
      }

    //模糊查询
    $("#tags_dropdown").hide();
    $scope.changeFun=function(){
        if(!$scope.name2){
            $("#tags_dropdown").hide(); 
        }else{
            appServices.addQuery.save({
                name:$scope.name2
            }).$promise.then(function(data){
                $scope.namelist = data.result.namelist;
                if($scope.namelist.length<1){
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
        // var e = e || window.event;
        // var elem = e.target || e.srcElement;
        // while (elem) {
        //     if (elem.className) {
        //         var arr = elem.className.split(" ");
        //         for (var i = 0; i < arr.length; i++) {
        //             if (arr[i] == "inputName") {
        //                 return;
        //             }
        //         }
        //     }
        //     elem = elem.parentNode;
        // }
      $("#tags_dropdown").hide();
    });

        $("body").on('keydown','.inputName',function(event){
            if(event.keyCode == 13){
                $scope.sendDate(1);
            }
        })

        // 下拉刷新
        $(window).scroll(function(){
            if(parseInt($(window).scrollTop())+parseInt($(window).height())==parseInt($(document).height())&&$scope.nowPage<$scope.totalPage){
                $scope.pageNum=$scope.nowPage+1;
                // 解决加密问题
                if($scope.orderCheckedKeyCopy == "")
                {
                    $scope.orderCheckedIsRead = -1;
                }
                else
                {
                    $scope.orderCheckedIsRead = $scope.orderCheckedKeyCopy;
                }
                appServices.orderIncrease.save({
                    name:$scope.name,
                    pageNum: $scope.pageNum,
                    pageSize: $scope.pageSize,
                    productType:$scope.statusCheckedKey2,
                    beginDate:$scope.beginDate2,
                    endDate:$scope.endDate2,
                    // payMonth:$scope.payMonth2,
                    city:$scope.cityCheckedKey2,
                    isRead:$scope.orderCheckedKeyCopy,
                    insuranceType:$scope.noApplyCheckedKey2
                }).$promise.then(function (data){
                    $scope.list = $scope.list.concat(data.result.list);
                    // 图片 url
                    angular.forEach(data.result.list, function(data,index,array){
                        img_url_array = {
                            "idCardPicUrlAMap":data.material.idCardPicUrlAMap.value,
                            "idCardPicUrlBMap":data.material.idCardPicUrlBMap.value
                        }
                        if(data.material.hkPicUrlOfHomepageMap)
                        {
                           img_url_array.hkPicUrlOfHomepageMap = data.material.hkPicUrlOfHomepageMap.value
                        }
                        if(data.material.hkPicUrlOfOwnpageMap)
                        {
                            img_url_array.hkPicUrlOfOwnpageMap = data.material.hkPicUrlOfOwnpageMap.value
                        }
                        if(data.material.hkPicUrlOfHeaderpageMap)
                        {
                            img_url_array.hkPicUrlOfHeaderpageMap = data.material.hkPicUrlOfHeaderpageMap.value
                        }
                        $scope.img_url.push(img_url_array);
                    });
                    $scope.declarationMaterial();
                    $scope.nowPage=$scope.nowPage+1;
                    $scope.ctrlScope.select_all = false;
                });
            }else if($scope.nowPage==$scope.totalPage&&parseInt($(window).scrollTop())+parseInt($(window).height())==parseInt($(document).height()) ){
              $rootScope.successPop('数据已加载完毕');
                $scope.nowPage=$scope.nowPage+1;
            }
        })

        //审核材料
        $scope.applyMaterial=function(id) {
            $scope.fbClick=false;
            var materialId;
            angular.forEach($scope.list, function(data,index,array){
                if(data.orderId == id){
                    $scope.num=index;
                    //  图片  添加地址
                    $(".img"+$scope.num).eq(0).attr('src',$scope.img_url[$scope.num].idCardPicUrlAMap);
                    $(".img"+$scope.num).eq(1).attr('src',$scope.img_url[$scope.num].idCardPicUrlBMap);
                    $(".img"+$scope.num).eq(2).attr('src',$scope.img_url[$scope.num].hkPicUrlOfHomepageMap);
                    $(".img"+$scope.num).eq(3).attr('src',$scope.img_url[$scope.num].hkPicUrlOfOwnpageMap);
                    $(".img"+$scope.num).eq(4).attr('src',$scope.img_url[$scope.num].hkPicUrlOfHeaderpageMap);
                    $('.img').css("left",-$scope.num * winW+'px');
                    $('#orderDeclarWrap').show();
                    // 禁止快捷键 enter 空格 等
                    $(document).on("keydown",function(event){ 
                        if(event.keyCode == 9 || event.keyCode == 32 || event.keyCode == 13){ 
                            event.preventDefault();
                        }
                    });
                    if(data.material.isReadMap.value=='未读'){
                        materialId=data.material.id;
                        appServices.noRead.save({
                            materialId:materialId
                        }).$promise.then(function (data2){
                            data.material.isReadMap={
                                value: "已读",
                                key: "1"
                            }
                        });
                    }
                }
            });
        }
        // 轮播初始化
        $scope.declarationMaterial = function(id){
            setTimeout(function(){
                $("#orderDeclarWrap .img li").css({
                    'margin-left': marginLeft+'px',
                    'margin-right': marginLeft+'px'
                });
                $('#orderDeclarWrap .banner').css('margin-top',marginTop+'px');
            })
            for(var i = 1; i<=$scope.list.length;i++){
               $scope.ulwidth = i;
            }
            $scope.slide();
        }
        //关闭材料
        $scope.closeOrdermaterial = function(){
             $('#orderDeclarWrap').hide();
             $(document).off("keydown");
        }

        //材料自适应
        var winH =$(window).height();
        var winW = $(window).width()+20;
        var marginLeft = (winW-800)/2;
        var marginTop = (winH-500)/4;
        $scope.slide = function(){
            $("#orderDeclarWrap").height(winH);
            $("#orderDeclarWrap").width(winW);
            $('.img ').width($scope.ulwidth*winW);
        }
        $(window).resize(function(){
            winH =$(window).height();
            winW = $(window).width();
            marginLeft = (winW-800)/2;
            marginTop = (winH-500)/4;
            $scope.slide();
            setTimeout(function(){
                $("#orderDeclarWrap .img li").css({
                    'margin-left': marginLeft+'px',
                    'margin-right': marginLeft+'px'
                });
                $('#orderDeclarWrap .banner').css('margin-top',marginTop+'px');
            })
            //$scope.declarationMaterial();
            $('.img').css("left",-$scope.num * winW+"px");
        });

        $scope.num = 0;
        //下一个按钮
        $scope.next = function(){
            if($scope.num+1>= $scope.ulwidth ){
                if($scope.nowPage<$scope.totalPage){
                    $scope.fbClick=false;
                    // 解决加密问题
                    if($scope.orderCheckedKeyCopy == "")
                    {
                        $scope.orderCheckedIsRead = -1;
                    }
                    else
                    {
                        $scope.orderCheckedIsRead = $scope.orderCheckedKeyCopy;
                    }
                    appServices.orderIncrease.save({
                        name:$scope.name,
                        pageNum: $scope.nowPage+1,
                        pageSize: $scope.pageSize,
                        productType:$scope.statusCheckedKey2,
                        beginDate:$scope.beginDate2,
                        endDate:$scope.endDate2,
                        // payMonth:$scope.payMonth2,
                        city:$scope.cityCheckedKey2,
                        isRead:$scope.orderCheckedKeyCopy,
                        insuranceType:$scope.noApplyCheckedKey2
                    }).$promise.then(function (data){
                        $scope.list = $scope.list.concat(data.result.list);
                        // 图片 url
                        angular.forEach(data.result.list, function(data,index,array){
                            img_url_array = {
                                "idCardPicUrlAMap":data.material.idCardPicUrlAMap.value,
                                "idCardPicUrlBMap":data.material.idCardPicUrlBMap.value
                            }
                            if(data.material.hkPicUrlOfHomepageMap)
                            {
                               img_url_array.hkPicUrlOfHomepageMap = data.material.hkPicUrlOfHomepageMap.value
                            }
                            if(data.material.hkPicUrlOfOwnpageMap)
                            {
                                img_url_array.hkPicUrlOfOwnpageMap = data.material.hkPicUrlOfOwnpageMap.value
                            }
                            if(data.material.hkPicUrlOfHeaderpageMap)
                            {
                                img_url_array.hkPicUrlOfHeaderpageMap = data.material.hkPicUrlOfHeaderpageMap.value
                            }
                            $scope.img_url.push(img_url_array);
                        });
                        
                        $scope.declarationMaterial();
                        $scope.num=$scope.num+1;
                        setTimeout(function() {
                            $('.img').stop().animate({
                                left: -$scope.num * winW
                            }, 300);
                            //图片  添加地址
                            $(".img"+$scope.num).eq(0).attr('src',$scope.img_url[$scope.num].idCardPicUrlAMap);
                            $(".img"+$scope.num).eq(1).attr('src',$scope.img_url[$scope.num].idCardPicUrlBMap);
                            $(".img"+$scope.num).eq(2).attr('src',$scope.img_url[$scope.num].hkPicUrlOfHomepageMap);
                            $(".img"+$scope.num).eq(3).attr('src',$scope.img_url[$scope.num].hkPicUrlOfOwnpageMap);
                            $(".img"+$scope.num).eq(4).attr('src',$scope.img_url[$scope.num].hkPicUrlOfHeaderpageMap);
                        })
                        
                        if($scope.list[$scope.num.toString()].material.isReadMap.value=='未读'){
                            appServices.noRead.save({
                                materialId:$scope.list[$scope.num.toString()].material.id
                            }).$promise.then(function (data){
                            });
                        }
                        $scope.nowPage=$scope.nowPage+1;
                        $scope.ctrlScope.select_all= false;
                        
                    });
                }else if($scope.nowPage==$scope.totalPage){
                    $rootScope.successPop('已经是最后一张了');
                    $scope.nowPage=$scope.nowPage+1;
                }else{
                    $rootScope.successPop('已经是最后一张了');
                }
            }else if($scope.num+1<$scope.ulwidth){
                $scope.num=$scope.num+1;
                $scope.fbClick=false;
                $('.img').stop().animate({
                left: -$scope.num * winW
                }, 300);
                //图片  添加地址
                $(".img"+$scope.num).eq(0).attr('src',$scope.img_url[$scope.num].idCardPicUrlAMap);
                $(".img"+$scope.num).eq(1).attr('src',$scope.img_url[$scope.num].idCardPicUrlBMap);
                $(".img"+$scope.num).eq(2).attr('src',$scope.img_url[$scope.num].hkPicUrlOfHomepageMap);
                $(".img"+$scope.num).eq(3).attr('src',$scope.img_url[$scope.num].hkPicUrlOfOwnpageMap);
                $(".img"+$scope.num).eq(4).attr('src',$scope.img_url[$scope.num].hkPicUrlOfHeaderpageMap);
                if($scope.list[$scope.num.toString()].material.isReadMap.value=='未读'){
                    appServices.noRead.save({
                        materialId:$scope.list[$scope.num.toString()].material.id
                    }).$promise.then(function (data){
                        $scope.list[$scope.num.toString()].material.isReadMap={
                            value: "已读",
                            key: "1"
                        }
                    });
                }
            }
        }
        // 上一个按钮
        $scope.prev = function(){
            if($scope.num>0){
                $scope.fbClick=false;
                $scope.num=$scope.num-1;
                //图片  添加地址
                $(".img"+$scope.num).eq(0).attr('src',$scope.img_url[$scope.num].idCardPicUrlAMap);
                $(".img"+$scope.num).eq(1).attr('src',$scope.img_url[$scope.num].idCardPicUrlBMap);
                $(".img"+$scope.num).eq(2).attr('src',$scope.img_url[$scope.num].hkPicUrlOfHomepageMap);
                $(".img"+$scope.num).eq(3).attr('src',$scope.img_url[$scope.num].hkPicUrlOfOwnpageMap);
                $(".img"+$scope.num).eq(4).attr('src',$scope.img_url[$scope.num].hkPicUrlOfHeaderpageMap);
                $('.img').stop().animate({
                left: -$scope.num * winW
            }, 300);
                if($scope.list[$scope.num.toString()].material.isReadMap.value=='未读'){
                    appServices.noRead.save({
                        materialId:$scope.list[$scope.num.toString()].material.id
                    }).$promise.then(function (data){
                        $scope.list[$scope.num.toString()].material.isReadMap={
                            value: "已读",
                            key: "1"
                        }
                    });
                }
            }else if($scope.num == 0){
                 $rootScope.successPop('已经是第一张了');
                $scope.num = 0;
            }
        }
        //  打印
        var printOne=true;
        $scope.print=function(index) {
            if(printOne){
                $(".img"+index).jqprint();
                printOne=false;
            }
            setTimeout(function() {
                printOne=true;
            },2000)
        }
        //下载材料
        $scope.downloadIDCard=function(urla,urlb,name,idCard,id,home,own,header){
            if(home || own || header)
            {
                window.open('/entry/downloadToZip?orderId='+id+'');
            }else{
                window.open('/entry/pdfDownload?pdfDownload=idCardPicUrlAKey:'+urla+','+'idCardPicUrlBKey:'+urlb+','+'name:'+name+','+'idCard:'+idCard+','+'appId:'+config.appId+','+'token:'+sessionStorage.getItem('token')+','+'userId:'+sessionStorage.getItem('userId'));
            }
        }
        $scope.checkedFeedback = function(arr,index){
            $scope[arr+index]=!$scope[arr+index];

        }
        //提交错误反馈
        $scope.errConfirm=function(orderId,materialId){
            $scope.materialRmark = [];
            for(var i=1;i<=4;i++){
                if($scope['materialRmarkB1_'+i]){
                    $scope.materialRmark.push("B1_"+i);
                }
            }
            for(var i=1;i<=4;i++){
                if($scope['materialRmarkB2_'+i]){
                    $scope.materialRmark.push("B2_"+i);
                }
            }
            $scope.materialRmark = $scope.materialRmark.join(",");
            if($scope.materialRmark.length){
                appServices.idErr.save({
                    materialRmark:$scope.materialRmark,
                    orderId:orderId,
                    materialId:materialId
                }).$promise.then(function (data){
                    $scope.fbClick=false;
                    $rootScope.successPop('反馈成功');
                });
            }else{
                $rootScope.errAlert('请至少选择一个反馈错误选项');
            }
        }
        //错误反馈点击事件
        $scope.feedback2=function(id,type) {
            if(!$scope.fbClick)
            {
                appServices.orderIncreaseFeedbackMaterial.save({
                    productId:id,
                    insuredType:type
                }).$promise.then(function (data){
                    $scope.results = data.result;
                    for(var i=1;i<=4;i++){
                        $scope['materialRmarkB1_'+i] = false;
                    }
                    for(var i=1;i<=4;i++){
                        $scope['materialRmarkB2_'+i] = false;
                    }
                });
                $scope.fbClick=!$scope.fbClick;
            }
            else{
                $scope.fbClick=!$scope.fbClick;
            }
        }

        //跳转到详情页
        $scope.goDetail=function(id,key){
            $scope.goBackFun();
            $location.path('order/detail/increaseOrder/'+id+'/'+key);
        }
        //跳转到下载列表
        $scope.goDownload=function(){
            $scope.goBackFun();
            $location.path('order/increaseDownload');
        }

});
