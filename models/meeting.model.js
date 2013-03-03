

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
			$.server({"userId":$.appConfig.defaultUsername}).read("table", { id:"meeting", filter:{customer:credentials.userId}}, function(data) {
				payload.callback( {'meetings':[{host:"Russell", time:"1242132345413"},{host:"Jeremy", time:"5435232345452"}]} ); // data.result});
			});
		}
	});
	
});

