var EventEmitter = require('events').EventEmitter,
    BusinessValidator = require('../lib/validation/business'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    _ = require('underscore');


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

    var Business = mongoose.model('Business');

    /*
     * Example working Curl request:
     * $ curl
     *     -X POST
     *     -d "name=Digital Surgeons&description=Digital marketing agency&technologies[]=PHP&technologies[]=LAMP"
     *     http://172.16.27.146:9000/companies
     */

    // Create new companies entry
    this.app.post('/api/companies', function(req, res)
    {
        // Prepare Business Object
        var editableFields = ['name', 'description', 'webUrl', 'twitterUrl', 'technologies', 'location'],
            payload = _.pick(req.body, editableFields);

        // Business object to be created
        var biz = new Business();
        biz.active = true;

        // Populate business object
        _.extend(biz, payload);

        // Save that business
        // ...without making the tax-payers pay
        biz.save(function(err, user){
            if (err) {
                console.log("Error saving business: ", err);
                res.status(400).send("Error saving business");
            }else{
                res.send(biz);
            }
        });
    });

    // GET a list of companies
    //
    this.app.get('/api/companies', function(req, res)
    {
        Business.find().lean().exec(function(err, businesses){
            if (businesses != null){
                res.send(businesses);
            }else{
                res.status(404).send("No Businesses");
            }
        });
    });

    // GET a particular company
    //
    this.app.get('/api/companies/:id', function(req, res)
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
    var userDetailRoute = '/api/users/:id([a-zA-Z0-9]{24})'

    // Return JSON representation of the user that
    // is currently logged in.
    this.app.get('/api/users/me', function(req, res)
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

    // PUT a single user.
    //
    this.app.put(userDetailRoute, function(req, res)
    {
        // Get a user by their Mongodb ID.
        var user_id = mongoose.Types.ObjectId(req.param('id'));

        // Make sure the user is authorized
        if (!req.user || !req.user.isAdminOrSameId(user_id)){
            return res.status(401).send("Not permitted");
        }

        var editableFields = ['firstName', 'lastName', 'bio', 'languages', 'twitterUrl', 'linkedinUrl', 'blogUrl', 'email'],
            payload = _.pick(req.body, editableFields);

        User
            .findOne({'_id': user_id})
            .exec(function(err, user){
                if (err || user == null){
                    res.status(404).send("No such user");
                }else{

                    // Update the user and save
                    //
                    _.extend(user, payload);
                    user.save(function(err, user){
                        if (err) {
                            console.log("Error saving user: ", err);
                            res.status(400).send("Error saving");
                        }else{
                            res.send(user);
                        }
                    });
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
    this.app.get('/api/users', function(req, res)
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