// 
// Defines the Mongoose/MongoDB model for our users.
// 
// Obviously, Mongodb is the database that we're using
// and Mongoose is the ORM.
// * Mongoose: http://mongoosejs.com/docs/guide.html
// 
// 
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

// Instance method: is this user admin?
// 
UserSchema.methods.isAdmin = function () {
  result = this.roles.indexOf('admin') == -1 ? false : true;
  return result;
}


// Instance method: is this user admin or does this
// user have the same id as that passed?
// 
UserSchema.methods.isAdminOrSameId = function (userId) {
  var result = this.isAdmin();
  if (!result && userId == this.id){
    result = true;
  }
  return result;
}

// Our pre-save hooks for the user model.
// 
UserSchema.pre('save', function(next) {
  var user = this;

  // Update when this user was last modified
  user.modifiedAt = Date.now;

  return next();
});

module.exports = mongoose.model('User', UserSchema);