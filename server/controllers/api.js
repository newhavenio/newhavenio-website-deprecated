var EventEmitter = require('events').EventEmitter,
    BusinessValidator = require('../lib/validation/business'),
    mongoose = require('mongoose'),
    passport = require('passport');


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

    // *********************************************
    // Company API
    // *********************************************

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

    // GET a list of companies
    // 
    this.app.get('/companies', function(req, res)
    {
        res.send('listing of companies');
    });

    // GET a particular company
    // 
    this.app.get('/companies/:id', function(req, res)
    {
        res.send("show companies: "+req.param('id'));
    });

    // *********************************************
    // User management API below here.
    // *********************************************

    // Get the User model.  This assumes that the model
    // has already been registered on the mongoose object.
    //
    var User = mongoose.model('User');

    // This route uses Mongodb ids to identify our
    // individual users.
    var userDetailRoute = '/users/:id([a-zA-Z0-9]{24})'

    // Return JSON representation of the user that
    // is currently logged in.
    this.app.get('/users/me', function(req, res)
    {
        res.send(req.user);
    });

    // GET a single user.
    // 
    this.app.get(userDetailRoute, function(req, res)
    {
        // Get a user by their Mongodb ID.  Here, the .lean
        // method means that we'll get back JavaScript objects
        // instead of Mongoose objects with all their special
        // methods and such, which we don't need.

        var user_id = mongoose.Types.ObjectId(req.param('id'));
        User
            .findOne({'_id': user_id})
            .lean()
            .exec(function(err, user){
                if (user != null){
                    res.send(user);
                }else{
                    res.status(404).send("No such user");
                }
            });
    });

    // Delete a user
    // 
    this.app.delete(userDetailRoute, function(req, res)
    {
        var user_id = mongoose.Types.ObjectId(req.param('id'));

        // Deletion requires that the request comes from a user
        // that is logged in and is either an admin user or 
        // has the same id as the person who's being deleted.
        //
        if (req.user && req.user.isAdminOrSameId(user_id)){
            User
                .findByIdAndRemove(user_id, function(err, user){
                    if (err){

                        // TODO: Figure out what kinds of errors
                        // this can possibly return. Set HTTP status
                        // appropriately.
                        res.send(err);
                    }else{
                        res.send({'_id': req.param('id'), deleted: true});
                    }
                });
        }else{
            res.status(401).send("Not permitted");
        }
        return;
    });

    // Get a list of users
    //
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

    return this;
};

module.exports = ApiController;