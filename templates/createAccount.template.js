$.notification().listen('initialize', 'createAccount', '*', function(notification) {
	var id = notification.getId();
	
	$.notification().listen('click', 'button', id+'-submit', function() {
		disableFields();
		
		var rawData = $.utilities.getFormData(id);
		var data = { };
		
		$.each(rawData, function(key, field){
			data[key] = field.value;
		});
		
		
		
		$.server({userId:$.appConfig.defaultUsername}).read("user", {"username":data.email, "customer":$.appConfig.defaultCustomer}, function(result) {
	        //User exists
			$.notification().notify('update', 'alert', id+'-alert', {text:'A user with this e-mail address already exists', hidden:false});
			enableFields();
	    }, function() {
	        $.server({userId:$.appConfig.defaultUsername}).update("user", {"username":data.email, "customer":$.appConfig.defaultCustomer,"password":MD5(data.password), "name":data.firstName + ' ' + data.lastName}, function(createResult) {
	        	//User created
	        	$.utilities.redirect('account.html#newAccount');
	        	enableFields();
	        }, function(){
	        	$.notification().notify('update', 'alert', id+'-alert', {text:'A server error occured while creating your user, please try again', hidden:false});
	        });
	    });
	});
	
	function enableFields() {
		var fields = ['firstName', 'lastName', 'email', 'password'];
		$.each(fields, function(index, field){
			$.notification().notify('enable', 'field', id+'-'+field, { });
		});
		$.notification().notify('enable', 'button', id+'-submit', { });
	}
	
	function disableFields() {
		var fields = ['firstName', 'lastName', 'email', 'password'];
		$.each(fields, function(index, field){
			$.notification().notify('enable', 'field', id+'-'+field, { });
		});
		$.notification().notify('disable', 'button', id+'-submit', { });
	}
});