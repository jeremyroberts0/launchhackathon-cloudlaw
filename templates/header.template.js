$.notification().listen('initialize', 'header', '*', function(notification) {
	var id = notification.getId();
	
	$.notification().listen('updateTemplate', 'header', id, function(notification) {
		var payload = notification.getPayload();
		getPrimaryUser(function(credentials) {
			if (credentials === undefined) {
				$('#'+id+' .usernameLink').hide();
				$('#'+id+' .logoutLink').hide();
				$('#'+id+' .loginLink').show();
			} else if (credentials.userId !== undefined) {
				$('#'+id+' .usernameLink').html(credentials.userId);
				$('#'+id+' .loginLink').hide();
				$('#'+id+' .usernameLink').show();
				$('#'+id+' .logoutLink').show();
			}
		});
	});
	

	$.notification().notify('updateTemplate', 'header', id, { });
	
	$('#'+id+' a.logoutLink').click(function(){
		var customer = $.appConfig.defaultCustomer;
		
		getPrimaryUser(function(user) {
			var username = user.userId;
			$.notification().notify("authentication", "logout", username, {userId:username, customer:customer});
		});
	});
	
	$.notification().listen('authentication', 'logoutCompleted', id, function(notification){
		$('#'+id+' .usernameLink').hide();
		$('#'+id+' .logoutLink').hide();
		$('#'+id+' .loginLink').show();
	});
	
});

