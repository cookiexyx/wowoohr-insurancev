var config = require('../public')

module.exports = {
  // '@disabled': true,
  before: function(browser) {
    browser      
      .login(config.DEV_SERVER, config.USER, config.PSD)
  },
  'tests_case13': function (browser) {   

    browser
      .assert.urlContains('order/increase')
      .pause(2000)
      .maximizeWindow()
      .getText('body > ng-view > div', function(result){
        if(result.value.indexOf('你暂无需要处理的增员订单') === -1){
          this
            .click('div.order-list-content.row > div.col-xs-3.right-bar > ul > li:nth-child(1)')
            .pause(1000)
            .assert.visible('body > ng-view > div > div.pop.addsucc-pop')
            .click('body > ng-view > div > div.pop.addsucc-pop > div > button.btn.more-btn.btn-info')
            .pause(1000)
            .isVisible('#errorPromte', function(result){
              if(result.value){
                this.getText('#errorPromte', function(result){
                  this.assert.equal(result.value, '请先处理此员工补缴月的增员订单')
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
