'use strict';

describe('Service: meetupService', function () {

  // load the service's module
  beforeEach(module('nhvioApp'));

  var meetupService, events, feeds;
  var $httpBackend, $rootScope; 


  beforeEach(inject(function ($injector, _meetupService_) {
    // Create the service
    meetupService = _meetupService_;

    // We're going to mock HTTP responses from Meetup.com's API
    $httpBackend = $injector.get('$httpBackend');

    // Need this to force an Angular digest cycle
    $rootScope = $injector.get('$rootScope');

    // Mock the Meetup.com API responses.  Any JSONP request to
    // the Meetup.com API will return the following JS object.
    $httpBackend.whenJSONP(/api.meetup.com/).respond({
      "meta": {
          "count": 2, 
          "description": "Access Meetup events using a group, member, or event id. Events in private groups are available only to authenticated members of those groups. To search events by topic or location, see [Open Events](/meetup_api/docs/2/open_events).", 
          "id": "", 
          "lat": "", 
          "link": "http://api.meetup.com/2/events", 
          "lon": "", 
          "method": "Events", 
          "next": "http://api.meetup.com/2/events?status=upcoming&sig_id=26187422&order=time&limited_events=False&group_urlname=newhavenio&desc=false&sig=aa008c5591ab44f404d9c70a48211e9089e5f7f8&offset=1&format=json&page=20&fields=", 
          "title": "Meetup Events v2", 
          "total_count": 2, 
          "updated": 1374613002000, 
          "url": "http://api.meetup.com/2/events?status=upcoming&sig_id=26187422&order=time&limited_events=False&group_urlname=newhavenio&desc=false&sig=aa008c5591ab44f404d9c70a48211e9089e5f7f8&offset=0&format=json&page=20&fields="
      }, 
      "results": [
          {
              "announced": false, 
              "created": 1363303362000, 
              "description": "<p>Monthly Hack Night El Segundo!</p>\n<p>Same as El Primero: if you want to give a talk, let us know; otherwise we'll be pairing up and hacking.</p>", 
              "event_url": "http://www.meetup.com/newhavenio/events/132003262/", 
              "group": {
                  "group_lat": 41.33000183105469, 
                  "group_lon": -72.94000244140625, 
                  "id": 1843611, 
                  "join_mode": "open", 
                  "name": "New Haven IO", 
                  "urlname": "newhavenio", 
                  "who": "Developers"
              }, 
              "headcount": 0, 
              "id": "qbwkpfyrlbcc", 
              "maybe_rsvp_count": 0, 
              "name": "NewHaven.rb - Hack Night #2", 
              "status": "upcoming", 
              "time": new Date().getTime() + (1000 * 3600 * 24), 
              "updated": 1373106586000, 
              "utc_offset": -14400000, 
              "visibility": "public", 
              "waitlist_count": 0, 
              "yes_rsvp_count": 2
          }, 
          {
              "announced": true, 
              "created": 1374597562000, 
              "description": "<p>The Southern Connecticut Open Source User Group (SCOSUG) is hosting a picnic and key signing event at Sleeping Giant State Park.</p>", 
              "event_url": "http://www.meetup.com/newhavenio/events/130985482/", 
              "group": {
                  "group_lat": 41.33000183105469, 
                  "group_lon": -72.94000244140625, 
                  "id": 1843611, 
                  "join_mode": "open", 
                  "name": "New Haven IO", 
                  "urlname": "newhavenio", 
                  "who": "Developers"
              }, 
              "headcount": 0, 
              "id": "130985482", 
              "maybe_rsvp_count": 0, 
              "name": "SCOSUG - 2013 picnic and key signing event!", 
              "status": "upcoming", 
              "time": new Date().getTime() + (1000 * 3600 * 24 * 2), 
              "updated": 1374600161000, 
              "utc_offset": -14400000, 
              "venue": {
                  "address_1": "Hamden, CT", 
                  "city": "Hamden", 
                  "country": "us", 
                  "id": 10319532, 
                  "lat": 41.341488, 
                  "lon": -72.913994, 
                  "name": "Sleeping Giant State Park", 
                  "repinned": false, 
                  "state": "CT", 
                  "zip": "06517"
              }, 
              "visibility": "public", 
              "waitlist_count": 0, 
              "yes_rsvp_count": 7
          }
      ]})

    // List of feeds that we want to get.  These
    // are typically provided by the controller
    // using the service.
    feeds = [
      {
        "eventPrefix": "House Stark",
        "meetupUrl": "http://api.meetup.com/2/events?fake1"
      },
      {
        "eventPrefix": "House Lannister",
        "meetupUrl": "http://api.meetup.com/2/events?fake2"
      }
    ];

    // Expect one call to the Meetup.com API for each
    // of the feeds.
    for (var i = 0; i < feeds.length; i++) {
      $httpBackend.expectJSONP(/api.meetup.com/);
    };

    // The service returns a promise.  We're going to 
    // grab the events once that promise is resolved.
    var eventsPromise = meetupService.getEvents(feeds);
    eventsPromise.then(function(result){
      events = result;
    })

    // Response to all pending HTTP requests and then
    // trigger an Angular digest cycle, which will 
    // cause our promise to be resolved.
    $httpBackend.flush();
    $rootScope.$digest();
  }));

  // Test teardown.  Verify that all our requests are done.
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  // 
  // Tests are below here
  // 

  it('should fetch events from the Meetup.com API', function () {
    expect(events.length).toBe(4);
  });

  it('should get events with names, times, etc.', function () {
    for (var i = events.length - 1; i >= 0; i--) {
      var event = events[i];
      expect(typeof(event.name)).toBe("string");
      expect(typeof(event.time)).toBe("number");
      expect(typeof(event.yes_rsvp_count)).toBe("number");
      expect(typeof(event.daysAway)).toBe("number");
    };
  });

  it('should correctly add event prefixes', function () {
    expect(events[0].name).toMatch(new RegExp("^" + feeds[0]["eventPrefix"]));
    expect(events[events.length-1].name).toMatch(new RegExp(feeds[feeds.length-1]["eventPrefix"]));
  });

});
