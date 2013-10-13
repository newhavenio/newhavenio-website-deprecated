var EventEmitter = require('events').EventEmitter,
    BusinessValidator = require('../lib/validation/business'),
    mongoose = require('mongoose'),
    passport = require('passport');

var User = mongoose.model('User');

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

    // Create new companies entry
    this.app.post('/companies', function(req, res)
    {

        if( ! _this.validator.valid(req) )
        {
            res.json( {status:'error', messages:_this.validator.errors()}, 400 );
            return;
        }

        res.json({status:'success'});
        return;
    });

    this.app.get('/companies', function(req, res)
    {
        res.send('listing of companies');
    });

    // Display a companies entry
    this.app.get('/companies/:id', function(req, res)
    {
        res.send("show companies: "+req.param('id'));
    });

    // 
    // User management API below here.
    // 
    var userSelect = ''

    // This route uses Mongodb ids to identify our
    // individual users.
    var userDetailRoute = '/users/:id([a-zA-Z0-9]{24})'

    // Display a user entry
    this.app.get(userDetailRoute, function(req, res)
    {
        // Get a user by their Mongodb ID.  Here, the .lean
        // method means that we'll get back JavaScript objects
        // instead of Mongoose objects with all their special
        // methods and such, which we don't need.

        var user_id = req.param('id');
        User
            .findOne({'_id': mongoose.Types.ObjectId(user_id)})
            .lean()
            .exec(function(err, user){
                if (user != null){
                    res.send(user);
                }else{
                    res.status(404).send("No such user");
                }
            });
    });

    this.app.get('/users', function(req, res)
    {
        User.find().lean().exec(function(err, users){
            if (users != null){
                res.send(users);
            }else{
                res.status(404).send("No users");
            }
        });
    });

    // TODO - we need API endpoints for user DELETE
    // and PUT.  These would require that the currently
    // logged in user has the same id as the user 
    // they're trying to see.
    this.app.get('/protected/',
        function(req, res)
        {
            if (req.user == null) {
                res.status(401);
                return
            };

            res.send("kyle test");
        }
    );

    return this;
};

module.exports = ApiController;