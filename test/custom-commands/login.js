exports.command = function(address, username, password, callback) {
    var self = this;
    this
        .url(address)
        .frame(null)
        .waitForElementVisible('.login-fixed', 2000)
        .setValue('.login-fixed-from input[type=text]', username)
        .setValue('.login-fixed-from input[type=password]', password)
        .click('.btn')
        .pause(1000)
        .waitForElementVisible('.user_avatar', 2000)

    if( typeof callback === "function"){
        callback.call(self);
    }
    return this; 
}
