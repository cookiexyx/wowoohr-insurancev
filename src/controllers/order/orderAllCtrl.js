angular.module('appmvc')
    .controller('OrderAllCtrl', function OrderAllCtrl($scope, $rootScope, appServices, $location,pagenation,$timeout) {
        'use strict';
    
    $scope.nowPage=1;
    $scope.pageSize=100;
    // $scope.payMonthStartCopy = "";
    // $scope.payMonthEndCopy = "";
    $scope.beginDate2="";
    $scope.endDate2="";
    $scope.cityCheckedCopy = [];
    $scope.cityCheckedKeyCopy = [];
    $scope.statusCheckedCopy = [];
    $scope.statusCheckedKeyCopy = [];
    $scope.declareCheckedCopy = {};
    $scope.declareCheckedKeyCopy = '';
    $scope.productIdParameter = -1;
    $scope.orderCheckedCopy = {};
    $scope.orderCheckedKeyCopy = '';
    $scope.ulwidth;
    $scope.name2="";
    $scope.name="";
    $scope.img_url = [];
    $scope.pageNum=1;
    var img_url_array = {};
    $(".orderincrease").hide();

    $scope.goBackFun=function(){
        //返回存搜索位置
        $scope.orderAllList={
            name:$scope.name,
            statusCheckedKey:$scope.statusCheckedKeyCopy,
            beginDate:$scope.beginDate2,
            endDate:$scope.endDate2,
            cityCheckedKey:$scope.cityCheckedKeyCopy,
            statusChecked:$scope.statusCheckedCopy,
            cityChecked:$scope.cityCheckedCopy,
            declareChecked:$scope.declareCheckedCopy,
            declareCheckedKey:$scope.declareCheckedKeyCopy,
            productIdParameter:$scope.productIdParameter,
            orderChecked:$scope.orderCheckedCopy,
            orderCheckedKey:$scope.orderCheckedKeyCopy,
            pageNum:$scope.pageNum,
            nowPage:$scope.nowPage,
            scrollTop:$(window).scrollTop()
        }
        sessionStorage.setItem('orderAll',JSON.stringify($scope.orderAllList));
    }

    // 进入页面获取数据
    appServices.orderAll.save({
        pageNum:1,
        pageSize:$scope.pageSize
    }).$promise.then(function(data){
        $scope.dataList = data.result.dataList;
        $scope.orderLength = angular.copy(data.result.totalCount);
        $scope.totalCount = data.result.totalCount;
        $scope.totalPage = data.result.pages;
        //图片 url
        angular.forEach($scope.dataList, function(data,index,array){
           img_url_array = {
                "idCardPicUrlFront":data.idCardPicUrlFront.value,
                "idCardPicUrlBack":data.idCardPicUrlBack.value
            }
            if(data.hkPicUrlOfHomepageMap)
            {
               img_url_array.hkPicUrlOfHomepageMap = data.hkPicUrlOfHomepageMap.value
            }
            if(data.hkPicUrlOfOwnpageMap)
            {
                img_url_array.hkPicUrlOfOwnpageMap = data.hkPicUrlOfOwnpageMap.value
            }
            if(data.hkPicUrlOfHeaderpageMap)
            {
                img_url_array.hkPicUrlOfHeaderpageMap = data.hkPicUrlOfHeaderpageMap.value
            }
            $scope.img_url.push(img_url_array);
        });
        for(var i = 1; i<=$scope.dataList.length;i++){
            $scope.ulwidth = i;
        }
        $scope.declarationMaterial();
        $scope.slide();
        //返回保留搜索条件和所在位置
        if(!$rootScope.gobackUrl&&sessionStorage.getItem('orderAll')){
            $scope.img_url=[];
            $("#loading").show();
            var localList=JSON.parse(sessionStorage.getItem('orderAll'));
            sessionStorage.removeItem('orderAll');
            $scope.name2=localList.name;
            $scope.name=localList.name;
            $scope.statusCheckedKeyCopy=localList.statusCheckedKey;
            $scope.cityCheckedKeyCopy=localList.cityCheckedKey;
            $scope.statusCheckedCopy=localList.statusChecked;
            $scope.cityCheckedCopy=localList.cityChecked;
            $scope.beginDate2=localList.beginDate;
            $scope.endDate2=localList.endDate;
            $scope.declareCheckedCopy=localList.declareChecked;
            $scope.declareCheckedKeyCopy=localList.declareCheckedKey;
            $scope.productIdParameter=localList.productIdParameter;
            $scope.orderCheckedCopy=localList.orderChecked;
            $scope.orderCheckedKeyCopy=localList.orderCheckedKey;
            $scope.pageNum = localList.pageNum;
            $scope.nowPage = localList.nowPage;
            $scope.listArr = [];
            var i =1;
            for(var f=1;f<$scope.pageNum+1;f++){
                appServices.orderAll.save({
                    pageNum:f,
                    pageSize:$scope.pageSize,
                    nameOrIdCard:localList.name,
                    cityList:$scope.cityCheckedKeyCopy,
                    productTypeList:localList.statusCheckedKey,
                    productId:localList.productIdParameter,
                    applyStatus:localList.orderCheckedKey,
                    beginDate:localList.beginDate,
                    endDate:localList.endDate
                }).$promise.then(function(data){
                    $("#loading").show();
                    $scope.listArr[data.result.pageNum] = data.result.dataList;
                    if(i == localList.pageNum){
                        $scope.dataList = [];
                        angular.forEach($scope.listArr, function(data,index,array){
                            $scope.dataList = $scope.dataList.concat(data);
                        });
                    }
                    // 图片 url
                    angular.forEach(data.result.dataList, function(data,index,array){
                        img_url_array = {
                            "idCardPicUrlFront":data.idCardPicUrlFront.value,
                            "idCardPicUrlBack":data.idCardPicUrlBack.value
                        }
                        if(data.hkPicUrlOfHomepageMap)
                        {
                           img_url_array.hkPicUrlOfHomepageMap = data.hkPicUrlOfHomepageMap.value
                        }
                        if(data.hkPicUrlOfOwnpageMap)
                        {
                            img_url_array.hkPicUrlOfOwnpageMap = data.hkPicUrlOfOwnpageMap.value
                        }
                        if(data.hkPicUrlOfHeaderpageMap)
                        {
                            img_url_array.hkPicUrlOfHeaderpageMap = data.hkPicUrlOfHeaderpageMap.value
                        }
                        $scope.img_url.push(img_url_array);
                    });
                    if(i==$scope.pageNum){
                        $scope.totalPage = data.result.pages;
                        $scope.totalCount = data.result.totalCount;
                        $scope.declarationMaterial();
                        $scope.slide();
                        // 时间插件重置
                        $('#datetimepicker2').data("DateTimePicker").minDate('2017-01-01');
                        $('#datetimepicker1').data("DateTimePicker").maxDate('2050-12-31');

                        $scope.filtershow = false;
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
            sessionStorage.removeItem('orderAll');
        }
    });

     // 下拉刷新
    $(window).scroll(function(){
        if(parseInt($(window).scrollTop())+parseInt($(window).height())==parseInt($(document).height())&&$scope.nowPage<$scope.totalPage){
            $scope.pageNum=$scope.nowPage+1;
            // 解决加密问题
            if($scope.declareCheckedKeyCopy == "")
            {
                $scope.productIdParameter = -1;
            }
            else
            {
                $scope.productIdParameter = $scope.declareCheckedKeyCopy;
            }
            // stratMonth:$scope.payMonthStartCopy,
            // endMonth:$scope.payMonthEndCopy,
            appServices.orderAll.save({
                pageNum:$scope.pageNum,
                pageSize:$scope.pageSize,
                nameOrIdCard:$scope.name,
                beginDate:$scope.beginDate2,
                endDate:$scope.endDate2,
                cityList:$scope.cityCheckedKeyCopy,
                productTypeList:$scope.statusCheckedKeyCopy,
                productId:$scope.productIdParameter,
                applyStatus:$scope.orderCheckedKeyCopy
            }).$promise.then(function(data){
                $scope.dataList=$scope.dataList.concat(data.result.dataList);
                $scope.nowPage=$scope.nowPage+1;
                $scope.totalCount = data.result.totalCount;
                $scope.totalPage = data.result.pages;
                for(var i = 1; i<=$scope.dataList.length;i++){
                    $scope.ulwidth = i;
                }
                $scope.declarationMaterial();
                $scope.slide();
                // 图片 url
                angular.forEach(data.result.dataList, function(data,index,array){
                    img_url_array = {
                        "idCardPicUrlFront":data.idCardPicUrlFront.value,
                        "idCardPicUrlBack":data.idCardPicUrlBack.value
                    }
                    if(data.hkPicUrlOfHomepageMap)
                    {
                       img_url_array.hkPicUrlOfHomepageMap = data.hkPicUrlOfHomepageMap.value
                    }
                    if(data.hkPicUrlOfOwnpageMap)
                    {
                        img_url_array.hkPicUrlOfOwnpageMap = data.hkPicUrlOfOwnpageMap.value
                    }
                    if(data.hkPicUrlOfHeaderpageMap)
                    {
                        img_url_array.hkPicUrlOfHeaderpageMap = data.hkPicUrlOfHeaderpageMap.value
                    }
                    $scope.img_url.push(img_url_array);
                });
            });
        }else if($scope.nowPage==$scope.totalPage&&parseInt($(window).scrollTop())+parseInt($(window).height())==parseInt($(document).height()) ){
          $rootScope.successPop('数据已加载完毕');
          $scope.nowPage=$scope.nowPage+1;
        }
    })
    //模糊查询
    $("#tags_dropdown").hide();
    $scope.changeFun=function(){
        if(!$scope.name2){
            $("#tags_dropdown").hide(); 
        }else{
            appServices.orderAllSearch.save({
                nameOrIdCard:$scope.name2
            }).$promise.then(function(data){
                $scope.namelist = data.result.nameList;
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
      $("#tags_dropdown").hide();
    });

    // 点击回车 搜索 
    $("body").on('keydown','.inputName',function(event){
        if(event.keyCode == 13){
            $scope.sendDate(1);
        }
    })

    // 侧边栏 进入页面获取数据
    appServices.increaseSidebar.save({
        screenType:"4"
    }).$promise.then(function(data){
        $scope.citysList = data.result.cityList; 
        $scope.productStatusList = data.result.productType;
        if(data.result.vendorProductList.length > 0)
        {
        	$scope.productList = data.result.vendorProductList[0].productList;
        }
        $scope.orderStatusList = data.result.orderStatus;
        angular.forEach($scope.citysList , function (i) {
            i.cityChecked=false;
        })
        angular.forEach($scope.productStatusList , function (i) {
            i.statusChecked=false;
        })
    });

    //更多筛选  缴纳月份 
    $('#datetimepickerMonthStart').datetimepicker({
        useCurrent: false,   // 当前时间不会选中
        format: 'YYYY-MM',    // 默认显示月
        locale: 'zh-cn',
        ignoreReadonly: true,    // 禁止填写
        minDate:'2017-01',       //可选范围2017-01至2050-12  
        maxDate:'2050-12'
    }).on('dp.change', function(ev){
       var result = new moment(ev.date).format('YYYY-MM');   // 正确的日期格式
       $scope.payMonthStart = result;  
       $scope.$apply();
    });

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

    $scope.dateBlur=function(id,value){
        $scope[value]=$("#"+id).val();
    }
    // 清除 缴纳月
    $scope.clearMonth = function(value){
        $('#datetimepickerMonthStart').val('');
        $('#datetimepickerMonthEnd').val('');
        if(value=='sidebar'){
            $scope.payMonthStart="";
            $scope.payMonthEnd="";
        }else{
            $scope.payMonthStartCopy = "";
            $scope.payMonthEndCopy="";
            $scope.sendDate(1);
        }
    }

    //更多筛选  派单日期
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

    // 清除 派单日期
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

    // 更多筛选 申报产品
    $scope.declareChecked ={};
    $scope.declareCheckedKey='';
    $scope.selectDeclare = function (arr) {
        if(arr){
            $scope.declareCheckedKey=arr.productId;
            $scope.declareChecked=arr;
        }else{
            $scope.declareCheckedKey='';
            $scope.declareChecked={};
        }
    }
    // 清除 申报产品
    $scope.clearDeclare= function(){
        $scope.declareCheckedCopy ={};
        $scope.declareCheckedKeyCopy='';
        $scope.sendDate(1);
    }

    // 更多筛选 缴纳状态
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
    // 清除 缴纳状态
    $scope.clearOrder= function(){
        $scope.orderCheckedCopy ={};
        $scope.orderCheckedKeyCopy='';
        $scope.sendDate(1);
    }

    // 确认
    $scope.save = function(){
        // 缴纳月份 
        $scope.payMonthStartCopy = angular.copy($scope.payMonthStart);
        $scope.payMonthEndCopy = angular.copy($scope.payMonthEnd);
        //  缴纳城市
        $scope.cityCheckedCopy = angular.copy($scope.cityChecked);
        $scope.cityCheckedKeyCopy = angular.copy($scope.cityCheckedKey);
        // 产品类型
        $scope.statusCheckedCopy = angular.copy($scope.statusChecked);
        $scope.statusCheckedKeyCopy = angular.copy($scope.statusCheckedKey);
        // 申报产品
        $scope.declareCheckedCopy = angular.copy($scope.declareChecked);
        $scope.declareCheckedKeyCopy = angular.copy($scope.declareCheckedKey);
        // 缴纳状态
        $scope.orderCheckedCopy = angular.copy($scope.orderChecked);
        $scope.orderCheckedKeyCopy = angular.copy($scope.orderCheckedKey);
        //  派单日期
        $scope.beginDate2 = angular.copy($scope.beginDate);
        $scope.endDate2 = angular.copy($scope.endDate);
        $scope.sendDate(1);
    }
    // 取消筛选
    $scope.clearSearch=function(){
        // 缴纳月份 
        $scope.payMonthStartCopy = "";
        $scope.payMonthEndCopy="";
        $('#datetimepickerMonthStart').val('');
        $('#datetimepickerMonthEnd').val('');
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
        // 申报产品
        $scope.declareCheckedCopy ={};
        $scope.declareCheckedKeyCopy='';
        // 派单日期
        $scope.beginDate2="";
        $scope.endDate2="";
        // 缴纳状态
        $scope.orderCheckedCopy ={};
        $scope.orderCheckedKeyCopy = '';
        $scope.sendDate(1);
    }
    // 查询
    $scope.sendDate=function(page){
        $scope.nowPage=1;
        $scope.page=page;
        $scope.name=angular.copy($scope.name2);
        // 解决加密问题
        if($scope.declareCheckedKeyCopy == "")
        {
            $scope.productIdParameter = -1;
        }
        else
        {
            $scope.productIdParameter = $scope.declareCheckedKeyCopy;
        }
        appServices.orderAll.save({
            pageNum:$scope.page,
            pageSize:$scope.pageSize,
            nameOrIdCard:$scope.name,
            beginDate:$scope.beginDate2,
            endDate:$scope.endDate2,
            cityList:$scope.cityCheckedKeyCopy,
            productTypeList:$scope.statusCheckedKeyCopy,
            productId:$scope.productIdParameter,
            applyStatus:$scope.orderCheckedKeyCopy
        }).$promise.then(function(data){
            $scope.dataList = data.result.dataList;
            // 图片 Url
            $scope.img_url = [];
            angular.forEach($scope.dataList, function(data,index,array){
                img_url_array = {
                    "idCardPicUrlFront":data.idCardPicUrlFront.value,
                    "idCardPicUrlBack":data.idCardPicUrlBack.value
                }
                if(data.hkPicUrlOfHomepageMap)
                {
                   img_url_array.hkPicUrlOfHomepageMap = data.hkPicUrlOfHomepageMap.value
                }
                if(data.hkPicUrlOfOwnpageMap)
                {
                    img_url_array.hkPicUrlOfOwnpageMap = data.hkPicUrlOfOwnpageMap.value
                }
                if(data.hkPicUrlOfHeaderpageMap)
                {
                    img_url_array.hkPicUrlOfHeaderpageMap = data.hkPicUrlOfHeaderpageMap.value
                }
                $scope.img_url.push(img_url_array);
            });
            $scope.totalCount = data.result.totalCount;
            $scope.totalPage = data.result.pages;

            $scope.declarationMaterial();
            $scope.slide();
            // 时间插件重置
            $('#datetimepicker2').data("DateTimePicker").minDate('2017-01-01');
            $('#datetimepicker1').data("DateTimePicker").maxDate('2050-12-31');

            $scope.filtershow = false;
            $(".class-silde-fixed").css("left","-303px");
            $(".nav-silde-fixed").css("left","-230px");
            $("body").removeAttr("style");
            $(".nav-silde-fixed-bj").hide();
            $(document).off("keydown");
        })
    }

    
    // 清除checkbox选中
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

    // 菜单栏效果
    $scope.filtershow = false;
    $scope.filterShow = function(){
        //  **************选中复位************
        // 缴纳月份 
        $scope.payMonthStart = angular.copy($scope.payMonthStartCopy);
        $scope.payMonthEnd = angular.copy($scope.payMonthEndCopy);
        //  缴纳城市
        $scope.cityChecked = angular.copy($scope.cityCheckedCopy);
        $scope.cityCheckedKey = angular.copy($scope.cityCheckedKeyCopy);
        // 产品类型
        $scope.statusChecked = angular.copy($scope.statusCheckedCopy);
        $scope.statusCheckedKey = angular.copy($scope.statusCheckedKeyCopy);
        // 申报产品
        $scope.declareChecked = angular.copy($scope.declareCheckedCopy);
        $scope.declareCheckedKey = angular.copy($scope.declareCheckedKeyCopy);
        // 缴纳状态
        $scope.orderChecked = angular.copy($scope.orderCheckedCopy);
        $scope.orderCheckedKey = angular.copy($scope.orderCheckedKeyCopy);
        // 派单日期
        $scope.beginDate = angular.copy($scope.beginDate2);
        $scope.endDate = angular.copy($scope.endDate2);

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
        $scope.filtershow = ! $scope.filtershow;
        if ($scope.filtershow == true) {
            $("body").css("overflow","hidden");
            $(".nav-silde-fixed-bj").show();
            $(".nav-silde-fixed").css("left","0");
        }
        // 禁止快捷键 enter 空格 等
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
        // 侧边栏 隐藏效果
        $scope.filtershow = false;
        $(".class-silde-fixed").css("left","-303px");
        $(".nav-silde-fixed").css("left","-230px");
        $("body").removeAttr("style");
        $(".nav-silde-fixed-bj").hide();
        $(document).off("keydown");
    }

    //审核材料
    $scope.applyMaterial=function(id) {
        angular.forEach($scope.dataList, function(data,index,array){
            if(data.id == id){
                $scope.num=index;
                //  图片  添加地址
                $(".img"+$scope.num).eq(0).attr('src',$scope.img_url[$scope.num].idCardPicUrlFront);
                $(".img"+$scope.num).eq(1).attr('src',$scope.img_url[$scope.num].idCardPicUrlBack);
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
            }
        });
    }
    $scope.declarationMaterial = function(id){
        setTimeout(function(){
            $("#orderDeclarWrap .img li").css({
                'margin-left': marginLeft+'px',
                'margin-right': marginLeft+'px'
            });
            $('#orderDeclarWrap .banner').css('margin-top',marginTop+'px');
        })
        for(var i = 1; i<=$scope.dataList.length;i++){
           $scope.ulwidth = i;
        }
        $scope.slide();
    }

    $scope.closeOrdermaterial = function(){
         $('#orderDeclarWrap').hide();
         $(document).off("keydown");
    }

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
        });
        // $scope.declarationMaterial();
        
        $('.img').css("left",-$scope.num * winW+"px");
    });

    $scope.num = 0;
    $scope.next = function(){
        if($scope.num+1>= $scope.ulwidth ){
            if($scope.nowPage<$scope.totalPage){
                // 解决加密问题
                if($scope.declareCheckedKeyCopy == "")
                {
                    $scope.productIdParameter = -1;
                }
                else
                {
                    $scope.productIdParameter = $scope.declareCheckedKeyCopy;
                }
                appServices.orderAll.save({
                    pageNum:$scope.page,
                    pageSize:$scope.pageSize,
                    nameOrIdCard:$scope.name,
                    beginDate:$scope.beginDate2,
                    endDate:$scope.endDate2,
                    cityList:$scope.cityCheckedKeyCopy,
                    productTypeList:$scope.statusCheckedKeyCopy,
                    productId:$scope.productIdParameter,
                    applyStatus:$scope.orderCheckedKeyCopy
                }).$promise.then(function (data){
                    $scope.dataList = $scope.dataList.concat(data.result.dataList);
                    // 图片 url
                    angular.forEach(data.result.dataList, function(data,index,array){
                        img_url_array = {
                            "idCardPicUrlFront":data.idCardPicUrlFront.value,
                            "idCardPicUrlBack":data.idCardPicUrlBack.value
                        }
                        if(data.hkPicUrlOfHomepageMap)
                        {
                           img_url_array.hkPicUrlOfHomepageMap = data.hkPicUrlOfHomepageMap.value
                        }
                        if(data.hkPicUrlOfOwnpageMap)
                        {
                            img_url_array.hkPicUrlOfOwnpageMap = data.hkPicUrlOfOwnpageMap.value
                        }
                        if(data.hkPicUrlOfHeaderpageMap)
                        {
                            img_url_array.hkPicUrlOfHeaderpageMap = data.hkPicUrlOfHeaderpageMap.value
                        }
                        $scope.img_url.push(img_url_array);
                    });
                    $scope.declarationMaterial();
                    $scope.num=$scope.num+1;
                    setTimeout(function() {
                        $('.img').stop().animate({
                            left: -$scope.num * winW
                        }, 300);
                    })
                    $scope.nowPage=$scope.nowPage+1;
                    
                });
            }else if($scope.nowPage==$scope.totalPage){
                $rootScope.successPop('已经是最后一张了');
                $scope.nowPage=$scope.nowPage+1;
            }else{
                $rootScope.successPop('已经是最后一张了');
            }
        }else if($scope.num+1<$scope.ulwidth){
            $scope.num=$scope.num+1;
            $('.img').stop().animate({
            left: -$scope.num * winW
            }, 300);
            //图片  添加地址
            if(typeof($(".img"+$scope.num).attr("src"))=="undefined")
            {
                setInterval(function(){
                    $(".img"+$scope.num).eq(0).attr('src',$scope.img_url[$scope.num].idCardPicUrlFront);
                    $(".img"+$scope.num).eq(1).attr('src',$scope.img_url[$scope.num].idCardPicUrlBack);
                    $(".img"+$scope.num).eq(2).attr('src',$scope.img_url[$scope.num].hkPicUrlOfHomepageMap);
                    $(".img"+$scope.num).eq(3).attr('src',$scope.img_url[$scope.num].hkPicUrlOfOwnpageMap);
                    $(".img"+$scope.num).eq(4).attr('src',$scope.img_url[$scope.num].hkPicUrlOfHeaderpageMap);
                },10);  
            }
            
        }
    }
    // 上一个按钮
    $scope.prev = function(){
        if($scope.num>0){
            $scope.num=$scope.num-1;
            //图片  添加地址
            $(".img"+$scope.num).eq(0).attr('src',$scope.img_url[$scope.num].idCardPicUrlFront);
            $(".img"+$scope.num).eq(1).attr('src',$scope.img_url[$scope.num].idCardPicUrlBack);
            $(".img"+$scope.num).eq(2).attr('src',$scope.img_url[$scope.num].hkPicUrlOfHomepageMap);
            $(".img"+$scope.num).eq(3).attr('src',$scope.img_url[$scope.num].hkPicUrlOfOwnpageMap);
            $(".img"+$scope.num).eq(4).attr('src',$scope.img_url[$scope.num].hkPicUrlOfHeaderpageMap);
            $('.img').stop().animate({
            left: -$scope.num * winW
        }, 300);
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
    // 下载
    $scope.downloadIDCard=function(urla,urlb,name,idCard,id,home,own,header){
        if(home || own || header)
        {
            window.open('/entry/downloadToZip?orderId='+id+'');
        }else{
            window.open('/entry/pdfDownload?pdfDownload=idCardPicUrlAKey:'+urla+','+'idCardPicUrlBKey:'+urlb+','+'name:'+name+','+'idCard:'+idCard+','+'appId:'+config.appId+','+'token:'+sessionStorage.getItem('token')+','+'userId:'+sessionStorage.getItem('userId'));
        }
    }

    //跳转到详情页
    $scope.goDetail=function(id,key){
        $scope.goBackFun();
        $location.path('order/allDetail/'+id+'/'+key);
    }
});
