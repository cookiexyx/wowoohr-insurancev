angular.module('appmvc')
	.factory('appServices', function ($q, $resource, $http,$rootScope) {
		'use strict';
		var service  = {
			orderIncrease:safeHttp(config.service.orderIncrease,"order.v1.orderQuery.increaseOrderQuery"),
			messageCenter:safeHttp(config.service.messageCenter),
			orderDeclarationMaterial:safeHttp(config.service.orderDeclarationMaterial),
			orderDelete:safeHttp(config.service.orderDelete,"order.v1.orderQuery.getReduceOrder"),   //减员订单
			orderDeleteSearch:safeHttp(config.service.orderDeleteSearch,"order.v1.orderQuery.searchBoxReduce",true),   //减员订单  搜索框
			deleteSuccess:safeHttp(config.service.deleteSuccess,"order.v1.orderOperate.reduceComplete"),   //减员订单  减员完成
			orderDeleteDetail:safeHttp(config.service.orderDeleteDetail,"order.v1.orderQuery.getReduceOrderDetail"),   //减员订单详情
			insuranceDetail:safeHttp(config.service.insuranceDetail,"si.product.getProductDetailInfo"),
			insuranceFund:safeHttp(config.service.insuranceFund,"si.product.getProductList"),
			insuranceChecking:safeHttp(config.service.insuranceChecking,"si.product.getAudittingOrRefuseProList"),
			insuranceEditHistory:safeHttp(config.service.insuranceEditHistory,"si.product.getProductModifyHistoryDetailInfo"),
			insuranceEditHistoryAudit:safeHttp(config.service.insuranceEditHistoryAudit,"si.product.getProductModifyHistoryDetailInfo"),  //审核通过历史详情
			orderAll:safeHttp(config.service.orderAll,"order.v1.orderQuery.getVAllOrderList"),
			orderFail:safeHttp(config.service.orderFail,"order.v1.orderQuery.getFailedOrderList"),
			insuranceModifySave:safeHttp(config.service.insuranceModifySave,"si.product.updateProduct"),
			insuranceAdd:safeHttp(config.service.insuranceAdd,"si.product.getDictList"),
			insuranceAddSave:safeHttp(config.service.insuranceAddSave,"si.product.addProduct"),
			login:safeHttp(config.service.login,"ucenter.login"),
			accountReset:safeHttp(config.service.accountReset,"ucenter.changePassword.vendorUser"),
			insuranceHistoryTime:safeHttp(config.service.insuranceHistoryTime,"si.product.queryProductModifyTimeList"),
			insuranceHistoryTimeAudit:safeHttp(config.service.insuranceHistoryTimeAudit,"si.product.queryProductModifyTimeList"),   //审核通过历史时间
			getCityList:safeHttp(config.service.getCityList,"baseservice.city.getCityList"),
			logOut:safeHttp(config.service.logOut,"ucenter.logout"),
			getSiPrdType:safeHttp(config.service.getSiPrdType,"baseservice.dict.getSiPrdType"),
			getRefuseProductInfo:safeHttp(config.service.getRefuseProductInfo,"si.product.getRefuseProductInfo"),    //审核拒绝详情
			increaseSidebar:safeHttp(config.service.increaseSidebar,"order.v1.orderQuery.moreScreening"),   //增员订单更多筛选接口
			addQuery:safeHttp(config.service.addQuery,"order.v1.orderQuery.increaseFuzzyQuery",true),   //增员订单模糊查询
			downloadIDCard:safeHttp(config.service.downloadIDCard,"entry.pdfDownload"),    //下载证件
			orderIncreaseDetail:safeHttp(config.service.orderIncreaseDetail,"order.v1.orderQuery.getOrderDetailInfo"),   //增员订单详情
			orderAllSearch:safeHttp(config.service.orderAllSearch,"order.v1.orderQuery.getVFuzzySearchBox",true), // 所有订单 搜索
			idErr:safeHttp(config.service.idErr,"order.v1.orderOperate.feedbackMaterial"), // 身份证图片错误
			noRead:safeHttp(config.service.noRead,"order.v1.orderOperate.updateMaterialStatus"),    //未读状态
			payFeedback:safeHttp(config.service.payFeedback,"order.v1.order.apply.feedback"),   //实缴反馈
			addSuccess:safeHttp(config.service.addSuccess,"order.v1.orderOperate.recruitOverOrder"),   //增员完成&批量完成
			failReason:safeHttp(config.service.failReason,"order.v1.order.apply.failReason"),  //申报失败option
			failApply:safeHttp(config.service.failApply,"order.v1.order.apply.confirmFail"),   //申报失败提交
			addOrderDownload:safeHttp(config.service.addOrderDownload,"order.download.addOrderDownload"),   //添加下载
			downloadList:safeHttp(config.service.downloadList,"order.download.getFileDownloadList"),   //查询下载列表
			downloadExcel:safeHttp(config.service.downloadExcel,"order.download.exportOrderExcel"),  //下载pdf
			orderFailSearch:safeHttp(config.service.orderFailSearch,"order.v1.orderQuery.failedFuzzyQuery",true),  //失败订单 搜索 
			orderAllDetail:safeHttp(config.service.orderAllDetail,"order.v1.orderQuery.getAllOrderDetailInfo"),  //失败订单 搜索 
			billPayee:safeHttp(config.service.billPayee,"order.v1.vendor.bill.selectRmVendorBillList"),    //收款账单列表
			billPayeeDate:safeHttp(config.service.billPayeeDate,"order.v1.vendor.bill.selectRmVendorBillOption"),   //收款账单最大值最小值
			feedbackByInsurance:safeHttp(config.service.feedbackByInsurance,"order.v1.order.apply.feedbackByInsurance"),    //单个险种实缴反馈
			orderIncreaseFeedbackMaterial:safeHttp(config.service.orderIncreaseFeedbackMaterial,"order.v1.orderOperate.getMaterialFeedbackReasonList")    //单个险种实缴反馈
		} 
		return service;

		function safeHttp(url,projectStr,noLoad){
			var projectName = "";
			if(url){
				projectName = projectStr;
			}			
			var returnFunc = {				
				save : function(params) {
					var deffered = $q.defer();
					if(!noLoad){
						$("#loading").show();
					}
					var keys = [];
					var postData = {};

					if(params){
						params["appId"] = config.appId;
						if(sessionStorage.getItem('token')){
							params["token"] = sessionStorage.getItem('token');
							params["userId"] = sessionStorage.getItem('userId');
						}
						function compare_case_insensitive( a, b ) {
						    if ( a > b ) { return  1; }
						    if ( b > a ) { return -1; }
						    return 0;
						}
						function sort(params1){
							var keys=[];
							var array={};
							for (var d in params1){
				               keys.push(d);
							}
				           	keys = keys.sort(compare_case_insensitive);
				           	// console.log(params1);
				           	for(var i = 0; i<keys.length; i++ ){
								if(params1[keys[i]]!==""&&params1[keys[i]]!==undefined){
									if(Object.prototype.toString.call(params1[keys[i]])==="[object Object]"){
										array[keys[i]]=sort(params1[keys[i]]);
									}else if(Object.prototype.toString.call(params1[keys[i]])==="[object Array]"){
										array[keys[i]]=arraySort(params1[keys[i]])
									}else{
										array[keys[i]]=params1[keys[i]];

									}
								}
							}
							return array;
						}

						function arraySort(params2) {
							var array=[];
				           	for(var i = 0; i<params2.length; i++ ){
								if(Object.prototype.toString.call(params2[i])==="[object Object]"){
									array[i]=sort(params2[i]);
								}else if(Object.prototype.toString.call(params2[i])==="[object Array]"){
									array[i]=arraySort(params2[i]);
								}else{
									array[i]=params2[i];
								}
							}
							return array;
						}
							
						for (var d in params){
		                   keys.push(d);
						}
		               	keys = keys.sort(compare_case_insensitive);
						params[config.postKey] = "";
		               	for(var i = 0; i<keys.length; i++ ){
							if(params[keys[i]]!==""&&params[keys[i]]!==undefined){
								if(Object.prototype.toString.call(params[keys[i]])==="[object Object]"){
									params[config.postKey] = params[config.postKey] + keys[i] + "="+ JSON.stringify(sort(params[keys[i]]))+"&";
									
								}else if(Object.prototype.toString.call(params[keys[i]])==="[object Array]"){
									params[config.postKey] = params[config.postKey] + keys[i] + "="+ JSON.stringify(arraySort(params[keys[i]]))+"&";
								
								}else{
									params[config.postKey] = params[config.postKey] + keys[i] + "="+ params[keys[i]]+"&";
								}
							}
						}
						// console.log(params[config.postKey].substring(0, params[config.postKey].length - 1)+"&"+projectName+"&"+config.secrect);					
						params[config.postKey] = sha1(params[config.postKey].substring(0, params[config.postKey].length - 1)+"&"+projectName+"&"+config.secrect);

					}else{
						params = {};
						params["appId"] = config.appId;
						if(sessionStorage.getItem('token')){
							params["token"] = sessionStorage.getItem('token');
							params["userId"] = sessionStorage.getItem('userId');
						}
						params[config.postKey] = sha1("appId="+params["appId"]+"&"+projectName+"&"+config.secrect);
					}
					postData[projectName] = params;

					// console.log(JSON.stringify(postData));
					$http({
					    method: 'POST',
					    url: url,
					    data:postData,
					    // withCredentials: true,
					    headers: {
					        'Content-Type': 'application/json'
					        // 'Content-Type': 'application/x-www-form-urlencoded'
					    }
					}).then(function(data) {
				       // console.log(data.data);
						$("#loading").hide();
						deffered.resolve(data.data);
			       	}, function(error) {
			           console.log(error);
			           $("#loading").hide();
			        });
					

					deffered.$promise = deffered.promise;
					return deffered;
				}
			};

			return returnFunc;
		}
		
})
	
	angular.module('appmvc')
	.factory('pagenation', function () {
		'use strict';
		var pagenaion  = {			
			init:function(list,totalPages, callback){
				var page = page || 1;
				$('.pagination').pagination({
					items: totalPages,
					itemOnPage: 8,
			        currentPage: 1,
			        cssStyle: '',
			        prevText: '<',
			        nextText: '>',
			        labelMap: list,
			        onPageClick: function (page, evt) {
			            callback(page, evt);
			        }
				});
			},
			goto:function(page){
				$('.pagination').pagination('drawPage', page);
			}

		}
		return pagenaion;
	})




