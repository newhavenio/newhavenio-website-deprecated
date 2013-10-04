
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

/**
 * Serializing user object...apparently
 *
 * @link https://github.com/jaredhanson/passport-github/blob/master/examples/login/app.js#L10
 */
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

/**
 * Handle
 * @link https://github.com/jaredhanson/passport-github/blob/master/examples/login/app.js#L26
 */
passport.use(new GitHubStrategy({
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

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('static_dir', path.join(__dirname, process.env.STATIC_DIR))
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('newhaven.iosuperlargehadroncolliderkey'));
app.use(express.session());
// Passport init and session
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(app.get('static_dir')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/',  function(req, res){
  res.sendfile(app.get('static_dir') + "/index.html");
});

app.get('/me', function(req, res){
    console.log(req.user); // Error app out if not set
});

app.get('/auth', passport.authenticate('github'));
app.get('/auth/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});