var EventEmitter = require('events').EventEmitter;

function ApiController(app)
{
    if (!(this instanceof ApiController)) return new ApiController(app);

    EventEmitter.call(this);

    this.app = app;
}

ApiController.prototype = Object.create(EventEmitter.prototype);


// Setup Routes
ApiController.prototype.route = function()
{
    // Create new business entry
    this.app.post('/business', function(req, res)
    {
        req.send('posted new business');
    });

    this.app.get('/business', function(req, res)
    {
        req.send('listing of businesses');
    });

    // Display a business entry
    this.app.get('/business/:id', function(req, res)
    {
        res.send("show business: "+req.param('id'));
    });

    return this;
};

module.exports = ApiController;