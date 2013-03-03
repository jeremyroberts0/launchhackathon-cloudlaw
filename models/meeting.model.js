

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
			payload.callback( {'meetings':[{host:"Russell", time:"1362510000000"},{host:"Jeremy", time:"1362776400000"}]} ); // data.result});
//			$.server({"userId":$.appConfig.defaultUsername}).read("table", { id:"meeting", filter:{customer:credentials.userId}}, function(data) {
//				payload.callback( {'meetings':[{host:"Russell", time:"1362510000000"},{host:"Jeremy", time:"1362776400000"}]} ); // data.result});
//			});
		}
	});
	
});

