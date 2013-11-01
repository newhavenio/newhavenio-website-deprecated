// This file contains code for managing our js and css
// assets using Piler: https://github.com/epeli/piler

// I suck at node, so the way I did this might not be
// kosher.  The AssetManager function takes an express
// object and adds .js and .css objects to it.  These
// are JS and CSS managers from Piler.  So, then other
// controllers should have access to them.
// 

// Set up asset management
var piler = require("piler"),
    _ = require('underscore');


function AssetManager(app, server){
    if (!(this instanceof AssetManager)) return new AssetManager(app, server);
    var _this = this;

    // Configure JS
    app.js = piler.createJSManager();
    app.js.bind(app, server);

    // Not sure why we have to do this binding inside
    // of the app.configure
    app.configure(function() {
        app.js.bind(app, server);
        var jsFiles = {
          'modernizr': [
            "app/bower_components/modernizr/modernizr.js",
          ],
          'all': [        
            "app/bower_components/jquery/jquery.js",
            "app/bower_components/lodash/lodash.js",
            "app/bower_components/angular/angular.js",
            "app/bower_components/angular-resource/angular-resource.js",
            "app/bower_components/angular-cookies/angular-cookies.js",
            "app/bower_components/angular-sanitize/angular-sanitize.js",
            "app/bower_components/restangular/dist/restangular.js",
            "app/scripts/lib/gumby.min.js",
            "app/scripts/app.js",
            "app/scripts/controllers/main.js",
            "app/scripts/controllers/meetup.js",
            "app/scripts/filters/ordinalFilter.js",
            "app/scripts/services/meetupService.js",
            "app/scripts/controllers/users.js",
            "app/scripts/services/userService.js",
            "app/scripts/services/businessService.js",
            "app/scripts/controllers/user.js",
            "app/scripts/controllers/menu.js",
            "app/scripts/controllers/useredit.js",
            "app/scripts/controllers/business.js",
            "app/scripts/filters/niceListFilter.js",
            "app/scripts/directives/confirmClick.js"
          ],
          'gumby': [
            "app/bower_components/jquery/jquery.js",
            "app/scripts/lib/gumby.min.js",
          ]
        }

        // Add the JS files to the Pile JS Manager
        for (var i=0, keys=_.keys(jsFiles), len=keys.length; i<len; ++i) {
          var key = keys[i],
              files = jsFiles[key];
          for (var j = 0; j < files.length; j++) {
            app.js.addFile(key, files[j]);
          };
        };
    });

    // Configure CSS
    app.css = piler.createCSSManager();
    app.css.addFile('app/css/foo.css');
    app.css.bind(app, server);
}

module.exports = AssetManager;