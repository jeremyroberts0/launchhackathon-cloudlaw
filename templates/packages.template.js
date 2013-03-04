$.notification().listen('initialize', 'packages', '*', function(notification) {
	var id = notification.getId();
	
	$('#'+id+' .documentsLink').click(function() {
		var hidden = $(this).data('hidden');
		var parent = $(this).parent().parent();
		
		if (hidden === undefined || hidden === true) {
			parent.children('.documentsList').slideDown();
			$(this).data('hidden', false);
		} else if (hidden === false) {
			parent.children('.documentsList').slideUp();
			$(this).data('hidden', true);
		}
	});
	
});

