

$.notification().listen('initialize', 'meetings', '*', function(notification) {
	var id = notification.getId();
	
	$('.meeting-card').each(function(){
		var time = $('a', this).attr('href');
		time = time.replace('meeting.html?id=', '');
		time = parseInt(time);
		
		var date = new Date();
		var currentTime = date.getTime();
//		if (time + 3600000 < currentTime) {
//			$('a', this).removeAttr('href').html('Meeting Over').addClass('meeting-unavailable');
//		} else {
////			if (time - 900000 < currentTime && time + 3600000 < currentTime) {
//				$('a', this).html('Start Meeting');
////			}
//		}
		
	});
	
});

