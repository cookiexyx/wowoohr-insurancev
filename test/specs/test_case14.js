var config = require('../public')

module.exports = {
  // '@disabled': true,
  before: function(browser) {
    browser      
      .login(config.DEV_SERVER, config.USER, config.PSD)
  },
  'tests_case14': function (browser) {   

    browser
      .assert.urlContains('order/increase')
      .pause(2000)
      .maximizeWindow()
      .getText('body > ng-view > div', function(result){
        if(result.value.indexOf('你暂无需要处理的增员订单') === -1){
          this
            .click('div.order-list-content.row > div.col-xs-3.right-bar > ul > li:nth-child(3)')
            .pause(1000)
            .assert.visible('body > ng-view > div > div.pop.fail-pop')
            .click('body > ng-view > div > div.pop.fail-pop > div > button.btn.more-btn.btn-info')
            .pause(1000)
            .isVisible('#errorPromte', function(result){
              if(result.value){
                this.getText('#errorPromte', function(result){
                  if(result.value === '请先处理此员工补缴月的增员订单'){
                    this.assert.equal(result.value, '请先处理此员工补缴月的增员订单')
                  }
                  else{
                    this.assert.equal(result.value, '补缴月申报成功了，本月不允许操作失败')
                  }
                  
                })
              }
              else{
                this
                  .assert.elementPresent('#successPop')
                  .getText('#successPop', function(result){
                    this.assert.equal(result.value, '操作成功')
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
