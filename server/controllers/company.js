var EventEmitter = require('events').EventEmitter;

function CompanyController(app){
    if (!(this instanceof CompanyController)) return new CompanyController(app);

    EventEmitter.call(this);

    this.app = app;
}

CompanyController.prototype = Object.create(EventEmitter.prototype);


// Setup Routes
CompanyController.prototype.route = function()
{
    var _this = this;

    // Create new companies entry
    this.app.get('/companies', function(req, res)
    {
        res.render('company-list.html', {
            companies: {}
        });
    });

    return this;
};

module.exports = CompanyController;