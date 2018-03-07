var config = require('../public')

module.exports = {
  // '@disabled': true,
  before: function(browser) {
    browser      
      .login(config.DEV_SERVER, config.USER, config.PSD)
  },
  'tests_case12': function (browser) {   

    browser
      .assert.urlContains('order/increase')
      .pause(2000)
      .maximizeWindow()
      .getText('body > ng-view > div', function(result){
        if(result.value.indexOf('你暂无需要处理的增员订单') === -1){
          this
            .click('div.order-list-content.row > div.col-xs-3.right-bar > ul > li:nth-child(2)')
            .assert.visible('#orderDeclarWrap')
            .assert.visible('#img0 > div.operation.row.noprint > div:nth-child(1) > span')
            .assert.visible('#img0 > div.operation.row.noprint > div:nth-child(2) > span')
            .click('#img0 > div.operation.row.noprint > div:nth-child(3) > span')
            .pause(1000)
            .assert.elementPresent('#img0 > div.operation.row.noprint > div.feedback-box')
            .getText('#img0 > div.operation.row.noprint > div.feedback-box > div:nth-child(1) > label > label > span', function(result){
              this.assert.equal(result.value, '身份证信息与输入姓名证件号码信息不一致')
            })
            .getText('#img0 > div.operation.row.noprint > div.feedback-box > div:nth-child(2) > label > label > span', function(result){
              this.assert.equal(result.value, '身份证照片拍摄不符合标准')
            })
            .assert.value('input[name="newMinus0"]', 'B1')
            .click('#img0 > div.operation.row.noprint > div.feedback-box > button')
            .pause(3000)
            .isVisible('#errorPromte', function(result) {
              if(result.value){
                this.getText('#errorPromte', function(result){
                  this.assert.equal(result.value, '该员工材料错误已反馈，不能重复反馈！')
                })
              }
              else{
                this
                  .assert.elementPresent('#successPop')
                  .getText('#successPop', function(result){
                    this.assert.equal(result.value, '反馈成功')
                  })
              }
            })
        }
        else{
          this.end()
        }
          
      })
      .end()
  }
}
