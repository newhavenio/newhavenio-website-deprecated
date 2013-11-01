var EventEmitter = require('events').EventEmitter,
    mongoose = require('mongoose'),
    languages = require('../lib/languages'),
    _ = require('underscore');

function DevelopersController(app){
    if (!(this instanceof DevelopersController)) return new DevelopersController(app);

    EventEmitter.call(this);

    this.app = app;
    this.slug = 'developers';
    this.Model = mongoose.model('User');
    this.template = 'developer-list.html';
}

DevelopersController.prototype = Object.create(EventEmitter.prototype);


// Setup Routes.  Writing this particular route so that it
// can easily be shared between developers and companies.
DevelopersController.prototype.route = function()
{
    var _this = this;

    function renderUserList(res, langKey){
        var q = _this.Model;
        if (langKey){
            q = q.find({languages: langKey});
        }else{
            q = q.find();
        }        
        q.exec(function(err, objects){
            if (objects != null){
                var context = {language: languages[langKey]};
                context[_this.slug] = objects;
                res.render(_this.template, context)
            }else{
                res.status(404).send("None found");
            }                    
        });
    }

    // Get users (developers) or companies
    this.app.get('/' + this.slug, function(req, res){
        renderUserList(res);
    });

    // Get users or companies who use a particular language
    var langRoute = '/' + this.slug + '/:langKey(' + _.keys(languages).join('|') + ')?';
    this.app.get(langRoute, function(req, res){
        renderUserList(res, req.params.langKey);
    });

    return this;
};

module.exports = DevelopersController;