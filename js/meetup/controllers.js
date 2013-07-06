var Site = angular.module('newhavenIO',[]);

// Jekyll brackets conflict with Angularjs's.
// So, make Angular use this triplet instead.
//
Site.config(function($interpolateProvider){
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    }
);

// Controller that populates the upcoming events
// from the NewHaven.IO meet-up feed.
//
function MeetupEventController($scope, $http) {

  // Calculate the difference in days between two
  // times, ignoring the hours, min, sec, etc.
  function dayDiff( d1, d2 ){
    var one = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
    var two = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());

    var timeDiff = Math.abs(two.getTime() - one.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays
  }


  // Array of Meetup.com event feeds
  var meetupFeeds = [
    {
      "eventPrefix": "",
      "meetupUrl": "http://api.meetup.com/2/events?callback=JSON_CALLBACK&status=upcoming&order=time&limited_events=False&group_urlname=newhavenio&desc=false&offset=0&format=json&page=20&fields=&sig_id=26187422&sig=aa008c5591ab44f404d9c70a48211e9089e5f7f8"
    },
    {
      "eventPrefix": "A100 ",
      "meetupUrl": "http://api.meetup.com/2/events?callback=JSON_CALLBACK&status=upcoming&order=time&limited_events=False&group_urlname=a100-dev-community&desc=false&offset=0&format=json&page=10&fields=&sig_id=26187422&sig=eb79b98cfd0843a7ad2998077697ca2f2d6baf76"
    }
  ];

  // Our list of events
  $scope.events = [];

  fetchEvents = function(eventPrefix, meetupUrl) {

    // Fetch the API response
    $http.jsonp(meetupUrl).success(function(meetupResponse){

      // Label each event with how many days away it is.
      var today = new Date();
      for (var i = meetupResponse["results"].length - 1; i >= 0; i--) {

        this_event = meetupResponse["results"][i];

        // Add the prefix
        this_event["name"] = eventPrefix + this_event["name"];

        // Calculate the number of days until this event
        var event_time = new Date(this_event["time"]);
        this_event["daysAway"] = dayDiff(event_time, today);

        // Push it onto our array of events
        $scope.events.push(this_event);
      };
    });
  }

  // Populate the events list from the Meetup.com API
  for (var i = meetupFeeds.length - 1; i >= 0; i--) {
    fetchEvents(meetupFeeds[i]["eventPrefix"], meetupFeeds[i]["meetupUrl"]);
  };
}