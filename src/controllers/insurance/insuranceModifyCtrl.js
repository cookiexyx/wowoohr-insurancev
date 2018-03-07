angular.module('appmvc')
	.controller('InsuranceModifyCtrl', function InsuranceModifyCtrl($scope, $timeout,$rootScope, appServices, $location,pagenation,$routeParams) {
		'use strict';
	$scope.titleName = '修改社保公积金';
	$scope.addSucessLink = true;
	$scope.auditState=$routeParams.auditState;
    $scope.dateList=[];
	for (var d =1;d<32;d++){
		$scope.dateList.push({"key":d.toString(),"value":d.toString()});
    }
    var dateCurrent=new Date;
	var monthCurrent=dateCurrent.getMonth()+1;
	var yearCurrent=dateCurrent.getFullYear();
	// monthCurrent =(monthCurrent<10 ? "0"+monthCurrent:monthCurrent); 
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
	$scope.addNewList2 = {
    	  productType:"",
          payMethMap:"",
          startMonth: "",
          endMonth: "",
          firstReceivablesMonthMap:"",    
          nextGenerationMonth: "1",
          eFixedAmount: "",
          pFixedAmount: "",
          eCarryRuleMap: "", 
          pCarryRuleMap: "",
          applyEndDay: "1",
          applyEndDayTypeMap:"",
          terminationEndDay:"1",
          terminationEndDayTypeMap:"",
          eBaseUp: "",
          eBaseDown: "",
          pBaseUp: "",
          pBaseDown: "",
          eProportion: "",
          pProportion: "",
          insuranceState:1,
          isForceConscience:"2"
    }
    
    $scope.checked=function(argument){
    	$scope[argument]=!$scope[argument];
    }
	$scope.init=function() {
        appServices.insuranceAdd.save().$promise.then(function(data){
            $scope.options = data.result;
            $scope.insurance_typeCopy=$scope.options.insurance_type;
            $scope.addNewList2.productType=$scope.options.product_tyte[0];
            $scope.addNewList2.applyEndDayTypeMap = $scope.options.apply_end_day_type[0];
            $scope.addNewList2.terminationEndDayTypeMap = $scope.options.termination_end_day_type[0];
            $scope.addNewList2.eCarryRuleMap = $scope.options.carry_rule[0];
            $scope.addNewList2.pCarryRuleMap = $scope.options.carry_rule[0];
            $scope.addNewList2.firstReceivablesMonthMap = $scope.options.first_receivables_month[0];
            $scope.addNewList2.payMethMap = $scope.options.payment_method[0];
            $scope.options.payment_methodCopy=angular.copy($scope.options.payment_method);
            if($scope.auditState=="auditLogId"){
            	var dataId={'auditId':$routeParams.id};
            }else{
            	var dataId={'productId':$routeParams.id};
            }
            appServices.insuranceDetail.save(dataId).$promise.then(function(data){
			    $scope.result = data.result;
			    // 处理换行问题
			    if(data.result.remarks&&data.result.remarks.indexOf("\\n") >= 0){
			    	$scope.result.remarks=data.result.remarks.replace(/\\n/g,"\n");
			    }
			    else{
			    	$scope.result.remarks=data.result.remarks;
			    }
			     //replace(/(\\n)/g,"$1\n")
			    // $scope.result.remarks=$scope.result.remarks.replace(/(\\n)/g,"");   
			    $scope.resultCopy = angular.copy(data.result); 
			    $scope.insuranceFormList=data.result.insuranceList;
				$scope.insuranceFormListCopy2=data.result.insuranceList;
			    angular.forEach($scope.insuranceFormList, function(data,index,array){
			    	// 拒绝状态特殊处理
			    	if($scope.result.auditStatus.key!=2){
			    		$scope.insuranceFormList[index].insuranceState=3;
			    	}
		            $scope.insuranceFormList[index].applyEndDay=$scope.insuranceFormList[index].applyEndDay.toString();
		            $scope.insuranceFormList[index].terminationEndDay=$scope.insuranceFormList[index].terminationEndDay.toString();
		        });
			    angular.forEach($scope.result.newMaterialList, function(data,index,array){
		            $scope['newChecked'+data.key]=true;
		        });
		        angular.forEach($scope.result.renewMaterialList, function(data,index,array){
		            $scope['renewChecked'+data.key]=true;
		        });
			});
    	});
    }
    $scope.init();

    //返回按钮check
	$scope.goBack=function() {
		if($scope.stepshow==1){
			if($scope.result.societyAverageWage==$scope.resultCopy.societyAverageWage&&$scope.result.name==$scope.resultCopy.name&&$scope.result.vendorServiceFee==$scope.resultCopy.vendorServiceFee&&$scope.result.remarks==$scope.resultCopy.remarks){
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
	//险种change事件
	$scope.productTypeChange=function(object){
		if(object.value=='公积金'){
			angular.forEach($scope.options.payment_method, function(data2,index2,array2){
				if(data2.key == 1){
					$scope.options.payment_method.splice(index2,1);
				}
	        });
			$scope.addNewList.payMethMap=$scope.options.payment_method[0];
		}else{
			$scope.options.payment_method=angular.copy($scope.options.payment_methodCopy);
		}
	}
    //添加险种
    $scope.addLayer = function(type,index){
    	$(".input-err small").hide();

    	$scope.options.insurance_type=angular.copy($scope.insurance_typeCopy);
    	// 社保/公积金 二选一
		if($scope.result.productType.value == "社保")
		{
	        angular.forEach($scope.options.insurance_type, function(data,index,array){
				if(data.value == "公积金"){
					$scope.options.insurance_type.splice(index,1);
				}
	        });
		}
		else if($scope.result.productType.value == "公积金")
		{
	        $scope.typeList={};
			angular.forEach($scope.options.insurance_type, function(data,index,array){
				if(data.value == "公积金"){
					$scope.typeList=data;
				}
	        });
	        $scope.options.insurance_type=[];
	        $scope.options.insurance_type.push($scope.typeList);
		}
	    $scope.addNewList2.productType = $scope.options.insurance_type[0];
		if($scope.addNewList2.productType.value=='公积金'){
			angular.forEach($scope.options.payment_method, function(data2,index2,array2){
				if(data2.key == "1"){
					$scope.options.payment_method.splice(index2,1);
				}
	        });
	        $scope.addNewList2.payMethMap=$scope.options.payment_method[0];
		}else{
			$scope.options.payment_method=angular.copy($scope.options.payment_methodCopy);
			$scope.addNewList2.payMethMap=$scope.options.payment_method[0];
		}
    	$scope.addNewList=angular.copy($scope.addNewList2);

		var item = $('.insurance-pop-add');
        $rootScope.alertPop(item);
        $(".insurance-pop-month .insurance-pop-month-title label").text("添加险种");
        $(".insurance-pop-month .footer button:first-child").text("确认添加");
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

	//确认添加list
	$scope.addList=function(key) {
		var status=true;
		if($scope.addNewList.startMonth==""){
			$(".startMonth-err").show();
			status=false;
		}
		if($scope.addNewList.payMethMap.key==2){
			if(!$scope.checkBase('addNewList','eBaseUp','eBaseUp-err',$scope.addNewList.eBaseUp,true)){
				status=false;
			}
			if(!$scope.checkBase('addNewList','pBaseUp','pBaseUp-err',$scope.addNewList.pBaseUp,true)){
				status=false;
			}
			if(!$scope.checkBase('addNewList','eBaseDown','eBaseDown-err',$scope.addNewList.eBaseDown,true)){
				status=false;
			}
			if(!$scope.checkBase('addNewList','pBaseDown','pBaseDown-err',$scope.addNewList.pBaseDown,true)){
				status=false;
			}
			if(!$scope.checkProportion('addNewList','eProportion','eProportion-err',$scope.addNewList.eProportion,true)){
				status=false;
			}
			if(!$scope.checkProportion('addNewList','pProportion','pProportion-err',$scope.addNewList.pProportion,true)){
				status=false;
			}
		}else{
			delete $scope.addNewList.eBaseUp;
			delete $scope.addNewList.pBaseUp;
			delete $scope.addNewList.eBaseDown;
			delete $scope.addNewList.pBaseDown;
			delete $scope.addNewList.eProportion;
			delete $scope.addNewList.pProportion;
			delete $scope.addNewList.isForceConscience;
		}
		if(!$scope.checkBase('addNewList','eFixedAmount','eFixedAmount-err',$scope.addNewList.eFixedAmount,true)){
			status=false;
		}
		if(!$scope.checkBase('addNewList','pFixedAmount','pFixedAmount-err',$scope.addNewList.pFixedAmount,true)){
			status=false;
		}
		
		if(status){
			var startMonth=$scope.addNewList.startMonth.split("-")[1];
			var startYear=$scope.addNewList.startMonth.split("-")[0];
			startMonth =(startMonth<10 ? "0"+Number(startMonth):startMonth); 
			var endDate="";
			if($scope.addNewList.endMonth){
				var endMonth=$scope.addNewList.endMonth.split("-")[1];
				var endYear=$scope.addNewList.endMonth.split("-")[0];
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
			
			if($scope.addNewList.payMethMap.key==2){
				if($scope.addNewList.eBaseUp<$scope.addNewList.eBaseDown){
					$rootScope.errAlert('企业基数上限不能小于基数下限');
					return false;
				}
				if($scope.addNewList.pBaseUp<$scope.addNewList.pBaseDown){
					$rootScope.errAlert('个人基数上限不能小于基数下限');
					return false;
				}
			}
			$scope.insuranceFormList.unshift(angular.copy($scope.addNewList));
			$scope.insuranceFormListCopy2=angular.copy($scope.insuranceFormList);
			$rootScope.closePop();
			if($(".insurance-pop-month .insurance-pop-month-title label").html()=="添加险种"){
				$rootScope.successPop('添加成功');
			}else if($(".insurance-pop-month .insurance-pop-month-title label").html()=="复制险种"){
				$rootScope.successPop('复制成功');
			}

		}
    	
	}

	// 确认修改 
	$scope.modifyLayer = function(index){
		$(".input-err small").hide();
		$scope.indexM =index; 
		$scope.modifyList = angular.copy($scope.insuranceFormList[index]);
		$scope.modifyListBefore = angular.copy($scope.insuranceFormList[index]);
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
        $scope.layerHeight();
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
        },300);
	}

	//修改listbtn
	$scope.modifyListBtn = function(){
		var status=true;
		var isModify=true;
		//判断险种有没有修改过
		if(JSON.stringify($scope.modifyListBefore)==JSON.stringify($scope.modifyList)){
			isModify=false;
		}
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
			if($scope.result.auditStatus.key!=2){
	    		if($scope.modifyList.insuranceState==3){
					$scope.modifyList.insuranceState=2;
				}
	    	}else{
	    		if(isModify&&$scope.modifyList.insuranceState==3){
	    			$scope.modifyList.insuranceState=2;
	    		}
	    	}
			$scope.insuranceFormList[$scope.indexM]=angular.copy($scope.modifyList);
			$scope.insuranceFormListCopy2=angular.copy($scope.insuranceFormList);
			$rootScope.closePop();
			$rootScope.successPop('修改成功');
		}
		
	}

	//复制列表
	$scope.copy_tr = function(index){
		$scope.addNewList=angular.copy($scope.insuranceFormList[index]);
		$scope.addNewList.insuranceState=1;
		delete $scope.addNewList.id;
		$scope.addNewList.nextGenerationMonth=$scope.addNewList.nextGenerationMonth.toString();

		$(".input-err small").hide();

    	$scope.options.insurance_type=angular.copy($scope.insurance_typeCopy);
    	// 社保/公积金 二选一
		if($scope.result.productType.value == "社保")
		{
	        angular.forEach($scope.options.insurance_type, function(data,index,array){
				if(data.value == "公积金"){
					$scope.options.insurance_type.splice(index,1);
				}
	        });
		}
		else if($scope.result.productType.value == "公积金")
		{
	        $scope.typeList={};
			angular.forEach($scope.options.insurance_type, function(data,index,array){
				if(data.value == "公积金"){
					$scope.typeList=data;
				}
	        });
	        $scope.options.insurance_type=[];
	        $scope.options.insurance_type.push($scope.typeList);
		}
	     $scope.addNewList.productType = $scope.options.insurance_type[0];
		if($scope.addNewList.productType.value=='公积金'){
			angular.forEach($scope.options.payment_method, function(data2,index2,array2){
				if(data2.key == "1"){
					$scope.options.payment_method.splice(index2,1);
				}
	        });
	        // $scope.addNewList.payMethMap=$scope.options.payment_method[0];
		}else{
			$scope.options.payment_method=angular.copy($scope.options.payment_methodCopy);
			// $scope.addNewList.payMethMap=$scope.options.payment_method[0];
		}

		var item = $('.insurance-pop-add');
        $rootScope.alertPop(item);
        $(".insurance-pop-month .insurance-pop-month-title label").text("复制险种");
        $(".insurance-pop-month .footer button:first-child").text("确认复制");
        $scope.layerHeight();
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
		$timeout(function() {
			if($scope.insuranceFormList[$scope.deleteID].insuranceState==3||$scope.insuranceFormList[$scope.deleteID].insuranceState==2){
				$scope.insuranceFormList[$scope.deleteID].insuranceState=0;
				$scope.insuranceFormListCopy2=angular.copy($scope.insuranceFormList);
				$scope.forFun=function() {
					for(var i=0;i<$scope.insuranceFormListCopy2.length;i++){
					  	if($scope.insuranceFormListCopy2[i].insuranceState===0){
							$scope.insuranceFormListCopy2.splice(i,1);
							$scope.forFun();
						}
			  		}
				}
				$scope.forFun();
			}else{
				$scope.insuranceFormList.splice($scope.deleteID,1);
				$scope.$apply();
			}
		},300)
		$rootScope.closePop();
		$rootScope.successPop('删除成功');
	}

	

	//保存社保数据
	$scope.modifySave=function () {
		if((!$scope.insuranceFormListCopy2.length&&$scope.insuranceFormList.length != 0)||!$scope.insuranceFormList.length)
		{
			var item = $('.insurance-pop');
        	$rootScope.alertPop(item);
		}
		else if($scope.sortMonth()){
			$rootScope.errAlert($scope.sortMonth());
			return false;
		}else
		{
			var insuranceFormListCopy =  angular.copy($scope.result);
			insuranceFormListCopy.type = insuranceFormListCopy.productType.key;
			insuranceFormListCopy.cityCode = insuranceFormListCopy.cityMap.key;
			delete insuranceFormListCopy.productType;
			delete insuranceFormListCopy.auditStatus;
			delete insuranceFormListCopy.newMaterialList;
			delete insuranceFormListCopy.renewMaterialList;
			delete insuranceFormListCopy.cityMap;
	        angular.forEach(insuranceFormListCopy.insuranceList, function(data,index,array){
				insuranceFormListCopy.insuranceList[index].type=data.productType.key;
				insuranceFormListCopy.insuranceList[index].paymentMethod=data.payMethMap.key;
				if(data.payMethMap.key == 1){
					insuranceFormListCopy.insuranceList[index].firstReceivablesMonth=data.firstReceivablesMonthMap.key;
				}
				insuranceFormListCopy.insuranceList[index].eCarryRule=data.eCarryRuleMap.key;
				insuranceFormListCopy.insuranceList[index].pCarryRule=data.pCarryRuleMap.key;
				insuranceFormListCopy.insuranceList[index].applyEndDayType=data.applyEndDayTypeMap.key;
				insuranceFormListCopy.insuranceList[index].terminationEndDayType=data.terminationEndDayTypeMap.key;
				delete data.productType;
				delete data.payMethMap;
				delete data.firstReceivablesMonthMap;
				delete data.eCarryRuleMap;
				delete data.pCarryRuleMap;
				delete data.applyEndDayTypeMap;
				delete data.terminationEndDayTypeMap;
	        });
			insuranceFormListCopy.insuranceFormList = insuranceFormListCopy.insuranceList;
			delete insuranceFormListCopy.insuranceList;
			delete insuranceFormListCopy.insureTypeDetail;
			delete insuranceFormListCopy.showTerminal;
			appServices.insuranceModifySave.save(
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
				if(!$scope.checkBase8('result','vendorServiceFee','fee-err',$scope.result.vendorServiceFee,true)){
					$(".fee-err").show();
					$(".fee-err").siblings('input').focus();
					status=false;
				}
				if(!$scope.result.name){
					$(".name-err").show();
					$(".name-err").siblings('input').focus();
					status=false;
				}
				if(!$scope.checkBase('result','societyAverageWage','societyfee-err',$scope.result.societyAverageWage,true)){
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
				$scope.result.renewMaterial=[];
				$scope.result.newMaterial=[];
				angular.forEach($scope.options.new_meterial_type, function(data,index,array){
					if($scope['newChecked'+data.key]){
						$scope.result.newMaterial.push(Number(data.key));
					}
		        });
		        angular.forEach($scope.options.renew_meterial_type, function(data,index,array){
					if($scope['renewChecked'+data.key]){
						$scope.result.renewMaterial.push(Number(data.key));
					}
		        });
		        if($scope.result.newMaterial.length+$scope.result.renewMaterial.length<1){
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
    	   $scope.addNewList.startMonth = result;  
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
    	   $scope.addNewList.endMonth = result;  
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
			angular.forEach($scope.insuranceFormList, function(data2,index2,array2){
				if(data2.productType.key==data.key){
					sortList.push(data2);
				}
        	});
        });
        $scope.insuranceFormList=sortList;
	}
	$scope.sortMonth=function(){
		var productTypeIf3=false;
		var productTypeIf12=false;
		$scope.startMonthCheck=[];
		$scope.insuranceFormListCopy2=angular.copy($scope.insuranceFormList);
		//剔除删除的list
		$scope.forFun=function() {
			for(var i=0;i<$scope.insuranceFormListCopy2.length;i++){
			  	if($scope.insuranceFormListCopy2[i].insuranceState===0){
					$scope.insuranceFormListCopy2.splice(i,1);
					$scope.forFun();
				}
	  		}
		}
		$scope.forFun();
		// console.log('删除后的数组'+JSON.stringify($scope.insuranceFormListCopy2));
		angular.forEach($scope.insurance_typeCopy, function(data,index,array){
			angular.forEach($scope.insuranceFormListCopy2, function(data2,index2,array2){
				if(data2.productType.key==data.key){
					$scope.startMonthCheck[index]=[];
				}
        	});
        });
		angular.forEach($scope.insurance_typeCopy, function(data,index,array){
			angular.forEach($scope.insuranceFormListCopy2, function(data2,index2,array2){
				if(data2.productType.key==data.key){
					$scope.startMonthCheck[index].push(data2);
				}
				//社保类型为社保公积金时，必须同时用社保和公积金的险种
				if($scope.result.productType.value=='社保公积金'&&index==0){	
					if(data2.productType.value=="公积金"){
						productTypeIf3=true;
					}else{
						productTypeIf12=true;
					}
				}
        	});
        });

        if($scope.result.productType.value=='社保公积金'&&(!(productTypeIf3&&productTypeIf12))){
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