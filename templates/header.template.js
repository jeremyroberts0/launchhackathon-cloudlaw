$.notification().listen('initialize', 'header', '*', function(notification) {
	var id = notification.getId();
	
	$.notification().listen('updateTemplate', 'header', id, function(notification) {
		var payload = notification.getPayload();
		getPrimaryUser(function(credentials){
			if (credentials === undefined) {
				$('#'+id+' .usernameLink').hide();
				$('#'+id+' .loginLink').show();
			} else if (credentials.userId !== undefined) {
				$('#'+id+' .usernameLink').html(credentials.userId);
				$('#'+id+' .loginLink').hide();
				$('#'+id+' .usernameLink').show();
			}
		});
	});
	

	$.notification().notify('updateTemplate', 'header', id, { });
});

