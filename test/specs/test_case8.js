var config = require('../public')

module.exports = {
  // '@disabled': true,
  before: function(browser) {
    browser      
      .login(config.DEV_SERVER, config.USER, config.PSD)
  },
  'tests_case8': function (browser) {   

    browser
      .click('#headerFixed > div:nth-child(4)')
      .pause(1000)
      .assert.urlContains('insurance/fund')
      .getText('body > ng-view > div > div', function(result){
        if(result.value.indexOf('服务城市')>-1){
          this
            .click('body > ng-view > div > div > div > div > div:nth-child(5)')
            .pause(1000)
        }
        else if(result.value.indexOf('条待审核的社保公积金产品')>-1){
          this
            .click('body > ng-view > div > div > div > div.hint > div > span.point.text-primary')
            .pause(1000)
        }
        else{
          this.end()
        }
        this
          .getText('body > ng-view > div > div.ng-scope > div > span', function(result){
            this.assert.equal(result.value, '审核中')
          })
          .click('body > ng-view > div > div.insurance-fund-box > ul > li:nth-child(1) > div.insurance-list-title > span.float-xs-right.see-detail.point')
          .pause(1000)
          .getAttribute("body > ng-view > div > div.insurance-detail-box > div.row.insurance-detail-title > div.float-xs-right > button", "class", function(result) {
            this.assert.equal(result.value, 'btn-gray')
          })
      })
      .end()
  }
}
