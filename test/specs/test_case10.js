var config = require('../public')

module.exports = {
  // '@disabled': true,
  before: function(browser) {
    browser      
      .login(config.DEV_SERVER, config.USER, config.PSD)
  },
  'tests_case10': function (browser) {   

    browser
      .click('#headerFixed > div:nth-child(4)')
      .pause(1000)
      .assert.urlContains('insurance/fund')
      .getText('body > ng-view > div > div', function(result){
        if(result.value.indexOf('服务城市')>-1){
          this
            .click('body > ng-view > div > div > div > div > div:nth-child(4)')
            .pause(1000)
        }
        else{
          this.end()
        }
        this
          .assert.urlContains('insurance/refuse')
          .getText('body > ng-view > div > div.ng-scope > div > span', function(result){
            this.assert.equal(result.value, '审核拒绝')
          })
          .getText('body > ng-view > div > div.insurance-fund-box', function(result){
            if(result.value.indexOf('暂无数据') === -1 ){
              this
                .click('body > ng-view > div > div.insurance-fund-box > ul > li > div.insurance-list-title > span.float-xs-right.see-detail.point')
                .pause(2000)
                .getText('body > ng-view > div > div.insurance-detail-box > div.row.insurance-detail-title > div.float-xs-left > span:nth-child(2)', function(result){
                  this.assert.equal(result.value, '审核拒绝')
                })
                .getAttribute('body > ng-view > div > div.insurance-detail-box > div.row.insurance-detail-title > div.float-xs-right > button', 'class', function(result){
                  this.assert.equal(result.value, 'btn-info')
                })
                .click('body > ng-view > div > div.insurance-detail-box > div.row.insurance-detail-title > div.float-xs-right > button')
                .pause(2000)
                .assert.urlContains('insurance/modify/auditLogId')
            }
            else{
              this.end()
            }
          })
          
      })
      .end()
  }
}
