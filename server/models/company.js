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

    // Company Twitter Acct
    twitterUrl: {type: String, required: false},

    // Technology stack
    // Tech used within company
    languages: [{type: String, enum: _.keys(programmingLanguages)}],

    // Address string (multi-line?)
    location: {type: String, required: false}

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

module.exports = mongoose.model('Company', CompanySchema);