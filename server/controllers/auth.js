var EventEmitter = require('events').EventEmitter,
    GitHubStrategy = require('passport-github').Strategy,
    mongoose = require('mongoose');

// Get the User model from mongoose.  Assumes that
// You've registered this model already.  See user.js.
var User = mongoose.model('User');

function AuthController(app)
{
    if (!(this instanceof AuthController)) return new AuthController(app);

    EventEmitter.call(this);

    this.app = app;
}

AuthController.prototype = Object.create(EventEmitter.prototype);


AuthController.prototype.init = function(passport)
{
    this.passport = passport;

    /**
     * Passport session setup.
     * To support persistent login sessions, Passport needs to be able to
     * serialize users into and deserialize users out of the session. 
     * This is as simple as storing the user '_id' when serializing, and finding
     * the user by '_id' when deserializing. 
     *
     * @link https://github.com/jaredhanson/passport-github/blob/master/examples/login/app.js#L10
     */
    this.passport.serializeUser(function(user, done) {
      done(null, user._id);
    });

    this.passport.deserializeUser(function(user_id, done) {
      // The `done` callback here accepts err and user,
      // which are just what findOne will pass.
      User.findOne({'_id': mongoose.Types.ObjectId(user_id)}, done);
    });

    /**
     * Use Github Auth Strategy
     * @link https://github.com/jaredhanson/passport-github/blob/master/examples/login/app.js#L26
     */
    this.passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
      },
      function(accessToken, refreshToken, profile, done) {

        // Code to verify user. Return the user object
        // if verified.

        // Try to find a user with this GitHub ID.
        User.findOne({'githubInfo.id': profile._json.id}, function(err, user){

          // If we could not find a user, create one.
          if (user === null){

            console.log("Creating new user");
            user = new User;
            user.githubAccessToken = accessToken;

            // Note that, only some of the attributes
            // of GitHub's `_json` attribute will be persisted,
            // based on our User model. 
            //
            user.githubInfo = profile._json;
            user.populateFromGithub();

            // Just testing this
            user.isNew = true;

            // Save the user
            user.save(function(){
              return done(err, user);
            });

          }else{

            // We found a user with this Github ID
            // in our database.  Return the user object.
            return done(err, user);

          };
        });

      }
    ));

    return this;
}


// Setup Routes
AuthController.prototype.route = function()
{
    this.app.get('/auth', this.passport.authenticate('github'));

    this.app.get('/auth/callback',
        this.passport.authenticate('github', { failureRedirect: '/?error=yes' }),
        function(req, res) {
            // Successful authentication, redirect home.
            var url = '/';
            res.redirect(url);
    });

    this.app.get('/me', function(req, res)
    {
        res.send(req.user);
    });

    return this;
};

module.exports = AuthController;