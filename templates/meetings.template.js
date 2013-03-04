

$.notification().listen('initialize', 'meetings', '*', function(notification) {
	var id = notification.getId();
	
	$('.meeting-card').each(function(){
		var time = $('a', this).attr('href');
		time = time.replace('meeting.html?id=');
		time = parseInt(time);
		
		var date = new Date();
		var currentTime = date.getTime();
		
		console.error(time ' ' currentTime);
		if (time < currentTime) {
			$('a', this).removeAttr('href').html('Meeting Over').addClass('meeting-completed');
		} 
		
	});
	
});

