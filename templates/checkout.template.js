$.notification().listen('initialize', 'checkout', '*', function(initNotification) {
	var id = initNotification.getId();
	
	$.notification().listen('click', 'button', id+'-submit', function(notification){
		
		var formState = {validity:true};
		$('#'+id+' input', '#'+id+' select').each(function(){
			var fieldId = $(this).attr('id');
			$.notification().notify('validate', 'field', fieldId, {formState:formState});
		});
		
		if (formState.validity === true) {
			var rawData = $.utilities.getFormData(id);
			var data = { };
			
			$.each(rawData, function(key, field) {
				if (field.value !== '') {
					data[key] = field.value;
				}
			});
			
			$.notification().notify('placeOrder', 'controller', 'book', {data:data});
		}
		
		
	});
});