var EventEmitter = require('events').EventEmitter,
    GitHubStrategy = require('passport-github').Strategy;

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
     * Serializing user object...apparently
     *
     * @link https://github.com/jaredhanson/passport-github/blob/master/examples/login/app.js#L10
     */
    this.passport.serializeUser(function(user, done) {
      done(null, user);
    });

    this.passport.deserializeUser(function(obj, done) {
      done(null, obj);
    });

    /**
     * Use Github Auth Strategy
     * @link https://github.com/jaredhanson/passport-github/blob/master/examples/login/app.js#L26
     */
    this.passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://172.16.27.146:9000/auth/callback" // whooo, hard-coding!
      },
      function(accessToken, refreshToken, profile, done) {
        // Code to verify user. Return prfile if verified.
        // Here we're just verifying straight away.
        return done(null, profile);
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
            res.redirect('/?error=no');
    });

    this.app.get('/me', function(req, res)
    {
        res.send(req.user);
    });

    return this;
};

module.exports = AuthController;