$.notification().listen('initialized', 'calendar', '*', function(notification) {
	$.notification().notify('updateCalendar', 'controller', 'book', { }); 
});

$.notification().listen('updateCalendar', 'controller', 'book', function(notification) {
	var meetings = notification.getData('meetings', [ ]);
	
	var meetingsReady = $.Deferred();
	
	if (meetings.length === 0) {
		$.notification().notify('get', 'model', 'meetings', {callback:function(result) {
			meetings = result;
			notification.setData('meetings', meetings);
			updateCal();
		}});
	} else {
		updateCal();
	}
	function updateCal() {
		var events = [ ];
		$.each(meetings, function(index, meeting) {
			events.push({epoch:meeting.time, host:meeting.host});
		});
		$.notification().notify('update', 'calendar', '*', {unavailableEvents:events, weekChange:0});
	}
	
});

$.notification().listen('placeOrder', 'controller', 'book', function(notification) {
	var payload = notification.getPayload();
	var data = payload.data;
	
	
//	address1: "4 add1"
//	address2: "add2"
//	appointmentCalendar-selected-date: "1362416400000"
//	bookpage-service: "Startup Package"
//	ccv: "05/19"
//	city: "city"
//	firstName: "jeremy"
//	firstNameOnCard: "card1"
//	lastName: "roberts"
//	lastNameOnCard: "card2"
//	number: "4111-1111-1111-1111"
//	state: "CA"
//	type: "Visa"
//	zipcode: "92938"
	
	//Create appointment
	//Fake the payment
	
	getPrimaryUser(function(credentials) {
		if (credentials !== undefined && credentials.userId !== undefined) {
			
			if (data['appointmentCalendar-selected-date'] === undefined) {
				$.notification().notify('showSelectATimeAlert', 'calendar', '*', { });
			} else {
				var meeting = {
						customer:credentials.userId,
						service:data['bookpage-service'],
						time:data['appointmentCalendar-selected-date'],
						host:'Ben Matlock',
						hostEmail:'ben@matlock.com'
					};
				var order = {
						customer:credentials.userId,
						service:data['bookpage-service'],
						time:data['appointmentCalendar-selected-date'],
						address1:data.address1,
						address2:data.address2,
						city:data.city,
						state:data.state,
						zipcode:data.zipcode,
				}
					
				
					$.notification().notify('create', 'model', 'meeting', {meeting:meeting, callback:function(meetingId) {
						$.server({userId:$.appConfig.defaultUsername}).override('table', {id:meetingId, row:meetingId, data:order}, function(){
							$.utilities.redirect('account.html?newMeeting='+meetingId);
						});
					}});
					
					
				
					
				
			}
			
			
		} else {
			$.notification().notify('userNotLoggedIn', 'controller', 'book', { });
		}
	});
	
	
	
});

$.notification().listen('userNotLoggedIn', 'controller', 'book', function(notification) {
	var location = window.location.href;
	$.utilities.redirect('login.html?ref=' + encodeURIComponent(document.location.href) + '#needAccount');
	
});

$.notification().listen('topicChosen', 'controller', 'book', function(notification){
	//Collapse the topic section
	//Show the calendar section
});

$.notification().listen('dateChosen', 'controller', 'book', function(notification){
	//Collapse the calendar section
	//Show the payments section
});

