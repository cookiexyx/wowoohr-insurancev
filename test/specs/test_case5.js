var config = require('../public')

module.exports = {
  // '@disabled': true,
  before: function(browser) {
    browser      
      .login(config.DEV_SERVER, config.USER, config.PSD)
  },
  'tests_case5': function (browser) {   

    browser
      .click('#headerFixed > div:nth-child(4)')
      .pause(1000)
      .assert.urlContains('insurance/fund')
      .getText(".insurance-fund-box", function(result) {
        if(result.value.indexOf('你暂无添加任何社保公积金') > -1){
          this
            .click('body > ng-view > div > div > div > div.add-button.point > span')
            .pause(1000)            
        }
        else{
          if(result.value.indexOf('服务城市')>-1){
            this
              .click('body > ng-view > div > div > div > div > div.add-fund.point')
              .pause(1000)
          }
          else{
            this
              .click('body > ng-view > div > div > div > div.add-button.point > span')
              .pause(1000)
          }
        }
        this
          .click('body > ng-view > div > div.ng-scope > div.insuranceAddCont > div.insuranceAddBasic > div:nth-child(1) > div.rightaddbug > select option[value="string:2"]')
          .setValue('body > ng-view > div > div.ng-scope > div.insuranceAddCont > div.insuranceAddBasic > div:nth-child(3) > div.rightaddbug.input-err > input', config.VALUE)
          .setValue('body > ng-view > div > div.ng-scope > div.insuranceAddCont > div.insuranceAddBasic > div:nth-child(4) > div.rightaddbug.input-err > input', config.TEXT+new Date().getTime())
          .setValue('body > ng-view > div > div.ng-scope > div.insuranceAddCont > div.insuranceAddBasic > div.insuranceAddBasicForm.input-err > div.rightaddbug > input', config.VALUE)
          .click('body > ng-view > div > div.ng-scope > div.insuranceAddCont > div.insuranceAddBasic > button')
          .pause(1000)
          .click('body > ng-view > div > div.ng-scope > div.insuranceAddCont > div.insuranceAdd-cenbao > div:nth-child(1) > label:nth-child(1)')
          .click('body > ng-view > div > div.ng-scope > div.insuranceAddCont > div.insuranceAdd-cenbao > div.cenbaoBtn > button.btn.btn-info.btn-lg')
          .isVisible('body > ng-view > div > div.ng-scope > div.insuranceAddCont > div.insuranceAdd-policy > div.no-insuranceAdd-policy', function(result) {
            if(result.value){
              this
                .click('body > ng-view > div > div.ng-scope > div.insuranceAddCont > div.insuranceAdd-policy > div.no-insuranceAdd-policy > p > a')
                .pause(1000)
                .getText("body > ng-view > div > div.pop.insurance-pop-month.insurance-pop-add > ul > li:nth-child(1) > select", function(result) {
                  this.assert.equal(result.value, '公积金')
                })
                .getText("body > ng-view > div > div.pop.insurance-pop-month.insurance-pop-add > ul > li:nth-child(3) > select", function(result) {
                  this.assert.equal(result.value, '月收')
                })
                .assert.value('body > ng-view > div > div.pop.insurance-pop-month.insurance-pop-add > ul > li:nth-child(1) > select', '6')
                .assert.value('body > ng-view > div > div.pop.insurance-pop-month.insurance-pop-add > ul > li:nth-child(3) > select', '2')
                .click("#datetimepicker1")
                .assert.visible('.bootstrap-datetimepicker-widget')
                .execute(function(){
                  $(".bootstrap-datetimepicker-widget table tbody tr:last-child td:last-child").click()
                  return ""
                }, [], function (result){})
                .setValue('body > ng-view > div > div.pop.insurance-pop-month.insurance-pop-add > table > tbody > tr:nth-child(1) > td:nth-child(1) > div > input', config.VALUE+10)
                .setValue('body > ng-view > div > div.pop.insurance-pop-month.insurance-pop-add > table > tbody > tr:nth-child(1) > td:nth-child(2) > div > input', config.VALUE+10)
                .setValue('body > ng-view > div > div.pop.insurance-pop-month.insurance-pop-add > table > tbody > tr:nth-child(2) > td:nth-child(1) > div > input', config.VALUE)
                .setValue('body > ng-view > div > div.pop.insurance-pop-month.insurance-pop-add > table > tbody > tr:nth-child(2) > td:nth-child(2) > div > input', config.VALUE)
                .setValue('body > ng-view > div > div.pop.insurance-pop-month.insurance-pop-add > table > tbody > tr:nth-child(3) > td:nth-child(1) > div > input', config.VALUE)
                .setValue('body > ng-view > div > div.pop.insurance-pop-month.insurance-pop-add > table > tbody > tr:nth-child(3) > td:nth-child(2) > div > input', config.VALUE)
                .setValue('body > ng-view > div > div.pop.insurance-pop-month.insurance-pop-add > table > tbody > tr:nth-child(4) > td:nth-child(1) > div > input', config.VALUE)
                .setValue('body > ng-view > div > div.pop.insurance-pop-month.insurance-pop-add > table > tbody > tr:nth-child(4) > td:nth-child(2) > div > input', config.VALUE)
                .getText("body > ng-view > div > div.pop.insurance-pop-month.insurance-pop-add > table > tbody > tr:nth-child(5) > td:nth-child(1) > div > select", function(result) {
                  this.assert.equal(result.value, '四舍五入至分位\n四舍五入至角位\n四舍五入至元位\n见分进角进元\n截断舍去至元位\n向上进位至分位\n向上进位至角位\n向上进位至元位\n见角进元')
                })
                .getText("body > ng-view > div > div.pop.insurance-pop-month.insurance-pop-add > table > tbody > tr:nth-child(5) > td:nth-child(2) > div > select", function(result) {
                  this.assert.equal(result.value, '四舍五入至分位\n四舍五入至角位\n四舍五入至元位\n见分进角进元\n截断舍去至元位\n向上进位至分位\n向上进位至角位\n向上进位至元位\n见角进元')
                })
                .assert.value('body > ng-view > div > div.pop.insurance-pop-month.insurance-pop-add > table > tbody > tr:nth-child(5) > td:nth-child(1) > div > select', '1')
                .assert.value('body > ng-view > div > div.pop.insurance-pop-month.insurance-pop-add > table > tbody > tr:nth-child(5) > td:nth-child(2) > div > select', '1')
                .getText("body > ng-view > div > div.pop.insurance-pop-month.insurance-pop-add > div:nth-child(4) > div.addReduce-center > select", function(result) {
                  this.assert.equal(result.value, '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27\n28\n29\n30\n31')
                })
                .getText("body > ng-view > div > div.pop.insurance-pop-month.insurance-pop-add > div:nth-child(4) > div.addReduce-right > label:nth-child(1) > label", function(result) {
                  this.assert.equal(result.value, '当月')
                })
                .getText("body > ng-view > div > div.pop.insurance-pop-month.insurance-pop-add > div:nth-child(4) > div.addReduce-right > label:nth-child(2) > label", function(result) {
                  this.assert.equal(result.value, '上月')
                })
                .getText("body > ng-view > div > div.pop.insurance-pop-month.insurance-pop-add > div:nth-child(5) > div.addReduce-center > select", function(result) {
                  this.assert.equal(result.value, '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27\n28\n29\n30\n31')
                })
                .getText("body > ng-view > div > div.pop.insurance-pop-month.insurance-pop-add > div:nth-child(5) > div.addReduce-right > label:nth-child(1) > label", function(result) {
                  this.assert.equal(result.value, '当月')
                })
                .getText("body > ng-view > div > div.pop.insurance-pop-month.insurance-pop-add > div:nth-child(5) > div.addReduce-right > label:nth-child(2) > label", function(result) {
                  this.assert.equal(result.value, '上月')
                })
                .assert.value('body > ng-view > div > div.pop.insurance-pop-month.insurance-pop-add > div:nth-child(5) > div.addReduce-center > select', 'string:1')
                .assert.value('body > ng-view > div > div.pop.insurance-pop-month.insurance-pop-add > div:nth-child(4) > div.addReduce-center > select', 'string:1')
                .click('body > ng-view > div > div.pop.insurance-pop-month.insurance-pop-add > div.footer > button.btn.more-btn.btn-info')
                .pause(1000)
                .click('body > ng-view > div > div.ng-scope > div.insuranceAddCont > div.insuranceAdd-policy > div.policyBtn > button.btn.btn-info.btn-lg')
                .pause(2000)
                .assert.visible("body > ng-view > div > div.add-success-link.ng-scope")
                .click('body > ng-view > div > div.add-success-link.ng-scope > div.add-button.point > span')
                .pause(1000)
                .assert.urlContains('insurance/fund')
            }
            
          })
      })
      .end()
  }
}
