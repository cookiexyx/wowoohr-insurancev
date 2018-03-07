var environment = "local";
// var host = window.location.protocol+"//"+window.location.hostname+":8080/entry/apicenter";
// var host = "http://10.61.1.184:8080/entry/apicenter";   //周智魏
// var host = "http://10.61.2.13:8080/entry/apicenter";   //杨德民
// var host = "http://10.61.2.139:8080/entry/apicenter";   //宋浩
var host = "/entry/apicenter";

var address = {
	local:{		
		orderIncrease:"data/orderIncrease.json",
		messageCenter:"data/messageCenter.json",
		orderDeclarationMaterial:"data/orderDeclarationMaterial.json",
		orderDelete:"data/orderDelete.json",    // 减员订单
		orderDeleteSearch:"data/orderDeleteSearch.json",   //   减员订单  搜索框
		deleteSuccess:"data/deleteSuccess.json",    //批量增员 减员完成
		orderDeleteDetail:"data/orderDeleteDetail.json",    // 减员订单详情
		insuranceDetail:"data/insuranceDetail.json",
		insuranceFund:"data/insuranceFund.json",
		insuranceChecking:"data/insuranceChecking.json",
		insuranceEditHistory:"data/insuranceEditHistory.json",
		insuranceEditHistoryAudit:"data/insuranceEditHistoryAudit.json",   //审核通过历史详情接口
		orderAll:"data/orderAll.json",       // 所有订单
		orderFail:"data/orderFail.json",     //失败订单
		insuranceModifySave:"data/insuranceModifySave.json",    //保存基本信息
		login:"data/login.json",   //登陆接口
		accountReset:"data/accountReset.json",    //重置密码接口
		insuranceHistoryTime:"data/insuranceHistoryTime.json",   //历史时间
		insuranceAdd:"data/insuranceAdd.json",
		insuranceAddSave:"data/insuranceAddSave.json",
		getCityList:"data/getCityList.json",     //获取城市list
		logOut:"data/logOut.json",     //退出登录
		getSiPrdType:"data/getSiPrdType.json",     //产品类型接口
		getRefuseProductInfo:"data/getRefuseProductInfo.json",   //审核拒绝详情
		insuranceHistoryTimeAudit:"data/insuranceHistoryTimeAudit.json",   //审核通过
		increaseSidebar:"data/increaseSidebar.json",    //增员订单侧边栏接口
		addQuery:"data/addQuery.json",    //模糊查询接口
		downloadIDCard:"data/downloadIDCard.json",    //下载证件
		orderIncreaseDetail:"data/orderIncreaseDetail.json",   //增员订单详情
		orderAllSearch:"data/orderAllSearch.json",  // 所有订单 搜索 
		idErr:"data/idErr.json",   //身份证照片错误
		noRead:"data/noRead.json",   //未读状态
		payFeedback:"data/payFeedback.json",    //实缴反馈
		addSuccess:"data/addSuccess.json",    //批量增员 单个增员
		failReason:"data/failReason.json",   //申报失败option
		failApply:"data/failApply.json",   //申报失败提交
		addOrderDownload:"data/addOrderDownload.json",   //添加下载
		downloadList:"data/downloadList.json",    //查看下载列表
		orderFailSearch:"data/orderFailSearch.json",   //失败订单 搜索 
		downloadExcel:"data/downloadExcel.json",   //下载excel
		orderAllDetail:"data/orderAllDetail.json",   //所有订单  详情
		billPayee:"data/billPayee.json",    //收款账单列表
		billPayeeDate:"data/billPayeeDate.json",    //收款账单最大值最小值
		feedbackByInsurance:"data/feedbackByInsurance.json",    //单个险种实缴反馈
		orderIncreaseFeedbackMaterial:"data/orderIncreaseFeedbackMaterial.json"    // 增员订单 反馈错误
	}, 
	public:{
		orderIncrease:host,
		messageCenter:host,
		orderDeclarationMaterial:host,
		orderDelete:host,    //减员订单
		orderDeleteSearch:host,   //   减员订单  搜索框
		deleteSuccess:host,    //批量增员 减员完成
		orderDeleteDetail:host,    // 减员订单详情
		insuranceDetail:host,
		insuranceFund:host,
		insuranceChecking:host,
		insuranceEditHistory:host,
		insuranceEditHistoryAudit:host,
		orderAll:host,       // 所有订单
		orderFail:host,          //
		insuranceModifySave:host,     //保存基本信息
		login:host,   //登陆接口
		accountReset:host,    //重置密码接口
		insuranceHistoryTime:host,    //历史时间
		insuranceAdd:host,
		insuranceAddSave:host,
		getCityList:host,         //获取城市list
		logOut:host,     //退出登录
		getSiPrdType:host,     //产品类型接口
		getRefuseProductInfo:host,   //审核拒绝详情
		insuranceHistoryTimeAudit:host, //审核通过
		increaseSidebar:host,   //增员订单侧边栏接口
		addQuery:host,    //增员订单模糊查询接口
		downloadIDCard:'/entry/pdfDownload',   //下载证件
		orderIncreaseDetail:host,   //增员订单详情
		orderAllSearch:host,     // 所有订单 搜索 
		idErr:host,   //身份证照片错误
		noRead:host,     //未读状态
		payFeedback:host,   //实缴反馈
		addSuccess:host,  //批量增员 单个增员
		failReason:host,   //申报失败option
		failApply:host,   //申报失败提交
		addOrderDownload:host,  //添加下载
		downloadList:host,   //查看下载列表
		downloadExcel:host,   //下载excel
		orderFailSearch:host,  //失败订单 搜索 
		orderAllDetail:host,   //所有订单  详情
		billPayee:host,    //收款账单列表
		billPayeeDate:host,    //收款账单最大值最小值
		feedbackByInsurance:host,    //单个险种实缴反馈
		orderIncreaseFeedbackMaterial:host    // 增员订单 反馈错误
	}, 
	mock:{
		messageCenter:"/mockurl/mockurl?path=/entry/apicenter/initLogin&param=entry008",
		insuranceEditHistory:host,
		accountReset:host,    //重置密码接口
		insuranceHistoryTime:host,    //历史时间
		getCityList:host,        //获取城市list
		productManagement:host,    // 产品管理
		indexAuditProduct:host,  // 首页 待审核产品
		indexExamine:host,  // 首页 去审核
		indexExamineSave:host,  // 首页 去审核 通过
		sidebar:host,  // 产品管理 更多审核
		login:host, //登陆接口
		indexExamineRefuse:host, // 首页 去审核 拒绝
		productRejected:host,    //产品拒绝
		productModifyInfo:host,     //修改产品审核
		productModifyHistory:host,    //修改历史
		productModifyHistoryTime:host,   //修改历史时间
		productModifyInfoSave:host,  //保存修改的产品审核
		rejectedDetails:host,   //拒绝详情
		supplierManagement:host,     // 供应商管理
		supplierAddSave:host,     // 供应商管理  添加
		logOut:host,   //退出登录
		getCityList:host,       //获取城市list
		supplierModfiySave:host,    // 供应商管理  修改
		supplierSearch:host,    // 供应商管理  搜索
		supplierAccountManage:host,    // 供应商管理  账号管理 
		supplierAccountSave:host,    // 供应商管理  账号管理   添加
		supplierAccountModfiySave:host,    // 供应商管理  账号管理  修改
		resetPasswordSave:host,    // 供应商管理  账号管理  重置密码
		orderIncrease:host,   //订单管理     增员订单
		orderDelete:host,    //订单管理     减员订单
		orderAll:host,       //订单管理    所有订单
		orderFail:host,     //订单管理    失败订单
		orderDeclarationMaterial:host,	 // 订单管理    申报材料
		increaseSidebar:host,    //订单侧边栏接口
		orderAllSearch:host, // 所有订单 搜索 
		downloadIDCard:'/entry/pdfDownload',   //下载证件
		orderOperationLog:host,   // 操作日志
		addQuery:host,   //模糊查询接口
		failApply:host,  //申报失败提交
		addOrderDownload:host,  //添加下载
		downloadList:host,   //查看下载列表
		downloadExcel:host,   //下载excel
		orderIncreaseDetail:host    //增员订单详情
	}
}



var checkMatch =
{
	"isDig":
		{
			"regStr":/^[0-9]*[1-9][0-9]*$/,
			"regMsg":"数字格式错误!",
		},
	"notNull":
		{
			"regStr":/^[\s\S]+$/,
			"regMsg":"必填项不能为空!"
		},
	"isEmail":
		{
			"regStr": /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
			"regMsg":"邮箱错误！"
		},
	"isPhone":
		{
			"regStr":/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/,
			"regMsg":"联系电话格式有误！"
		},
	"isMoney":
		{
			"regStr":/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/,
			"regMsg":"金额格式有误！"

		},
	"isMoney2":
		{
			"regStr":/^([1-9][\d]{0,1}|0)(\.[\d]{1,4})?$/,
			"regMsg":"金额格式有误！"

		},
	"isMoney5":
	{
		"regStr":/^([1-9][\d]{0,4}|0)(\.[\d]{1,2})?$/, 
		"regMsg":"金额格式有误！"
	},
	"isIDCard":
		{
			"regStr":/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/,
			"regMsg":"身份证格式有误！"
		},
	"isCreditcard":
		{
		    "regStr":/^[0-9]*$/,
			"regMsg":"银行卡号格式有误！"
		},
	"isSocietyCard":
		{
			"regStr":/^[A-Za-z0-9]{18}$/,
			"regMsg":"社会统一信用代码格式有误！"
		},
	"isDate":
	    {
	        "regStr":/(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)/,
	        "regMsg":"日期格式有误！"
	    },
	"isChar":
	    {
	        "regStr":/^[0-9a-zA-Z]*$/,
	        "regMsg":"格式有误！"
	    },
	"isDay":
	    {
	        "regStr":/^((0?[1-9])|((1|2)[0-9])|30|31)$/,
	        "regMsg":"日期格式有误！"
	    },
	"isEmoji":{
			"regStr":/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/,
			"regMsg":"请不要填入表情"
		},
	"isPassword":{
			"regStr":/^[0-9a-zA-Z~!@#$%^&*()+_\/|<>=.]{6,16}$/,
			"regMsg":"请不要填入表情"
		}
}


var text = {
	verifyCodeBtn:"发送验证码"
}

var config = {
	environment: environment,
    service:address[environment],
    text:text,
    checkMatch:checkMatch,
    appId:"wowoohr_my_vendor",
    postKey:"sign",
    secrect:"AD9DF7C34C52A7623425A5581036BF1A38"
}

var checkInWaitArray = {
	"1":{
		"reason":"入职通知书有误",
		"status":"入职确认中"
	},
	"2":{
		"reason":"合同有误",
		"status":"合同确认中"
	},
	"3":{
		"reason":"身份验证失败",
		"status":"合同确认中"
	},
	"4":{
		"reason":"身份验证失败",
		"status":"待报到"
	},
	"5":{
		"reason":"未及时确认入职通知书",
		"status":"入职确认中"
	},
	"6":{
		"reason":"未及时确认合同",
		"status":"合同确认中"
	},
	"7":{
		"reason":"未及时完善个人信息",
		"status":"待报到"
	},
	"8":{
		"reason":"",
		"status":"未注册钉钉"
	},
	"9":{
		"reason":"",
		"status":"入职确认中"
	},
	"10":{
		"reason":"",
		"status":"合同确认中"
	},
	"11":{
		"reason":"",
		"status":"待报到"
	}
};


var storage = {
	add:function(key,val){
		sessionStorage.setItem(key, val);
	},
	get:function(key){
		return sessionStorage.getItem(key);
	},
	clear:function(key) {
		sessionStorage.removeItem(key);
	}
}
