$.notification().listen('get', 'model', 'ownDocuments', function(notification) {
	var payload = notification.getPayload();
	
	getPrimaryUser(function(credentials){
		if (credentials !== undefined && credentials.userId !== undefined) {
			var customer = credentials.userId;
			
			$.server({userId:$.appConfig.defaultUsername}).read('table', {id:'document', filter:{customer:credentials.userId}}, function(documentResult){
				if (payload.callback !== undefined) {
					payload.callback(documentResult);
				}
			}, function(){
				if (payload.failure !== undefined) {
					payload.failure();
				}
			});
		} else {
			if (payload.failure !== undefined) {
				payload.failure();
			}
		}
	});
});

$.notification().listen('get', 'model', 'documents', function(notification) {
	var payload = notification.getPayload();
	
	$.server({userId:$.appConfig.defaultUsername}).read('table', {id:'document'}, function(documentResult) {
		if (payload.callback !== undefined) {
			payload.callback(documentResult);
		}
	}, function(){
		if (payload.failure !== undefined) {
			payload.failure();
		}
	});
	
});

$.notification().listen('get', 'model', 'documentsForMeeting', function(notification){
	var payload = notification.getId();
	var id = payload.meetingId;
	
	$.server({userId:$.appConfig.defaultUsername}).read('table', {id:'document', filter:{meetingId:meetingId}}, function(documentResult){
		if (payload.callback !== undefined) {
			payload.callback(documentResult);
		}
	}, function(){
		if (payload.failure !== undefined) {
			payload.failre();
		}
	});
});

$.notification().listen('get', 'model', 'ownDocumentsByMeeting', function(notification) {
	var payload = notification.getPayload();
	var sortedMeetings = { };
	var sortedDocs = { };
	
	var ownDocsCall = $.Deferred();
	var ownMeetingsCall = $.Deferred();
	
	$.notification().notify('get', 'model', 'documents', {failure:payload.failure, callback:function(ownDocumentsResult) {
		$.each(ownDocumentsResult.result, function(index, document){
			if (sortedDocs[document.meetingId] === undefined) {
				sortedDocs[document.meetingId] = [ ];
			}
			sortedDocs[document.meetingId].push(document);
		});
		ownDocsCall.resolve();
	}});
	
	$.notification().notify('get', 'model', 'ownMeetings', {callback:function(ownMeetingsResult) {
		$.each(ownMeetingsResult.result, function(index, meeting){
			sortedMeetings[meeting.id] = meeting;
		});
		ownMeetingsCall.resolve();
	}});
	
	var callsDone = $.when(ownDocsCall, ownMeetingsCall)
	
	callsDone.done(function(){
		var docsToReturn = [ ];
		
		$.each(sortedDocs, function(meetingId, docsInMeeting) {
			var nextMeeting = { };
			nextMeeting.id = meetingId;
			nextMeeting.documents = docsInMeeting;
			nextMeeting.time = sortedMeetings[meetingId].time;
			nextMeeting.service = sortedMeetings[meetingId].service
			nextMeeting.host = sortedMeetings[meetingId].host;
			nextMeeting.hostName = sortedMeetings[meetingId].hostName;
			docsToReturn.push(nextMeeting);
		});
		
		if (payload.callback !== undefined) {
			payload.callback({packages:docsToReturn});
		}
	});
});