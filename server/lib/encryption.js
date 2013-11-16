var crypto = require('crypto');

module.exports = function(){

  var secret = process.env.SERVER_SECRET

  this.encrypt = function(text){
    var cipher = crypto.createCipher('aes-256-cbc', secret);
    var crypted = cipher.update(text,'utf8','hex');
    crypted += cipher.final('hex');
    return crypted;
  }
 
  this.decrypt = function(text){
    var decipher = crypto.createDecipher('aes-256-cbc', secret);
    var dec = decipher.update(text,'hex','utf8');
    dec += decipher.final('utf8');
    return dec;
  }

  return this;
}