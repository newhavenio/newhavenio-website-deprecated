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

    var cachedResponse = null;

    // Create new companies entry
    this.app.get('/', function(req, res)
    {
        // Respond from the cache if we can.  Our index.html
        // never changes, so we're OK to cache it in perpetuity.
        if (cachedResponse){
            res.send(cachedResponse);
            return;
        }

        // Else render index.html
        res.render('index.html', {meetups: {} }, function(err, html){
            cachedResponse = html;
            res.send(cachedResponse);
            return;
        });
    });

    return this;
};

module.exports = MeetupController;