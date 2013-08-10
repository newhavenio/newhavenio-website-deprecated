'use strict';

// The meetupService has a method `getEvents` that will
// download lists of upcoming events from the Meetup.com
// API and return to the caller a promise.
// 
angular.module('nhvioApp')
  .factory('meetupService', ['$http', '$q', function ($http, $q) {

    // Service logic goes here.
    // ...
    var meaningOfLife = 42;

    // Calculate the difference in days between two
    // times, ignoring the hours, min, sec, etc.
    function dayDiff( d1, d2 ){
      var one = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
      var two = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());

      var timeDiff = Math.abs(two.getTime() - one.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return diffDays;
    }

    // Get lists of events from the Meetup.com API.
    // Returns a promise, which is resolved to the
    // combined list of events.
    // 
    function getEvents(feeds){
      var deferred = $q.defer();
      var meetupEvents = [];
      var numRequestsFinished = 0;

      // If we're done requesting 
      function resolveIfDone(action){
        numRequestsFinished += 1;
        if (numRequestsFinished === feeds.length) {
          action(meetupEvents);
        }
      }

      function getEventsForFeed(meetupUrl, eventPrefix){

        // Fetch the API response
        $http.jsonp(meetupUrl).success(function(meetupResponse){

          // Label each event with how many days away it is.
          var today = new Date();
          for (var i = meetupResponse.results.length - 1; i >= 0; i--) {

            var thisEvent = meetupResponse.results[i];

            // Add the prefix
            if(typeof(eventPrefix) === 'string' && eventPrefix.length > 0){
              thisEvent.name = eventPrefix + ' ' + thisEvent.name;
            }

            // Calculate the number of days until this event
            var eventTime = new Date(thisEvent.time);
            thisEvent.daysAway = dayDiff(eventTime, today);

            // Push it onto our array of events
            meetupEvents.push(thisEvent);
          }
          resolveIfDone(deferred.resolve);

        }).error(function() {

            // If there was any error with the Meetup.com
            // API, reject the promise, but return any
            // events that we happened to get.
            resolveIfDone(deferred.reject);
          });

      }

      // For each feed, fetch the Meetup.com API response
      for (var i = feeds.length - 1; i >= 0; i--) {
        var meetupUrl = feeds[i].meetupUrl;
        var eventPrefix = feeds[i].eventPrefix;
        getEventsForFeed(meetupUrl, eventPrefix);
      }
      return deferred.promise;
    }

    // Public API is defined here.  Everything above
    // is private.
    // 
    return {
      someMethod: function () {
        return meaningOfLife;
      },
      getEvents: getEvents
    };
  }]);
