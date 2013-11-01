
/**
 * Module dependencies.
 */
var express = require('express');
var fs = require('fs');
var connect = require('connect');

// Initialize our MongoDB connection
// and our models
var mongoose = require('mongoose');
var models_path = __dirname + '/models';
fs.readdirSync(models_path).forEach( function(file){
	require(models_path + '/' + file);
});

// Other dependencies...
var expressValidator = require('express-validator');
var http = require('http');
var path = require('path');
var passport = require('passport');
var MeetupController = require('./controllers/meetup');
var ApiController = require('./controllers/api');
var AuthController = require('./controllers/auth');
var DevelopersController = require('./controllers/developers');
var app = express();
var server = http.createServer(app);

// Set up compression
app.use(connect.compress());

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Handle static content first
app.set('static_dir', 'app');
app.use(express.static(app.get('static_dir')));

var assetManager = require('./lib/assets')(app, server);

// Set up nunjucks templating
var nunjucks = require('nunjucks');
nunjucks.configure('server/views', {
    autoescape: true,
    express: app,
    watch: true
});

// Handle a bunch of other crap
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(expressValidator());
app.use(express.methodOverride());
app.use(express.cookieParser(process.env.COOKIE_SECRET));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());

// Attach our routes, which are mounted below
app.use(app.router);

// Database configuration
mongoose.connect(process.env.MONGOHQ_URL);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


/**
 * Setup Meetup routes
 *
 * GET  /       Show listing of meetups on front page
 */
meetup = new MeetupController(app);
meetup.route();

/**
 * Setup Developer routes
 *
 * GET  /       Show listing of Developers on front page
 */
Developers = new DevelopersController(app);
Developers.route();

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


// Start the server
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});