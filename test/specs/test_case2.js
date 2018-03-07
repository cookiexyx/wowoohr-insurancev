var config = require('../public')

module.exports = {
  // '@disabled': true,
  before: function(browser) {
    browser      
      .login(config.DEV_SERVER, config.USER, config.PSD)
  },
  'tests_case2': function (browser) {   

    browser
      .moveToElement('.user_avatar', 10, 10)
      .assert.elementPresent('.user_avatar ul')
      .execute(function(){
        var text = $('.user_avatar ul li:first-child a').text() + " " + $('.user_avatar ul li:last-child a').text();
        return text;
      }, [], function (result) {
        browser.assert.equal(result.value, '修改密码 退出登录') 
      })
      .execute(function(){
        $('.user_avatar ul li:first-child a').click()
        return false
      }, [], function(){})
      .pause(1000)
      .assert.urlContains('account/reset')
      .setValue('body > ng-view > div > div > div:nth-child(1) > input', config.PSD)
      .setValue('body > ng-view > div > div > div:nth-child(2) > input', config.PSD)
      .setValue('body > ng-view > div > div > div:nth-child(3) > input', config.PSD)
      .click('body > ng-view > div > div > button')
      .pause(1000)
      .assert.visible("body > ng-view > div > div.reset-success.ng-scope")
      .click('body > ng-view > div > div.reset-success.ng-scope > div.add-button.point > span')
      .pause(1000)
      .login(config.DEV_SERVER, config.USER, config.PSD)
      .execute(function(){
        $('.user_avatar ul li:last-child a').click()
        return false
      }, [], function(){})
      .pause(1000)
      .assert.urlContains('login')
      .end()
  }
}
