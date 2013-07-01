// Gumby is ready to go
Gumby.ready(function() {
	console.log('Gumby is ready to go...', Gumby.debug());

	// placeholder polyfil
	if(Gumby.isOldie || Gumby.$dom.find('html').hasClass('ie9')) {
		$('input, textarea').placeholder();
	}
});

// // Oldie document loaded
// Gumby.oldie(function() {

// });

// // Document ready
// $(function() {
//   var timerId =
//   countdown(
//     new Date("April 27, 2013 06:00:00"),
//     function(ts) {
//       console.log(ts);
//       document.getElementById('meetupTimer').innerHTML = ts.toHTML("strong");
//     },
//     countdown.HOURS|countdown.MINUTES|countdown.SECONDS);
    
//     var timerId =
//   countdown(
//     new Date("March 20, 2013 12:30:00"),
//     function(ts) {
//       console.log(ts);
//       document.getElementById('lunchTimer').innerHTML = ts.toHTML("strong");
//     },
//     countdown.HOURS|countdown.MINUTES|countdown.SECONDS);

// // later on this timer may be stopped
// //window.clearInterval(timerId);
// });

