
$.notification().listen('initialize', 'login', '*', function(notification) {
	var id = notification.getId();
	
	function redirect() {
		var referrer = $.url.parameter("ref");
		if (referrer === undefined || referrer === null || referrer === "") {
			referrer = "account.html";
		} else {
			referrer = decodeURIComponent(referrer);
		}
		$.utilities.redirect(referrer);
	}
	
	getPrimaryUser(function(credentials) {
		if (credentials !== undefined) {
			redirect();
		}
	});
	
	$.notification().listen('click', 'button', id + '-loginButton', function(loginButtonNotification) {
		var username;
		var password;
		
		disableFields();
		
		$.notification().notify('hide', 'alert', id + '-alert', { });
		
		$.notification().notify('getValue', 'field', id + '-username', {callback:function(value){
			username = value;
		}});
		$.notification().notify('getValue', 'field', id + '-password', {callback:function(value){
			password = MD5(value);
		}});
		
		if (username === undefined) {
			$.notification().notify('update', 'alert', id + '-alert', {text:'Please enter a username', hidden:false});
		} else if (password === undefined) {
			$.notification().notify('update', 'alert', id + '-alert', {text:'Please enter a username', hidden:false});
		} else {
			$.server().login($.appConfig.defaultCustomer, username, password, function(data) {
				//$(id).modal('hide'); // TODO redirect to URL param here
				redirect()
			}, function(data) {
				enableFields();
				
				if (data.code === 1) {
					$.notification().notify('showGlobalNotification', 'header', '*', {type:'error', text:'The password you entered is incorrect'});
				} else if (data.code === 150) {
					$.notification().notify('showGlobalNotification', 'header', '*', {type:'error', text:'No account exists with the email address you entered'});
				} else {
					$.notification().notify('showGlobalNotification', 'header', '*', {type:'error', text:'Server error!  Please try again.'});
				}
				
			});
		}
		
		function enableFields() {
			$.notification().notify('enable', 'field', id + '-username', { });
			$.notification().notify('enable', 'field', id + '-password', { });
			$.notification().notify('enable', 'button', id + '-loginButton', { });
		}
		
		function disableFields() {
			$.notification().notify('disable', 'field', id + '-username', { });
			$.notification().notify('disable', 'field', id + '-password', { });
			$.notification().notify('disable', 'button', id + '-loginButton', { });
		}
		
		
	
	
	});
});