var EventEmitter = require('events').EventEmitter,
    mongoose = require('mongoose'),
    DeveloperController = require('./developer');

function CompanyController(app){
    if (!(this instanceof CompanyController)) return new CompanyController(app);

    var _this = this;
    EventEmitter.call(this);

    this.app = app;
    this.slug = 'companies';
    this.Model = mongoose.model('Company');
    this.template = 'company-list.html';

    this.cachedResponses = {};
    function bustCache(){
      console.log('Busted cache for CompanyController');
      _this.cachedResponses = {};      
    }
    mongoose.model('User').schema.post('save', bustCache);
    mongoose.model('Company').schema.post('save', bustCache);
    mongoose.model('User').schema.post('save', bustCache);
    mongoose.model('Company').schema.post('save', bustCache);

}

CompanyController.prototype = Object.create(EventEmitter.prototype);


// Setup Routes
CompanyController.prototype.route = DeveloperController.prototype.route;

module.exports = CompanyController;