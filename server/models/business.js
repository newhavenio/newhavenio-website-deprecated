//
// Defines the Mongoose/MongoDB model for Businesses.
//
//
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var BusinessSchema = new Schema({

    // Housekeeping stuff
    createdAt : { type: Date, default: Date.now },
    modifiedAt : { type: Date, default: Date.now },

    // This allows admins to mark a business as inactive,
    // in which case they should not show up in search,
    // etc.  By default, businesses are inactive.
    active: {type: Boolean, default: false, index: true, required: true},

    // Business name
    name: {type: String, required: true},

    // Business description
    description: {type: String, required: false},

    // Web URL or
    // Careers page link
    webUrl: {type: String, required: false},

    // Company Twitter Acct
    twitterUrl: {type: String, required: false},

    // Technology stack
    // Tech used within company
    technologies: [{type: String, required: false}],

    // Address string (multi-line?)
    location: {type: String, required: false}

});

BusinessSchema.pre('save', function(next) {
  var user = this;

  // Update when this user was last modified
  user.modifiedAt = Date.now;

  return next();
});

module.exports = mongoose.model('Business', BusinessSchema);