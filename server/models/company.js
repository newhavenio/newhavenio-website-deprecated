//
// Defines the Mongoose/MongoDB model for Companies.
//
//
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , _ = require('underscore');

var programmingLanguages = require('../lib/languages');

var CompanySchema = new Schema({

    // Housekeeping stuff
    createdAt : { type: Date, default: Date.now },
    modifiedAt : { type: Date, default: Date.now },

    // This allows admins to mark a business as inactive,
    // in which case they should not show up in search,
    // etc.  By default, businesses are inactive.
    active: {type: Boolean, default: false, index: true, required: true},

    // Company name
    name: {type: String, required: true},

    // Company description
    description: {type: String, required: false},

    // Web URL or
    // Careers page link
    webUrl: {type: String, required: false},

    slug: {type: String, required: false},

    // Company Twitter Acct
    twitterUrl: {type: String, required: false},

    // Technology stack
    // Tech used within company
    languages: [{type: String, enum: _.keys(programmingLanguages)}],

    // Address string (multi-line?)
    location: {type: String, required: false},

    admin_ids: [{ type: Schema.Types.ObjectId, ref: 'User'}]

});

CompanySchema.pre('save', function(next) {
  var user = this;

  // Update when this user was last modified
  user.modifiedAt = Date.now;

  return next();
});

// Return a list of the languages this person uses,
// in pairs like ['python', 'Python'], etc.
// 
CompanySchema.virtual('languagePairs').get(function () {
  return _.map(this.languages, function(l){
    return [l, programmingLanguages[l]]
  });
});

CompanySchema.virtual('nameSlug').get(function () {
  if (!this._nameSlug) {
    this._nameSlug = this.name.toLowerCase().replace(/[^A-Z]/ig, '-').replace(/-+/, '-')
  };
  return this._nameSlug;
});


// Keep an array of active companies cached in
// memory.  Clear them upon write operations!
var cachedCompanies = [];
CompanySchema.statics.getActiveCached = function (cb) {
  if (cachedCompanies.length == 0) {
    this.find({ active: true }, function(err, companies){
      console.log('found ', companies.length, ' companies');
      companies.sort(function(coA, coB){
        descLenA = coA.description ? coA.description.length : 0;
        descLenB = coB.description ? coB.description.length : 0;
        return descLenB - descLenA;
      });
      cachedCompanies = companies;
      cb(err, cachedCompanies);
    });
  }else{
      console.log('found ', cachedCompanies.length, ' cached companies');
      cb(null, cachedCompanies);
  };
}
CompanySchema.statics.clearCached = function (cb) {
  console.log('Cleared cache of companies');
  cachedCompanies = [];
}

module.exports = mongoose.model('Company', CompanySchema);