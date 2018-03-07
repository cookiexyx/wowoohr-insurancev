angular.module('appmvc')
	.controller('InsuranceAddCtrl', function InsuranceAddCtrl($scope, $rootScope, appServices, $location,pagenation,$routeParams) {
		'use strict';
	$scope.titleName = '添加社保公积金';
	$scope.addSucessLink = true;
	var dateCurrent=new Date;
	var monthCurrent=dateCurrent.getMonth()+1;
	var yearCurrent=dateCurrent.getFullYear();
	monthCurrent =(monthCurrent<10 ? "0"+monthCurrent:monthCurrent); 
	$scope.dateCurrent=yearCurrent.toString()+monthCurrent.toString();
	var thisOrLastMonth=yearCurrent+"-"+monthCurrent;
	var thisOrLastMonth2;
	if(monthCurrent>1){
		var monthCurrent2=monthCurrent-1;
		monthCurrent2 =(monthCurrent2<10 ? "0"+monthCurrent2:monthCurrent2); 
		thisOrLastMonth2=yearCurrent+"-"+monthCurrent2;
		$scope.dateYesterday=yearCurrent.toString()+monthCurrent2.toString();
	}else{
		var yearCurrent2=yearCurrent-1;
		thisOrLastMonth2=yearCurrent2+"-12";
		$scope.dateYesterday=yearCurrent2.toString()+"12";
	}


	//1-31初始化
	$scope.dateList=[];
	for (var d =1;d<32;d++){
		$scope.dateList.push({"key":d.toString(),"value":d.toString()});
    }
	// 弹框初始化数据
	$scope.addNewList = {
    	  type:"",  //险种类型
          payMethMap:"",        //收款方式
          startMonth: "",        // 生效月
          endMonth: "",           //失效月              
          firstReceivablesMonthMap:"",   // 首次收款月数  
          nextGenerationMonth: "1",                // 次年生成月 
          eFixedAmount: "",           //企业固定金额
          pFixedAmount: "",           //个人固定金额
          eCarryRuleMap: "",   //企业进位规则
          pCarryRuleMap: "",   //  个人近位规则
          applyEndDay: "1",           //增员截止日
          applyEndDayTypeMap:"",        // 增员截止日类型
          terminationEndDay: "1",    //"减员截止日
          terminationEndDayTypeMap:"",   //减员截止日类型
          eBaseUp: "",         //企业 基数上限
          eBaseDown: "",     // 企业 基数下限
          pBaseUp: "",       //  个人 基数上限
          pBaseDown: "",      //个人 基数下限
          eProportion: "",    // 企业缴纳比例
          pProportion: "",    //  个人 缴纳比例
          isForceConscience: "2"    //是否强制补交
    }

	// 获取数据渲染页面
	appServices.insuranceAdd.save().$promise.then(function(data){
		$scope.result = data.result;
		// 初始化select/其他 数据
		$scope.resultList.type = $scope.result.product_tyte[0].key;
		$scope.resultList.cityCode = $scope.result.cityList[0].key;
		$scope.addNewList.productType = $scope.result.insurance_type[0];  //选择险种
		$scope.insurance_typeCopy=$scope.result.insurance_type;
		$scope.addNewList.payMethMap = $scope.result.payment_method[0];  //收款方式
		$scope.addNewList.firstReceivablesMonthMap = $scope.result.first_receivables_month[0];  //首次收款月数
		$scope.addNewList.eCarryRuleMap = $scope.result.carry_rule[0];  // 进位规则
		$scope.addNewList.pCarryRuleMap = $scope.result.carry_rule[0]; //进位规则
		$scope.addNewList.applyEndDayTypeMap = $scope.result.apply_end_day_type[0]; // 增员截止日
		$scope.addNewList.terminationEndDayTypeMap = $scope.result.termination_end_day_type[0];  // 减员截止日
		$scope.result.payment_methodCopy=angular.copy($scope.result.payment_method);
	});

	// 传输后端 初始化数据
	$scope.resultList = {
		type:"",   //产品类型 
		cityCode:"",   //服务城市
		name:"",   //产品名称 
		vendorServiceFee:"",  //  服务费
		remarks:"",      // 备注信息
		newMaterial:[],      // 选择新增参保资料
		renewMaterial:[],  //保参保材料
		insuranceFormList:"",   //  列表
		societyAverageWage:""  //社会平均工资  
	}
	$scope.resultList.insuranceFormList=[];

	

    // 参保材料 选中
    $scope.checked = function(index){
    	$scope[index]=!$scope[index];
    }

    //  增员截止日/减员截止日 radio
    $scope.radioChanged=function(argument,argument2,object,index) {
		$scope[argument][argument2]=angular.copy($scope.result[object][index]);
    }

    // 删除列表
	$scope.delete_tr = function(index){
		var item = $('.billMessage-singlePop');
        $rootScope.alertPop(item);
        $scope.deleteID = index;        
	}
	$scope.confirm_deletion = function(){
		$(".insuranceAddList"+$scope.deleteID).animate({"opacity":"0"},'300');
		$(".insuranceAddList"+$scope.deleteID).slideUp("300");
		setTimeout(function(){
			$scope.resultList.insuranceFormList.splice($scope.deleteID,1);
			$scope.$apply();
		},300);
		$rootScope.closePop();
		$rootScope.successPop('删除成功');
	}
	// 添加险种change事件
	$scope.productTypeChange=function(object){
		if(object.value=='公积金'){
			angular.forEach($scope.result.payment_method, function(data2,index2,array2){
				if(data2.key == "1"){
					$scope.result.payment_method.splice(index2,1);
				}
	        });
			$scope.sendDetail.payMethMap=$scope.result.payment_method[0];
		}else{
			$scope.result.payment_method=angular.copy($scope.result.payment_methodCopy);
		}
	}

	//返回按钮check
	$scope.goBack=function() {
		// $rootScope.gobackUrl=true;
		if($scope.stepshow==1){
			if($scope.resultList.type==$scope.result.product_tyte[0].key&&$scope.resultList.cityCode == $scope.result.cityList[0].key&&$scope.resultList.societyAverageWage==''&&$scope.resultList.name==''&&$scope.resultList.vendorServiceFee==''&&$scope.resultList.remarks==''){
				history.go(-1);
			}else{
				var item = $('.giveUp-pop');
        		$rootScope.alertPop(item);
			}
		}else{
			var item = $('.giveUp-pop');
    		$rootScope.alertPop(item);
		}
	}
	$scope.continueFun=function() {
		$rootScope.closePop();
		history.go(-1);
	}

	//保存成功返回url
    $scope.goUrl=function(url){
        // $rootScope.gobackUrl=true;
        $location.path(url);
    }

	//复制列表
	$scope.copy_tr = function(index){
		$(".input-err small").hide();
			$scope.sendDetail=angular.copy($scope.resultList.insuranceFormList[index]);
			// $scope.sendDetail = angular.copy($scope.addNewList);
			// 社保/公积金 二选一
			$scope.result.insurance_type=angular.copy($scope.insurance_typeCopy);
			if($scope.resultList.type == 1)
			{
				angular.forEach($scope.result.insurance_type, function(data,index,array){
					if(data.value == "公积金"){
						$scope.result.insurance_type.splice(index,1);
					}
		        });
			}
			else if($scope.resultList.type == 2)
			{
				$scope.typeList={};
				angular.forEach($scope.result.insurance_type, function(data,index,array){
					if(data.value == "公积金"){
						$scope.typeList=data;
					}
		        });
		        $scope.result.insurance_type=[];
		        $scope.result.insurance_type.push($scope.typeList);
			}
		    $scope.sendDetail.productType = $scope.result.insurance_type[0];
			if($scope.sendDetail.productType.value=='公积金'){
				angular.forEach($scope.result.payment_method, function(data2,index2,array2){
					if(data2.key == "1"){
						$scope.result.payment_method.splice(index2,1);
					}
		        });
		        // $scope.sendDetail.payMethMap=$scope.result.payment_method[0];
			}else{
				$scope.result.payment_method=angular.copy($scope.result.payment_methodCopy);
				// $scope.sendDetail.payMethMap=$scope.result.payment_method[0];
			}
		var item = $('.insurance-pop-add');
        $rootScope.alertPop(item);
        $(".insurance-pop-month .insurance-pop-month-title label").text("复制险种");
		$(".insurance-pop-month .footer button:first").text("确认复制");
        $scope.layerHeight();
	}

	// 添加 弹框
	$scope.confirm_month = function(){
		$(".input-err small").hide();
		
			// $scope.sendDetail = angular.copy($scope.addNewList);
			// 社保/公积金 二选一
			$scope.result.insurance_type=angular.copy($scope.insurance_typeCopy);
			if($scope.resultList.type == 1)
			{
				angular.forEach($scope.result.insurance_type, function(data,index,array){
					if(data.value == "公积金"){
						$scope.result.insurance_type.splice(index,1);
					}
		        });
			}
			else if($scope.resultList.type == 2)
			{
				$scope.typeList={};
				angular.forEach($scope.result.insurance_type, function(data,index,array){
					if(data.value == "公积金"){
						$scope.typeList=data;
					}
		        });
		        $scope.result.insurance_type=[];
		        $scope.result.insurance_type.push($scope.typeList);
			}
			$scope.addNewList.productType = $scope.result.insurance_type[0];
			 if($scope.addNewList.productType.value=='公积金'){
					angular.forEach($scope.result.payment_method, function(data2,index2,array2){
						if(data2.key == "1"){
							$scope.result.payment_method.splice(index2,1);
						}
			        });
			        $scope.addNewList.payMethMap=$scope.result.payment_method[0];
				}else{
					$scope.result.payment_method=angular.copy($scope.result.payment_methodCopy);
					$scope.addNewList.payMethMap=$scope.result.payment_method[0];
				}
			var parsestr=JSON.stringify($scope.addNewList);
			$scope.sendDetail=JSON.parse(parsestr);

		var item = $('.insurance-pop-add');
        $rootScope.alertPop(item);
        $(".insurance-pop-month .insurance-pop-month-title label").text("添加险种");
		$(".insurance-pop-month .footer button:first").text("确认添加");
        $scope.layerHeight();
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
	            	$scope.$apply();
	                event.preventDefault();
	            }
	        });
        },300);
	}
	// 添加 resultList  列表数据
   	$scope.addInsurance = function(){
   		var status=true;
		if($scope.sendDetail.startMonth==""){
			$(".startMonth-err").show();
			status=false;
		}
		if($scope.sendDetail.payMethMap.key==2){
			if(!$scope.checkBase('sendDetail','eBaseUp','eBaseUp-err',$scope.sendDetail.eBaseUp,true)){
				status=false;
			}
			if(!$scope.checkBase('sendDetail','pBaseUp','pBaseUp-err',$scope.sendDetail.pBaseUp,true)){
				status=false;
			}
			if(!$scope.checkBase('sendDetail','eBaseDown','eBaseDown-err',$scope.sendDetail.eBaseDown,true)){
				status=false;
			}
			if(!$scope.checkBase('sendDetail','pBaseDown','pBaseDown-err',$scope.sendDetail.pBaseDown,true)){
				status=false;
			}
			if(!$scope.checkProportion('sendDetail','eProportion','eProportion-err',$scope.sendDetail.eProportion,true)){
				status=false;
			}
			if(!$scope.checkProportion('sendDetail','pProportion','pProportion-err',$scope.sendDetail.pProportion,true)){
				status=false;
			}
		}else{
			delete $scope.sendDetail.eBaseUp;
			delete $scope.sendDetail.pBaseUp;
			delete $scope.sendDetail.eBaseDown;
			delete $scope.sendDetail.pBaseDown;
			delete $scope.sendDetail.eProportion;
			delete $scope.sendDetail.pProportion;
			delete $scope.sendDetail.isForceConscience;
		}
		if(!$scope.checkBase('sendDetail','eFixedAmount','eFixedAmount-err',$scope.sendDetail.eFixedAmount,true)){
			status=false;
		}
		if(!$scope.checkBase('sendDetail','pFixedAmount','pFixedAmount-err',$scope.sendDetail.pFixedAmount,true)){
			status=false;
		}
		if(status){
			var startMonth=$scope.sendDetail.startMonth.split("-")[1];
			var startYear=$scope.sendDetail.startMonth.split("-")[0];
			startMonth =(startMonth<10 ? "0"+Number(startMonth):startMonth); 
			var endDate="";
			if($scope.sendDetail.endMonth){
				var endMonth=$scope.sendDetail.endMonth.split("-")[1];
				var endYear=$scope.sendDetail.endMonth.split("-")[0];
				endMonth =(endMonth<10 ? "0"+Number(endMonth):endMonth); 
				endDate=endYear.toString()+endMonth.toString();
			}
			var startDate=startYear.toString()+startMonth.toString();
			if(endDate){
				if(startDate>endDate){
					$rootScope.errAlert('失效月不能早于生效月');
					return false;
				}
			}
			
			if($scope.sendDetail.payMethMap.key==2){
				if($scope.sendDetail.eBaseUp<$scope.sendDetail.eBaseDown){
					$rootScope.errAlert('企业基数上限不能小于基数下限');
					return false;
				}
				if($scope.sendDetail.pBaseUp<$scope.sendDetail.pBaseDown){
					$rootScope.errAlert('个人基数上限不能小于基数下限');
					return false;
				}
			}
			if($scope.resultList.insuranceFormList){
				$scope.resultList.insuranceFormList.unshift(angular.copy($scope.sendDetail));
			}
   			$rootScope.closePop();
			if($(".insurance-pop-month .insurance-pop-month-title label").html()=="添加险种"){
				$rootScope.successPop('添加成功');
			}else if($(".insurance-pop-month .insurance-pop-month-title label").html()=="复制险种"){
				$rootScope.successPop('复制成功');
			}


		}
   		
   	}

	// 修改 弹框
	$scope.modifyLayer = function(index){
		$(".input-err small").hide();
		$scope.indexM =index;
		$scope.modifyList = angular.copy($scope.resultList.insuranceFormList[index]);
		var startMonth=$scope.modifyList.startMonth.split("-")[1];
		var startYear=$scope.modifyList.startMonth.split("-")[0];
		var endMonth="";
		var endYear="";
		var endDate="";
		if($scope.modifyList.endMonth){
			endMonth=$scope.modifyList.endMonth.split("-")[1];
			endYear=$scope.modifyList.endMonth.split("-")[0];
			endMonth =(endMonth<10 ? "0"+Number(endMonth):endMonth); 
			endDate=endYear.toString()+endMonth.toString();
		}
		startMonth =(startMonth<10 ? "0"+Number(startMonth):startMonth); 
		var startDate=startYear.toString()+startMonth.toString();
		if(!endDate&&startDate>=$scope.dateYesterday){
			$scope.startDisabled=false;
			$scope.endDisabled=false;
		}else if(!endDate&&startDate<$scope.dateYesterday){
			$scope.startDisabled=true;
			$scope.endDisabled=false;
		}else{
			if(endDate<$scope.dateYesterday){
				$scope.startDisabled=true;
				$scope.endDisabled=true;
			}else if(endDate>=$scope.dateYesterday&&startDate<$scope.dateYesterday){
				$scope.startDisabled=true;
				$scope.endDisabled=false;
			}else{
				$scope.startDisabled=false;
				$scope.endDisabled=false;
			}
		}
		var item = $('.insurance-pop-modify');
        $rootScope.alertPop(item);
        $(".insurance-pop-month .insurance-pop-month-title label").text("修改险种");
		$(".insurance-pop-month .footer button:first-child").text("确认修改");
		// 解决键盘 delete快捷键 删除问题 
		setTimeout(function(){
			$scope.datetimepicker3Array = [];
        	$("#datetimepicker3").on("click",function(){
        		if($("#datetimepicker3").val().toString().length > 0 && $("#datetimepicker3").val() != 'Invalid date' ){
        			$scope.datetimepicker3Array.push($("#datetimepicker3").val());
        		}
        	});
        	$("#datetimepicker3").on("keydown",function(event){ 
	            if(event.keyCode == 46){
	            	$("#datetimepicker3").val($scope.datetimepicker3Array[$scope.datetimepicker3Array.length-1]);
	            	$scope.$apply();
	                event.preventDefault();
	            }
	        });
        	
        	$scope.datetimepicker4Array = [];
        	$("#datetimepicker4").on("click",function(){
        		if($("#datetimepicker4").val().toString().length > 0 && $("#datetimepicker4").val() != 'Invalid date' ){
        			$scope.datetimepicker4Array.push($("#datetimepicker4").val());
        		}
        	});
        	$("#datetimepicker4").on("keydown",function(event){ 
	            if(event.keyCode == 46){
	            	$("#datetimepicker4").val($scope.datetimepicker4Array[$scope.datetimepicker4Array.length-1]);
	            	$scope.$apply();
	                event.preventDefault();
	            }
	        });
		},300)
	}
	//修改 resultList  列表数据
	$scope.modifyListBtn = function(){
		var status=true;
		if($scope.modifyList.startMonth==""){
			$(".startMonth-err").show();
			status=false;
		}
		if($scope.modifyList.payMethMap.key==2){
			if(!$scope.checkBase('modifyList','eBaseUp','eBaseUp-err',$scope.modifyList.eBaseUp,true)){
				status=false;
			}
			if(!$scope.checkBase('modifyList','pBaseUp','pBaseUp-err',$scope.modifyList.pBaseUp,true)){
				status=false;
			}
			if(!$scope.checkBase('modifyList','eBaseDown','eBaseDown-err',$scope.modifyList.eBaseDown,true)){
				status=false;
			}
			if(!$scope.checkBase('modifyList','pBaseDown','pBaseDown-err',$scope.modifyList.pBaseDown,true)){
				status=false;
			}
			if(!$scope.checkProportion('modifyList','eProportion','eProportion-err',$scope.modifyList.eProportion,true)){
				status=false;
			}
			if(!$scope.checkProportion('modifyList','pProportion','pProportion-err',$scope.modifyList.pProportion,true)){
				status=false;
			}
		}else{
			delete $scope.modifyList.eBaseUp;
			delete $scope.modifyList.pBaseUp;
			delete $scope.modifyList.eBaseDown;
			delete $scope.modifyList.pBaseDown;
			delete $scope.modifyList.eProportion;
			delete $scope.modifyList.pProportion;
			delete $scope.modifyList.isForceConscience;
		}
		
		if(!$scope.checkBase('modifyList','eFixedAmount','eFixedAmount-err',$scope.modifyList.eFixedAmount,true)){
			status=false;
		}
		if(!$scope.checkBase('modifyList','pFixedAmount','pFixedAmount-err',$scope.modifyList.pFixedAmount,true)){
			status=false;
		}


		if(status){
			var startMonth=$scope.modifyList.startMonth.split("-")[1];
			var startYear=$scope.modifyList.startMonth.split("-")[0];
			startMonth =(startMonth<10 ? "0"+Number(startMonth):startMonth); 
			var endDate="";
			if($scope.modifyList.endMonth){
				var endMonth=$scope.modifyList.endMonth.split("-")[1];
				var endYear=$scope.modifyList.endMonth.split("-")[0];
				endMonth =(endMonth<10 ? "0"+Number(endMonth):endMonth); 
				endDate=endYear.toString()+endMonth.toString();
			}
			var startDate=startYear.toString()+startMonth.toString();
			if(endDate){
				if(startDate>endDate){
					$rootScope.errAlert('失效月不能早于生效月');
					return false;
				}
			}
			
			if($scope.modifyList.payMethMap.key==2){
				if($scope.modifyList.eBaseUp<$scope.modifyList.eBaseDown){
					$rootScope.errAlert('企业基数上限不能小于基数下限');
					return false;
				}
				if($scope.modifyList.pBaseUp<$scope.modifyList.pBaseDown){
					$rootScope.errAlert('个人基数上限不能小于基数下限');
					return false;
				}
			}
			
			$scope.resultList.insuranceFormList[$scope.indexM]=angular.copy($scope.modifyList);
			$rootScope.closePop();
			$rootScope.successPop('修改成功');
		}
		
	}

	// 提交数据给后端
	$scope.confirm_add = function(){
		if($scope.resultList.insuranceFormList.length == 0)
		{
			var item = $('.insurance-pop');
        	$rootScope.alertPop(item);
		}else if($scope.sortMonth()){
			$rootScope.errAlert($scope.sortMonth());
			return false;
		}
		else
		{
			var insuranceFormListCopy = angular.copy($scope.resultList);
			angular.forEach(insuranceFormListCopy.insuranceFormList, function(data,index,array){
				insuranceFormListCopy.insuranceFormList[index].type=data.productType.key;
				insuranceFormListCopy.insuranceFormList[index].paymentMethod=data.payMethMap.key;
				insuranceFormListCopy.insuranceFormList[index].firstReceivablesMonth=data.firstReceivablesMonthMap.key;
				insuranceFormListCopy.insuranceFormList[index].eCarryRule=data.eCarryRuleMap.key;
				insuranceFormListCopy.insuranceFormList[index].pCarryRule=data.pCarryRuleMap.key;
				insuranceFormListCopy.insuranceFormList[index].applyEndDayType=data.applyEndDayTypeMap.key;
				insuranceFormListCopy.insuranceFormList[index].terminationEndDayType=data.terminationEndDayTypeMap.key;
				insuranceFormListCopy.insuranceFormList[index].insuranceState=1;
				delete data.productType;
				delete data.payMethMap;
				delete data.firstReceivablesMonthMap;
				delete data.eCarryRuleMap;
				delete data.pCarryRuleMap;
				delete data.applyEndDayTypeMap;
				delete data.terminationEndDayTypeMap;
	        });
			appServices.insuranceAddSave.save(
	            insuranceFormListCopy
	        ).$promise.then(function(data){
	        	$scope.addSucessLink = false;
	        });	
		}
	}

	//  下一步 
	$scope.stepshow = 1;
	$scope.stepWidth = 0;
	$scope.saveStep = function(thepage){
		switch(parseInt(thepage))
		{
			case 1:
				$scope.stepshow = 1;
				$scope.stepWidth = {"width" : 33.33*$scope.stepshow+"%"};
			  	break;
			case 2:
				var status=true;
				if(!$scope.checkBase8('resultList','vendorServiceFee','fee-err',$scope.resultList.vendorServiceFee,true)){
					$(".fee-err").show();
					$(".fee-err").siblings('input').focus();
					status=false;
				}
				if(!$scope.resultList.name){
					$(".name-err").show();
					$(".name-err").siblings('input').focus();
					status=false;
				}
				if(!$scope.checkBase('resultList','societyAverageWage','societyfee-err',$scope.resultList.societyAverageWage,true)){
					$(".societyfee-err").show();
					$(".societyfee-err").siblings('input').focus();
					status=false;
				}
				if(status){
					$scope.stepshow = 2;
					$scope.stepWidth = {"width" : 33.33*$scope.stepshow+"%"};
				}
				break;
			case 3:
				// 将选中 参保材料 放到数组
				$scope.resultList.renewMaterial=[];
				$scope.resultList.newMaterial=[];
				angular.forEach($scope.result.new_meterial_type, function(data,index,array){
					if($scope['newChecked'+data.key]){
						$scope.resultList.newMaterial.push(Number(data.key));
					}
		        });
		        angular.forEach($scope.result.renew_meterial_type, function(data,index,array){
					if($scope['renewChecked'+data.key]){
						$scope.resultList.renewMaterial.push(Number(data.key));
					}
		        });
		        if($scope.resultList.newMaterial.length+$scope.resultList.renewMaterial.length<1){
		        	$rootScope.errAlert('请选择参保资料');
		        }else{
					$scope.stepshow = 3;
					$scope.stepWidth = {"width" : 33.33*$scope.stepshow+"%"};
		        }
				break;
		}	
	}

	$('#datetimepicker1').datetimepicker({
        useCurrent: false,//Important! See issue #1075
        format: 'YYYY-MM',
        locale: 'zh-cn',
        ignoreReadonly: true,
        showTodayButton: true,
        minDate:thisOrLastMonth2
    }).on('dp.change', function(ev){
       	$(".startMonth-err").hide();
	       var result = new moment(ev.date).format('YYYY-MM');  
    	   $scope.sendDetail.startMonth = result;  
   		   $scope.$apply();
	});
	$('#datetimepicker2').datetimepicker({
        useCurrent: false,//Important! See issue #1075
        format: 'YYYY-MM',
        locale: 'zh-cn',
        ignoreReadonly: true,
        showTodayButton: true,
        minDate:thisOrLastMonth2
    }).on('dp.change', function(ev){
	       var result = new moment(ev.date).format('YYYY-MM');  
    	   $scope.sendDetail.endMonth = result;  
   		   $scope.$apply();
	});
	$('#datetimepicker3').datetimepicker({
        useCurrent: false,//Important! See issue #1075
        format: 'YYYY-MM',
        locale: 'zh-cn',
        ignoreReadonly: true,
        showTodayButton: true,
        minDate:thisOrLastMonth2
    }).on('dp.change', function(ev){
       	$(".startMonth-err").hide();
       var result = new moment(ev.date).format('YYYY-MM');  
	   $scope.modifyList.startMonth = result;  
		   $scope.$apply();
	});
	$('#datetimepicker4').datetimepicker({
        useCurrent: false,//Important! See issue #1075
        format: 'YYYY-MM',
        locale: 'zh-cn',
        ignoreReadonly: true,
        showTodayButton: true,
        minDate:thisOrLastMonth2
    }).on('dp.change', function(ev){
       var result = new moment(ev.date).format('YYYY-MM');  
	   $scope.modifyList.endMonth = result;  
		   $scope.$apply();
	});
	

	$scope.dateBlur=function(id,value1,value2){
		$scope[value1][value2]=$("#"+id).val();
	}


	//  弹框内容高度
	$scope.layerHeight = function(){
		$(".input-err small").hide();
		setTimeout(function(){
			var layerH = document.documentElement.clientHeight;
			$(".insurance-pop-month").each(function(){
				if($(this).is(":visible"))
				{
					var contH = $(this).height();
				}
				if(contH > layerH){
					$(".insurance-pop-month").css("height",layerH+"px");
				}
			});
		},50);
	}

	//check校验
	$scope.checkBase8=function(str1,str2,object,value,empty) {
		if(value||value===0){
			$scope[str1][str2] = Number(value);
			if(!$rootScope.checkMoney($scope[str1][str2])&&$scope[str1][str2]!=100000000){
				$("."+object).show();
				return false;
			}else{
				return true;
			}
		}else{
			if(empty){
				$("."+object).show();	
				return false;
			}
		}
	}

	//2位整数两位小数校验
	$scope.checkProportion=function(str1,str2,object,value,empty) {
		if(value||value===0){
			$scope[str1][str2] = Number(value);
			if(!$rootScope.checkMoney2($scope[str1][str2])&&$scope[str1][str2]!=100){
				$("."+object).show();
				return false;
			}else{
				return true;
			}
		}else{
			if(empty){
				$("."+object).show();	
				return false;
			}
		}
	}

	//5位整数两位小数校验
	$scope.checkBase=function(str1,str2,object,value,empty) {
		if(value||value===0){
			$scope[str1][str2] = Number(value);
			if(!$rootScope.checkMoney5($scope[str1][str2])&&$scope[str1][str2]!=100000){
				$("."+object).show();
				return false;
			}else{
				return true;
			}
		}else{
			if(empty){
				$("."+object).show();	
				return false;
			}
		}
	}

	//按养老排序
	$scope.sort=function() {
		var sortList=[];
		angular.forEach($scope.insurance_typeCopy, function(data,index,array){
			angular.forEach($scope.resultList.insuranceFormList, function(data2,index2,array2){
				if(data2.productType.key==data.key){
					sortList.push(data2);
				}
        	});
        });
        $scope.resultList.insuranceFormList=sortList;
	}

	$scope.sortMonth=function(){
		var productTypeIf3=false;
		var productTypeIf12=false;
		$scope.startMonthCheck=[];
		angular.forEach($scope.insurance_typeCopy, function(data,index,array){
			angular.forEach($scope.resultList.insuranceFormList, function(data2,index2,array2){
				if(data2.productType.key==data.key){
					$scope.startMonthCheck[index]=[];
				}
        	});
        });
		angular.forEach($scope.insurance_typeCopy, function(data,index,array){
			angular.forEach($scope.resultList.insuranceFormList, function(data2,index2,array2){
				if(data2.productType.key==data.key){
					$scope.startMonthCheck[index].push(data2);
				}
				//社保类型为社保公积金时，必须同时用社保和公积金的险种
				if($scope.resultList.type==3&&index==0){	
					if(data2.productType.value=="公积金"){
						productTypeIf3=true;
					}else{
						productTypeIf12=true;
					}
				}
        	});
        });

        if($scope.resultList.type==3&&(!(productTypeIf3&&productTypeIf12))){
			if(!productTypeIf3){
				return '社保公积金产品缺少公积金险种';
			}else{
				return '社保公积金产品缺少社保险种';
			}
		}

        for(var i=0;i<$scope.startMonthCheck.length;i++){
        	if($scope.startMonthCheck[i]&&$scope.startMonthCheck[i].length>0){
	        	for(var j=0;j<$scope.startMonthCheck[i].length;j++){
	        		var startMonth=$scope.startMonthCheck[i][j].startMonth.split("-")[1];
					var startYear=$scope.startMonthCheck[i][j].startMonth.split("-")[0];
					startMonth =(startMonth<10 ? "0"+Number(startMonth):startMonth); 
					var endDate="";
					if($scope.startMonthCheck[i][j].endMonth){
						var endMonth=$scope.startMonthCheck[i][j].endMonth.split("-")[1];
						var endYear=$scope.startMonthCheck[i][j].endMonth.split("-")[0];
						endMonth =(endMonth<10 ? "0"+Number(endMonth):endMonth); 
						endDate=endYear.toString()+endMonth.toString();
					}
					var startDate=startYear.toString()+startMonth.toString();
					$scope.startMonthCheck[i][j].startDate = startDate;
					$scope.startMonthCheck[i][j].endDate = endDate;
	        	}
	        	var test = $scope.startMonthCheck[i].sort(compare('startDate'));
				var checkMonth = $scope.checkMonth(test);
				return checkMonth;
			}
        }
	}


	$scope.checkMonth=function(object) {
		var endDateTime=0;
		var err='';
		for(var i=0;i<object.length;i++){
			if(!object[i].endDate){
				endDateTime=endDateTime+1;
			}
			if(endDateTime>1){
				err=object[i].productType.value+'险种的失效月最多只能有一项不填';
				return err;
			}else if(i>0){
				if(object[i-1].endDate==""&&object[i].startDate<=object[i-1].startDate){
					err=object[i].productType.value+'险种生效失效月时间有交叉';
					return err;
				}else if(object[i].startDate<=object[i-1].endDate){
					err=object[i].productType.value+'险种生效失效月时间有交叉';
					return err;
				}
			}
		}
		if(!err){
			return false;
		}
	}

	function compare(property){
	    return function(a,b){
	        var value1 = a[property];
	        var value2 = b[property];
	        return value1 - value2;
	    }
	}

});
