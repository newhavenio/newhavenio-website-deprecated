var EventEmitter = require('events').EventEmitter;

function AboutController(app){
    if (!(this instanceof AboutController)) return new AboutController(app);

    EventEmitter.call(this);

    this.app = app;
}

AboutController.prototype = Object.create(EventEmitter.prototype);


// Setup Routes
AboutController.prototype.route = function()
{
    var _this = this;

    this.app.get('/about', function(req, res)
    {
        res.render('about.html');
    });

    return this;
};

module.exports = AboutController;