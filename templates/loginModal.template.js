$.notification().listen('initialize', 'loginModal', '*', function(notification){
	var id = notification.getId();

	$.notification().listen('click', 'button', id+'-loginButton', function(loginButtonNotification) {
		var username;
		var password;

		disableFields();

		$.notification().notify('hide', 'alert', id+'-alert', { });

		$.notification().notify('getValue', 'field', id+'-username', {callback:function(value){
			username = value;
		}});
		$.notification().notify('getValue', 'field', id+'-password', {callback:function(value){
			password = MD5(value);
		}});

		if (username === undefined) {
			$.notification().notify('update', 'alert', id+'-alert', {text:'Please enter a username', hidden:false});
		} else if (password === undefined) {
			$.notification().notify('update', 'alert', id+'-alert', {text:'Please enter a username', hidden:false});
		} else {
			$.server().login($.appConfig.defaultCustomer, username, password, function(data) {
				$(id).modal('hide');
				$.notification().notify('updateTemplate', 'header', '*', {loggedIn:true, username:username});
			}, function(data) {
				enableFields();

				if (data.code === 1) {
					$.notification().notify('update', 'alert', id+'-alert', {text:'The password you entered is incorrect', hidden:false});
				} else if (data.code === 150) {
					$.notification().notify('update', 'alert', id+'-alert', {text:'No account exists with the email address you entered', hidden:false});
				} else {
					$.notification().notify('update', 'alert', id+'-alert', {text:'Server error!  Please try again.', hidden:false});
				}

			});
		}

		function enableFields() {
			$.notification().notify('enable', 'field', id+'-username', { });
			$.notification().notify('enable', 'field', id+'-password', { });
			$.notification().notify('enable', 'button', id+'-loginButton', { });
		}
		function disableFields() {
			$.notification().notify('disable', 'field', id+'-username', { });
			$.notification().notify('disable', 'field', id+'-password', { });
			$.notification().notify('disable', 'button', id+'-loginButton', { });
		}


	});
});