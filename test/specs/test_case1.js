var config = require('../public')

module.exports = {
  // '@disabled': true,
  before: function(browser) {
    browser      
      .login(config.DEV_SERVER, config.USER, config.PSD)
  },
  'tests_case1': function (browser) {
    browser
      .assert.urlContains('order/increase')
      .end();
  }
}
