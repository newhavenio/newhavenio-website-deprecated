var EventEmitter = require('events').EventEmitter;

function MeetupController(app){
    if (!(this instanceof MeetupController)) return new MeetupController(app);

    EventEmitter.call(this);

    this.app = app;
}

MeetupController.prototype = Object.create(EventEmitter.prototype);


// Setup Routes
MeetupController.prototype.route = function()
{
    var _this = this;

    // Create new companies entry
    this.app.get('/', function(req, res)
    {
        res.render('index.html', {
            meetups: {}
        });
    });

    return this;
};

module.exports = MeetupController;