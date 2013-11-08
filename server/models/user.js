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
  , Schema = mongoose.Schema
  , _ = require('underscore');

// This is a list of the top 100 languages on GitHub
// in 2013 taken from the following website:
// http://adambard.com/blog/top-github-languages-for-2013-so-far/
// Until we figure out how to best share code between
// the client and the server, this list is duplicated
// in the AngularJS client app.
//
var programmingLanguages = require('../lib/languages');

var UserSchema = new Schema({

  // The companies where this user (developer) works
  company_ids: [{ type: Schema.Types.ObjectId, ref: 'Company' }],

  // Housekeeping stuff
  createdAt : { type: Date, default: Date.now },
  modifiedAt : { type: Date, default: Date.now },

  // This allows admins to mark somebody as inactive,
  // in which case they should not show up in search,
  // etc.  By default, people are inactive.
  active: {type: Boolean, default: false, index: true},

  // This boolean indicates, when true, that a user has
  // just registered and has not yet edited their profile.
  // The first time we receive a PUT editing this user's
  // profile, we'll mark them as isNew = false.
  newlyRegistered: {type: Boolean, default: false},

  // This boolean indicates, when true, that a user has
  // will allow people to contact them via the website
  // using a form that has a captcha.
  allowsContact: {type: Boolean, default: true},

  // Did the user complete their registration, including
  // filling our their languages, etc.?
  complete: {type: Boolean, default: false},

  // Roles include, most importantly "admin".
  roles: [String],

  // Languages are the languages in which you code.
  // This is an array of tags.  Valid tags should be
  // limited by the client.
  languages: [{type: String, enum: _.keys(programmingLanguages)}],

  // Skills the person has.  These can be anything,
  // but are limited to 25 characters each.
  skills: [{type: String, match: /.{,25}/}],

  // Biographical information.  We're going to
  // pull this out of GitHub when the user first
  // registers, but maybe we'll let them edit
  // these values at nhv.io.
  //
  firstName : { type: String, required: false, match: /.{1,50}/},
  lastName : { type: String, required: false, match: /.{1,50}/ },
  email : { type: String, required: false, index: { unique: true }, match: /.{1,50}/},

  // Social URLs, those that aren't linked by OAuth
  twitterUrl: { type: String, required: false, match: /^[A-Za-z0-9_]{3,50}$/},
  linkedinUrl: { type: String, required: false, match: /^[\.A-Za-z0-9-\/]{5,75}$/},
  // This also has a length validator, defined below.
  blogUrl: { type: String, required: false, match: /((http|ftp|https):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/},

  // Bio, in plaintext.  Size of a tweet.
  bio: { type: String, required: false, match: /^.{0,140}$/},

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

// Method that is called when a user is first created.
// Populates some fields like firstName, lastName, email
// from related fields in githubInfo.
//
UserSchema.methods.populateFromGithub = function (cb) {
  if (typeof(this.githubInfo) != 'undefined'){
    if (this.githubInfo.name) {
      nameBits = this.githubInfo.name.split(/\s+/);
      if (nameBits.length >= 2){
        this.firstName = nameBits[0];
        this.lastName = nameBits[nameBits.length-1];
      }
    }else{
      this.firstName = 'First Name';
      this.lastName = 'Last Name';
    };
    this.email = this.githubInfo.email;
    if (this.githubInfo.blog) {
      this.blogUrl = this.githubInfo.blog.slice(0, 100);
    };

    // There are some people that we know should be
    // admins.  Put their GitHub login in KNOWN_ADMINS.
    knownAdmins = process.env.KNOWN_ADMINS
    if (typeof knownAdmins === 'string' && knownAdmins.split(',').indexOf(this.githubInfo.login) != -1) {
      this.roles.push('admin');
    };
  }
}

// Our pre-save hooks for the user model.
//
UserSchema.pre('save', function(next) {
  var user = this;

  // Update when this user was last modified
  user.modifiedAt = Date.now;

  return next();
});

var User = mongoose.model('User', UserSchema)


// Validation

UserSchema.path('blogUrl').validate(function (value) {
  if (value != null && value.length > 50){
    return false
  }else{
    return true
  }
}, 'Too long');



module.exports = User;