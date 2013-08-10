'use strict';

// Controller that populates the upcoming events
// from the NewHaven.IO meet-up feed.
//
angular.module('nhvioApp')
  .controller('MeetupCtrl', ["$scope", "$http", "meetupService", function ($scope, $http, meetupService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
	  $scope.events = [];

    // Array of Meetup.com event feeds
    var feeds = [
      {
        "eventPrefix": "",
        "meetupUrl": "http://api.meetup.com/2/events?callback=JSON_CALLBACK&status=upcoming&order=time&limited_events=False&group_urlname=newhavenio&desc=false&offset=0&format=json&page=20&fields=&sig_id=26187422&sig=aa008c5591ab44f404d9c70a48211e9089e5f7f8"
      },
      {
        "eventPrefix": "A100",
        "meetupUrl": "http://api.meetup.com/2/events?callback=JSON_CALLBACK&status=upcoming&order=time&limited_events=False&group_urlname=a100-dev-community&desc=false&offset=0&format=json&page=10&fields=&sig_id=26187422&sig=eb79b98cfd0843a7ad2998077697ca2f2d6baf76"
      }
    ];
    $scope.events = meetupService.getEvents(feeds);

  //   // Watch the meetupService for changes
  //   // and pull them into the current scope.
		// $scope.$watch( meetupService.events, function ( drawing ) {
		//   $scope.events = meetupService.events;
		// });

  }]);


