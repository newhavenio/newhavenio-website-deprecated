
/**
 * Module dependencies.
 */
var express = require('express');
var expressValidator = require('express-validator');
var http = require('http');
var path = require('path');
var passport = require('passport');
var ApiController = require('./controllers/api');
var AuthController = require('./controllers/auth');

var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('static_dir', path.join(__dirname, process.env.STATIC_DIR))
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(expressValidator());
app.use(express.methodOverride());
app.use(express.cookieParser(process.env.COOKIE_SECRET));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(app.get('static_dir')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


/**
 * Application home page
 */
app.get('/',  function(req, res){
  res.sendfile(app.get('static_dir') + "/index.html");
});


/**
 * Setup Business API routes
 *
 * POST /business       Create new business
 * GET  /business       Show listing of businesses
 * GET  /business/{id}  Show business by ID
 */
api = new ApiController(app);
api.route();


/**
 * Setup Authentication routes
 * using Github oAuth
 *
 * GET /auth           Redirect to Github for auth
 * GET /auth/callback  Retrieve token from Github
 * GET /me             Test route to get session-based user info
 */
auth = new AuthController(app);
auth.init(passport).route();


// Start server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});