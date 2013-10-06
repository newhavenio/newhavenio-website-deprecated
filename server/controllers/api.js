var EventEmitter = require('events').EventEmitter,
    BusinessValidator = require('../lib/validation/business');

function ApiController(app)
{
    if (!(this instanceof ApiController)) return new ApiController(app);

    EventEmitter.call(this);

    this.app = app;
    this.validator = new BusinessValidator();
}

ApiController.prototype = Object.create(EventEmitter.prototype);


// Setup Routes
ApiController.prototype.route = function()
{
    var _this = this;

    // Create new business entry
    this.app.post('/business', function(req, res)
    {

        if( ! _this.validator.valid(req) )
        {
            res.json( {status:'error', messages:_this.validator.errors()}, 400 );
            return;
        }

        res.json({status:'success'});
        return;
    });

    this.app.get('/business', function(req, res)
    {
        res.send('listing of businesses');
    });

    // Display a business entry
    this.app.get('/business/:id', function(req, res)
    {
        res.send("show business: "+req.param('id'));
    });

    return this;
};

module.exports = ApiController;