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
				if (data.result.length === 0) {
					if (payload.callback !== undefined) {
						payload.callbac(data.result);
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