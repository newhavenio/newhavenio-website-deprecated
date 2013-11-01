var EventEmitter = require('events').EventEmitter,
    mongoose = require('mongoose');

function DevelopersController(app){
    if (!(this instanceof DevelopersController)) return new DevelopersController(app);

    EventEmitter.call(this);

    this.app = app;
}

DevelopersController.prototype = Object.create(EventEmitter.prototype);


// Setup Routes
DevelopersController.prototype.route = function()
{
    var _this = this;
    var User = mongoose.model('User');

    // Create new companies entry
    this.app.get('/developers', function(req, res)
    {
        User.find().lean().exec(function(err, users){
            if (users != null){
                res.render('developers.html', {
                    developers: users,
                    js: _this.app.js,
                    css: _this.app.css
                });
            }else{
                res.status(404).send("No users");
            }
        });
    });

    return this;
};

module.exports = DevelopersController;