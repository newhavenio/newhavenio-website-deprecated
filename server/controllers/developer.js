var EventEmitter = require('events').EventEmitter,
    mongoose = require('mongoose'),
    languages = require('../lib/languages'),
    _ = require('underscore');

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

    function renderUserList(res, langKey){
        var q = User;
        console.log(langKey);
        console.log(languages[langKey]);
        if (langKey){
            q = q.find({languages: langKey});
        }else{
            q = q.find();
        }        
        q.exec(function(err, users){
            if (users != null){
                res.render('developer-list.html', {
                    developers: users,
                    language: languages[langKey],
                });
            }else{
                res.status(404).send("No users");
            }                    
        });
    }

    // Get users (developers)
    this.app.get('/developers', function(req, res){
        renderUserList(res);
    });

    // Get users to program a particular language
    var langRoute = '/developers/:langKey(' + _.keys(languages).join('|') + ')?';
    this.app.get(langRoute, function(req, res){
        renderUserList(res, req.params.langKey);
    });

    return this;
};

module.exports = DevelopersController;