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
			meetingsReady.resolve();
		}, failure:function(){
			meetingsReady.resolve();
		}});
		
		meetingsReady.done(function() {
			var events = [ ];
			$.each(meetings.meetings, function(index, meeting) {
				events.push({epoch:meeting.time, host:meeting.host});
			});
			$.notification().notify('update', 'calendar', '*', {unavailableEvents:events, weekChange:0});
		});
	}
});

$.notification().listen('topicChosen', 'controller', 'book', function(notification){
	//Collapse the topic section
	//Show the calendar section
});

$.notification().listen('dateChosen', 'controller', 'book', function(notification){
	//Collapse the calendar section
	//Show the payments section
});