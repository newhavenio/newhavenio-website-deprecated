var EventEmitter = require('events').EventEmitter,
    mongoose = require('mongoose'),
    DeveloperController = require('./developer');

function CompanyController(app){
    if (!(this instanceof CompanyController)) return new CompanyController(app);

    EventEmitter.call(this);

    this.app = app;
    this.slug = 'companies';
    this.Model = mongoose.model('Company');
    this.template = 'company-list.html';
}

CompanyController.prototype = Object.create(EventEmitter.prototype);


// Setup Routes
CompanyController.prototype.route = DeveloperController.prototype.route;

module.exports = CompanyController;