var EventEmitter = require('events').EventEmitter,
    mongoose = require('mongoose'),
    languages = require('../lib/languages'),
    async = require('async');
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
  var _this = this
    , User = mongoose.model('User')
    , Company = mongoose.model('Company');

  // This function will populate the users and
  // companies and then pass the context on to
  // the correct template.  Language filtering
  // will be done appropriately...either on 
  // User or Company as needed.  Notice we're
  // also pulling all companies and users into
  // memory instead of having a mongodb query.
  // We expect there'll be <200 users forever
  // and <50 companies.  So, BFD.
  // 
  function doRender(res, langKey){

    async.parallel({
      developers: function(cb){User.getActiveCached(cb)},
      companies: function(cb){Company.getActiveCached(cb)}
    },function(err, context){

      // Handle errors
      if (err) {throw err};

      // Handle empty results
      if (context[_this.slug].length == 0){
        return res.status(404).send("None found");
      }

      // Filter by language if there is a langKey.
      // Slug is assumed to be either 'developers' or 'comapnies',
      // and should correspond to our keys in the async.parallel
      // call above.
      if (typeof langKey !== 'undefined') {

        // Add language info to the context
        context.extraKeywords = [languages[langKey].name];
        context.language = languages[langKey].name;

        // Get only those developers/companies that match the language
        context[_this.slug] = _.filter(
          context[_this.slug],
          function(entity){return entity.languages.indexOf(langKey) != -1 }
        )
      };

      // Populate relationships
      var companyDict = _.indexBy(context['companies'], '_id');
      var developerDict = _.indexBy(context['developers'], '_id');
      for (var i = context['developers'].length - 1; i >= 0; i--) {
        var developer = context['developers'][i];
        developer.companies = [];
        for (var j = developer.company_ids.length - 1; j >= 0; j--) {
          var company = companyDict[developer.company_ids[j]];
          if (typeof company !== 'undefined') {
            if (typeof company.developers === 'undefined') {
              company.developers = [];
            };
            developer.companies.push(company);
            company.developers.push(developer);            
          };
        };
      };

      res.render(_this.template, context);
    });
  }

  // Get users (developers) or companies
  this.app.get('/' + this.slug, function(req, res){
    doRender(res);
  });

  // Get users or companies who use a particular language
  var langRoute = '/' + this.slug + '/:langKey(' + _.keys(languages).join('|') + ')?';
  this.app.get(langRoute, function(req, res){
    doRender(res, req.params.langKey);
  });

  return this;
};

module.exports = DevelopersController;