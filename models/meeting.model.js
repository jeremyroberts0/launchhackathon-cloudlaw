$.notification().listen('get', 'model', 'meetings', function(notification) {
	var payload = notification.getPayload();
	
	getPrimaryUser(function(credentials){
		if (credentials === undefined || credentials.userId === undefined) {
			//payload.failure();
			//$.notification.notify("login", )
			//$('#header-loginModal').modal('show');
			$.utilities.redirect("login.html");
			// TODO user not logged in -- handle this better
		} else {
			$.server({"userId":$.appConfig.defaultUsername}).read("table", { id:"meeting"}, function(data) {
				if (data.result.length === 0) {
					if (payload.callback !== undefined) {
						payload.callback(data.result);
					}
				} else {
					if (payload.failure !== undefined) {
						payload.failure({message:'server error'});
					}
				}
				payload.callback(data.result);
			}, function(){
				if (payload.failure !== undefined) {
					payload.failure({message:'server error'});
				}
			});
		}
	});
});

$.notification().listen('get', 'model', 'ownMeetings', function(notification) {
	var payload = notification.getPayload();
	
	getPrimaryUser(function(credentials){
		if (credentials === undefined || credentials.userId === undefined) {
			//payload.failure();
			//$.notification.notify("login", )
			//$('#header-loginModal').modal('show');
			if (payload.failure !== undefined) {
				payload.failure({message:'not logged in'});
			}
			// TODO user not logged in -- handle this better
		} else {
			$.server({"userId":$.appConfig.defaultUsername}).read("table", { id:"meeting", filter:{customer:credentials.userId}}, function(data) {
				if (data.result.length !== 0) {
					$.each(data.result, function(index, meeting){
						data.result[index].time = $.utilities.parseEpoch(meeting.time);
					});
					if (payload.callback !== undefined) {
						payload.callback(data);
					}
				} else {
					if (payload.failure !== undefined) {
						payload.failure({message:'server error'});
					}
				}
			}, function(){
				if (payload.failure !== undefined) {
					payload.failure({message:'server error'});
				}
			});
		}
	});
});

$.notification().listen('create', 'model', 'meeting', function(notification){
	var payload = notification.getPayload();
	$.server({userId:$.appConfig.defaultUsername}).create('table', {id:'meeting', data:payload.meeting}, function(meetingResult) {
		if (payload.callback !== undefined) {
			payload.callback(meetingResult.result);
		}
	}, function(meetingResult) {
		if (payload.failure !== undefined) {
			payload.failure(meetingResult);
		}
	});
});

$.notification().listen('get', 'model', 'meeting', function(notification) {
	//alert("hi");
	var payload = notification.getPayload();
	//payload.callback({ attendees: [{name:"Rusty P..."}, {name:"Steve Jobs"}] });
	
	var payload = notification.getPayload();
	
	var meetingId = payload.id;
	
	$.server({"userId":$.appConfig.defaultUsername}).read("table", { id:"meeting", row:meetingId }, function(data) {
		if (payload.callback !== undefined) {
			var meeting = data.result[0];
			meeting['attendees'] = [{'name':meeting.host}, {'name':meeting.customer}];
			//alert(JSON.stringify(data));
			payload.callback(meeting);
		}
	}, function(){
		if (payload.failure !== undefined) {
			payload.failure({message:'server error'});
		}
	});
});
