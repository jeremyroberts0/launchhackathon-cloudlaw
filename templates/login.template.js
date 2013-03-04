
$.notification().listen('initialize', 'login', '*', function(notification) {
	var id = notification.getId();
	
	$.notification().listen('click', 'button', 'loginpage-loginButton', function(loginButtonNotification) {
		var username;
		var password;
		
		disableFields();
		
		$.notification().notify('hide', 'alert', 'loginpage'+'-alert', { });
		
		$.notification().notify('getValue', 'field', 'loginpage'+'-username', {callback:function(value){
			username = value;
		}});
		$.notification().notify('getValue', 'field', 'loginpage'+'-password', {callback:function(value){
			password = MD5(value);
		}});
		
		if (username === undefined) {
			$.notification().notify('update', 'alert', 'loginpage'+'-alert', {text:'Please enter a username', hidden:false});
		} else if (password === undefined) {
			$.notification().notify('update', 'alert', 'loginpage'+'-alert', {text:'Please enter a username', hidden:false});
		} else {
			$.server().login($.appConfig.defaultCustomer, username, password, function(data) {
				//$(id).modal('hide'); // TODO redirect to URL param here
				var referrer = $.url.getParameter("ref");
				if (referrer === undefined || referrer === null || referrer === "") {
					referrer = "index.html";
				}
				$.utilities.redirect(referrer);
				$.notification().notify('updateTemplate', 'header', '*', {loggedIn:true, username:username});
			}, function(data) {
				enableFields();
				
				if (data.code === 1) {
					$.notification().notify('update', 'alert', 'loginpage'+'-alert', {text:'The password you entered is incorrect', hidden:false});
				} else if (data.code === 150) {
					$.notification().notify('update', 'alert', 'loginpage'+'-alert', {text:'No account exists with the email address you entered', hidden:false});
				} else {
					$.notification().notify('update', 'alert', 'loginpage'+'-alert', {text:'Server error!  Please try again.', hidden:false});
				}
				
			});
		}
		
		function enableFields() {
			$.notification().notify('enable', 'field', 'loginpage'+'-username', { });
			$.notification().notify('enable', 'field', 'loginpage'+'-password', { });
			$.notification().notify('enable', 'button', 'loginpage'+'-loginButton', { });
		}
		
		function disableFields() {
			$.notification().notify('disable', 'field', 'loginpage'+'-username', { });
			$.notification().notify('disable', 'field', 'loginpage'+'-password', { });
			$.notification().notify('disable', 'button', 'loginpage'+'-loginButton', { });
		}
	
	
	});
});