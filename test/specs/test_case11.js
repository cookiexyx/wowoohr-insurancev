var config = require('../public')

module.exports = {
  // '@disabled': true,
  before: function(browser) {
    browser      
      .login(config.DEV_SERVER, config.USER, config.PSD)
  },
  'tests_case11': function (browser) {   

    browser
      .assert.urlContains('order/increase')
      .pause(2000)
      .getText('body > ng-view > div', function(result){
        if(result.value.indexOf('你暂无需要处理的增员订单') === -1){
          this
            .click('body > ng-view > div > div.orderincrease.noprint > div.row.title-order.ng-scope > span.exportList.list')
            .pause(1000)
            .assert.visible('body > ng-view > div > div.pop.download-pop')
            .click('body > ng-view > div > div.pop.download-pop > div > button')
            .pause(1000)
            .assert.hidden('body > ng-view > div > div.pop.download-pop')
            .click('body > ng-view > div > div.orderincrease.noprint > div.row.title-order.ng-scope > span:nth-child(7)')
            .pause(1000)
            .assert.urlContains('order/increaseDownload')
            .assert.visible('body > ng-view > div > div > div.insurance-detail-box.orderIncreaseDetail > div > table > tbody > tr > td:nth-child(5) > span:nth-child(2)')
            .assert.visible('body > ng-view > div > div > div.insurance-detail-box.orderIncreaseDetail > div > table > tbody > tr > td:nth-child(4) > span:nth-child(3)')

          this
            .expect.element('body > ng-view > div > div > div.insurance-detail-box.orderIncreaseDetail > div > table > tbody > tr > td:nth-child(1) > span').text.to.match(/^增员\d{14}$/)

          this
            .expect.element('body > ng-view > div > div > div.insurance-detail-box.orderIncreaseDetail > div > table > tbody > tr > td:nth-child(2) > span').text.to.equal('-')

          this
            .expect.element('body > ng-view > div > div > div.insurance-detail-box.orderIncreaseDetail > div > table > tbody > tr > td:nth-child(3) > span').text.to.match(/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)\s+([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)

          this
            .elements('css selector', 'body > ng-view > div > div > div.insurance-detail-box.orderIncreaseDetail > div > table > tbody > tr', function(result){
              var i = 1;
              var length = result.value
              function catchDownload(){
                browser
                  .getText('body > ng-view > div > div > div.insurance-detail-box.orderIncreaseDetail > div > table > tbody > tr:nth-child('+ i +') > td:nth-child(4) > span:nth-child(1)', function(result){
                    if(result.value === '未下载'){
                      browser
                        .assert.visible('body > ng-view > div > div > div.insurance-detail-box.orderIncreaseDetail > div > table > tbody > tr:nth-child(2) > td:nth-child(5) > span.blue')
                        .click('body > ng-view > div > div > div.insurance-detail-box.orderIncreaseDetail > div > table > tbody > tr:nth-child(2) > td:nth-child(5) > span.blue')
                        .pause(1000)
                        .assert.visible('body > ng-view > div > div > div.insurance-detail-box.orderIncreaseDetail > div > table > tbody > tr:nth-child(2) > td:nth-child(4) > span:nth-child(2)')
                    }
                    else{
                      i++
                      if(i < length + 1){
                        catchDownload()
                      }                      
                    }
                  })
              }

              catchDownload()

            })

        }
        else{
          this.end()
        }
          
      })
      .end()
  }
}
