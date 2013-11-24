var EventEmitter = require('events').EventEmitter,
  _ = require('underscore'),
  async = require('async'),
  mongoose = require('mongoose');

function SiteMapController(app){
    if (!(this instanceof SiteMapController)) return new SiteMapController(app);

    EventEmitter.call(this);

    this.app = app;
}

SiteMapController.prototype = Object.create(EventEmitter.prototype);


// Setup Routes
SiteMapController.prototype.route = function()
{
  var _this = this,
    User = mongoose.model('User'),
    Company = mongoose.model('Company');


  // Render our sitemap.
  // 
  this.app.get('/sitemap.xml', function(req, res)
  {

    // Grab our lists of developers and companies
    // 
    async.parallel({
      developers: function(cb){User.getActiveCached(cb)},
      companies: function(cb){Company.getActiveCached(cb)}
    },function(err, entities){

        // Handle errors
        if (err) {throw err};

        // This functions accepts an entityType,
        // either "developers" or "companies" and
        // returns for that entityType the list of
        // all programming languages used by
        // 1-or-more entity.
        // 
        function languageUnion(entityType){
          return _.union.apply(_, _.pluck(entities[entityType], 'languages'))
        }
        var entityLanguages = {
          'developers': languageUnion('developers'),
          'companies': languageUnion('companies')
        };

        // Render the response
        // 
        res.render('sitemap.xml', {
          'entityLanguages': entityLanguages,
          'baseUrl': req.protocol + '://' + req.headers.host
        });
    });

  });

  return this;
};

module.exports = SiteMapController;