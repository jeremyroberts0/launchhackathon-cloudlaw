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
		$.notification().notify('updateTemplate', 'header', id, { });
	});
	
	$.notification().listen('showGlobalNotification', 'header', id, function(notification) {
		
		var payload = notification.getPayload();
		$('#'+id+' .globalNotification p').html(payload.text);
		$('#'+id+' .globalNotification p').attr('class', payload.type);
		$('#body').addClass('extraPadding');
//		$('#body').animate({padding-top:130});
		$('#'+id+' .globalNotification').slideDown();
	});
	
	$.notification().listen('hideGlobalNotification', 'header', id, function(notificaiton) {
		$('#body').removeClass('extraPadding');
//		$('#body').animate({padding-top:80});
		$('#'+id+' .globalNotification').slideUp();
	});
	
});

