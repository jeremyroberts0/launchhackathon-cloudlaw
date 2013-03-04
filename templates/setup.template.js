$.notification().listen('initialize', 'setup', '*', function(notification) {
	var id = notification.getId();
	$('button#'+id+'-updateSchemas').click(function(){
		
		var newSchema = function(name, model) {
			$.server({"userId":$.appConfig.defaultUsername}).update("schema", {"id":name, "data":model}, function() {
				
			});
		};
		
		newSchema("address", {firstName:'string', latName:'string', address1:"string", address2:"string", city:"string", state:"state", zipcode:"zipcode"});
		newSchema("creditCard", {firstNameOnCard:"string", lastNameOnCard:"string", type:"cardType", number:"cardNumber", expiration:"expdate", ccv:"ccv"});
		newSchema("user", {firstName:"string", lastName:"string", email:"email", password:"newPassword"});
		
		newSchema("meeting", {time:"datetime", conferenceToken:"string", host:"string", customer:"string", chatToken:"string"});

		newSchema("document", {id:"id", meeting:"string", host:"string", customer:"string", chatToken:"string"});

	});
});