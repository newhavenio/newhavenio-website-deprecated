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
    name: {type: String, required: true, match: /^.{0,50}$/},

    // Company description
    description: {type: String, required: false, match: /^.{0,140}$/},

    // Web URL or
    // Careers page link
    webUrl: {type: String, required: false, match: /((http|ftp|https):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/},

    slug: {type: String, required: false, match: /^.{0,25}$/},

    // Company Twitter Acct
    twitterUrl: { type: String, required: false, match: /^[A-Za-z0-9_]{3,50}$/},
    linkedinUrl: { type: String, required: false, match: /^[\.A-Za-z0-9-\/]{5,75}$/},

    // Technology stack
    // Tech used within company
    languages: [{type: String, enum: _.keys(programmingLanguages)}],

    // Address string (multi-line?)
    location: {type: String, required: false, match: /^.{0,140}$/},

    admin_ids: [{ type: Schema.Types.ObjectId, ref: 'User'}]

});

CompanySchema.pre('save', function(next) {
  var user = this;

  // Update when this user was last modified
  user.modifiedAt = Date.now();

  return next();
});


CompanySchema.virtual('nameSlug').get(function () {
  if (!this._nameSlug) {
    this._nameSlug = this.name.toLowerCase().replace(/[^A-Z]/ig, '-').replace(/-+/, '-')
  };
  return this._nameSlug;
});

// The angular client sends over urls that don't
// start w/ http.  Rather than do the right thing
// and fix stuff, I'm going to do this for now.
CompanySchema.virtual('procotolWebUrl').get(function () {
  if(/https?:\/\//.test(this.webUrl)){
    return this.webUrl;
  }
  return 'http://' + this.webUrl;
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