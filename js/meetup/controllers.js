var Site = angular.module('newhavenIO',[]);

// Jekyll brackets conflict with Angularjs's.
// So, make Angular use this triplet instead.
//
Site.config(function($interpolateProvider){
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    }
);

// Set up the $http service for CORS
Site.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        console.log("wootshit");
    }
]);

// Controller that populates the upcoming events
// from the NewHaven.IO meet-up feed.
//
function MeetupEventController($scope, $http) {

  function dayDiff( d1, d2 ){
    var timeDiff = Math.abs(d2.getTime() - d1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays
  }

  // Grab the meetup data
  var meetupUrl = 'http://api.meetup.com/2/events?callback=JSON_CALLBACK&status=upcoming&order=time&limited_events=False&group_urlname=newhavenrb&desc=false&offset=0&format=json&page=10&fields=&sig_id=26187422&sig=e35187c94012e213ca7a64a603f21489b29094cb';
  $http.jsonp(meetupUrl).success(function(meetupResponse){

    // Save the events to the scope
    $scope.events = meetupResponse["results"];

    // Label each event with how many days away it is.
    var today = new Date();
    for (var i = $scope.events.length - 1; i >= 0; i--) {
      var event_time = new Date($scope.events[i]["time"]);
      $scope.events[i]["daysAway"] = dayDiff(event_time, today);
    };
  });
}