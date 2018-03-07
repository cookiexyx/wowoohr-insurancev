/**
 * 
 * @authors Cate Zhao
 * @date    2016-10-20 10:29:59
 * @version 1.0
 */

var httpInterceptor = function ($provide, $httpProvider) {
    $provide.factory('httpInterceptor', function ($q, $rootScope, $location) {
      return {
        response: function (response) {
          var data = response.data;
          if(data.msg){
            if(data.code!=200&&data.msg.length>0&&data.code!=1002&&data.code!=1003){
              if(data.code==1001){
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('userId');
                $rootScope.errAlert(data.msg);
                $location.path('/login');
                return $q.reject(response);
              }else if(data.code==0001||data.code==0004||data.code==0005||data.code==0008){
                $rootScope.is404=true;
                return $q.reject(response);
              }else{
                $rootScope.errAlert(data.msg);
                return $q.reject(response);
              }
            }
          }
          // console.log("接口正常"+JSON.stringify(data));
          return response || $q.when(response);
        },
        responseError: function (rejection) {
           // console.log("接口异常"+JSON.stringify(rejection));
          return $q.reject(rejection);
        }
      };
    });
    $httpProvider.interceptors.push('httpInterceptor');
};
angular.module("appmvc").config(httpInterceptor);	