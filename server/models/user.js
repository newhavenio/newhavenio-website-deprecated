// 
// Defines the MongoDB model for our users.
// 
// Just to be safe, we're encrypting the OAuth
// provider IDs and tokens. Based in part on
// https://github.com/hiattp/express3-mongodb-bootstrap-demo/blob/master/models/user.js
// 
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;


var UserSchema = new Schema({

  // Housekeeping stuff
  createdAt : { type: Date, default: Date.now },
  modifiedAt : { type: Date, default: Date.now },
  active: {type: Boolean, default: true},
  roles: [String],

  // Biographical information.  We're going to
  // pull this out of GitHub when the user first
  // registers, but maybe we'll let them edit
  // these values at nhv.io.
  // 
  firstName : { type: String, required: false },
  lastName : { type: String, required: false },
  email : { type: String, required: false, index: { unique: true } },

  // OAuth info.  We're using GitHub, perhaps others
  // in the future.  Notice the `select` parameter here.
  // By setting this to false, we won't get the 
  // `githubAccess___` attributes back in queries
  // by default.  This is to better protect this 
  // information and not accidently return it in an
  // API response.
  // 
  githubAccessToken : { type: String, required: true, select: false},
  githubAccessTokenExpired : { type: String, required: true, default: false, select: false},

  // Info we receive from GitHub after successful
  // OAuth callback.
  // 
  githubInfo : {

    // Core deets
    id: {type: Number, required: true, index: { unique: true }},
    login: { type: String, required: true },
    name: { type: String, required: true },

    // Other shiz
    avatar_url: String,
    gravatar_id: String,
    company: String,
    blog: String,
    location: String,
    email: {type: String, select: false},
    hireable: Boolean,
    // Not interested in storing these
    // bio: String,
    // created_at: String,
    // updated_at: String,
    // public_repos: Number,
    // followers: Number,
    // following: Number,
    // public_gists: Number,
  }
});

// Our pre-save hooks for the user model.
// 
UserSchema.pre('save', function(next) {
  var user = this;

  // Update when this user was last modified
  user.modifiedAt = Date.now;

  return next();
});

module.exports = mongoose.model('User', UserSchema);