// This file contains code for managing our js and css
// assets using Piler: https://github.com/epeli/piler

// I suck at node, so the way I did this might not be
// kosher.  The AssetManager function takes an express
// object and adds .js and .css objects to app.locals
// so that 'css' and 'js' objects are availabe in all
// views that are rendered using the typical
// 'res.render'.  So, any view can use them!

// Set up asset management
var piler = require("piler"),
    _ = require('underscore');


function AssetManager(app, server){
    if (!(this instanceof AssetManager)) return new AssetManager(app, server);
    var _this = this;

    // Set up a little middleware that will add
    // cache-control headers to pile assets in production
    // with a max-age of 480 weeks.
    //
    app.configure('production', function(){
        app.use('/pile/min', function(req, res, next){
            if (!res.getHeader('Cache-Control')){
                res.setHeader('Cache-Control', 'public, max-age=290304000');
            }
            next();
        });        
    })

    // Configure JS
    js = piler.createJSManager();
    js.bind(app, server);

    // Not sure why we have to do this binding inside
    // of the app.configure
    app.configure(function() {
        js.bind(app, server);
        var jsFiles = {
          'modernizr': [
            "app/scripts/lib/modernizr-custom.min.js",
          ],
          'admin-app': [   
            "app/bower_components/jquery/jquery.js", 
            "app/bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js",
            "app/bower_components/lodash/lodash.js",
            "app/bower_components/angular/angular.js",
            "app/bower_components/angular-resource/angular-resource.js",
            "app/bower_components/angular-cookies/angular-cookies.js",
            "app/bower_components/angular-sanitize/angular-sanitize.js",
            "app/bower_components/restangular/dist/restangular.js",
            "app/scripts/apps/admin-app.js",
            "app/scripts/controllers/users.js",
            "app/scripts/services/userService.js",
            "app/scripts/services/companyService.js",
            "app/scripts/services/languageService.js",
            "app/scripts/controllers/user.js",
            "app/scripts/controllers/menu.js",
            "app/scripts/controllers/companyEdit.js",
            "app/scripts/controllers/useredit.js",
            "app/scripts/controllers/admin.js",
            "app/scripts/controllers/profile.js",
            "app/scripts/controllers/company.js",
            "app/scripts/filters/niceListFilter.js",
            "app/scripts/directives/confirmClick.js"
          ],
          'meetup-app': [   
            "app/bower_components/jquery/jquery.js",   
            "app/bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js",  
            "app/bower_components/lodash/lodash.js",
            "app/bower_components/angular/angular.js",
            "app/bower_components/angular-resource/angular-resource.js",
            "app/bower_components/angular-cookies/angular-cookies.js",
            "app/bower_components/angular-sanitize/angular-sanitize.js",
            "app/bower_components/restangular/dist/restangular.js",
            "app/scripts/apps/meetup-app.js",
            "app/scripts/controllers/main.js",
            "app/scripts/controllers/meetup.js",
            "app/scripts/filters/ordinalFilter.js",
            "app/scripts/services/meetupService.js",

          ],
          'gumby': [
            "app/bower_components/jquery/jquery.js",
            "app/bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js",
            "app/scripts/lib/shuffle.min.js",
            "app/scripts/main.js"
          ]
        }

        // Add the JS files to the Pile JS Manager
        for (var i=0, keys=_.keys(jsFiles), len=keys.length; i<len; ++i) {
          var key = keys[i],
              files = jsFiles[key];
          for (var j = 0; j < files.length; j++) {
            js.addFile(key, files[j]);
          };
        };
    });

    // Configure CSS
    css = piler.createCSSManager();
    css.addFile('app/css/gumby.css');
    css.bind(app, server);

    // Set up some magic to output tags that use
    // our CDN settings.
    var asHTML = function(namespace){
        var markup = this.renderTags(namespace, {disableGlobal: true});
        if (this.app.locals.cdn && process.env.NODE_ENV === 'production') {
            if (this.contentType === 'text/css') {
                var repl = 'href="';
            }else{
                var repl = 'src="';
            };
            markup = markup.replace(repl, repl + app.locals.cdn);
        };
        return markup;
    }
    css.asHTML = asHTML;
    js.asHTML = asHTML;

    app.locals.js = js
    app.locals.css = css

}

module.exports = AssetManager;