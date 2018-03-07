var config = require('../public')

module.exports = {
  // '@disabled': true,
  before: function(browser) {
    browser      
      .login(config.DEV_SERVER, config.USER, config.PSD)
  },
  'tests_case9': function (browser) {   

    browser
      .click('#headerFixed > div:nth-child(4)')
      .pause(1000)
      .assert.urlContains('insurance/fund')
      .getText('body > ng-view > div > div', function(result){
        if(result.value.indexOf('服务城市')>-1){
          this
            .click('body > ng-view > div > div > div > ul > li > div.insurance-list-title > span.float-xs-right.see-detail.point')
            .pause(1000)
        }
        else{
          this.end()
        }
        this
          .assert.urlContains('insurance/detail/productId')
          .getText('body > ng-view > div > div.insurance-detail-box > div.row.insurance-detail-title > div.float-xs-left > span:nth-child(2)', function(result){
            this.assert.equal(result.value, '审核通过')
          })
          .getAttribute('body > ng-view > div > div.insurance-detail-box > div.row.insurance-detail-title > div.float-xs-right > button', 'class', function(result){
            this.assert.equal(result.value, 'btn-info')
          })
          .click('body > ng-view > div > div.insurance-detail-box > div.row.insurance-detail-title > div.float-xs-right > button')
          .pause(2000)
          .assert.urlContains('insurance/modify/productId')
      })
      .end()
  }
}
