$.notification().listen('initialize', 'addFile', '*', function(notification){
	var id = notification.getId();
	var meetingId = $.url.parameters('id');
	
	$.notification().listen('click', 'button', id+'-button', function() {
		$('#'+id+' p').html('');
		$.notification().notify('getValue', 'field', id+'-name', {callback:function(fileName){
			$.notification().notify('upload', 'file', id, {callback:function(fileUrl) {
				$.server({userId:$.appConfig.defaultUsername}).create('table', {id:'meeting', data:{meetingId:meetingId, url:fileUrl, name:fileName}}, function(){
					$.notification().notify('change-value', 'field', id+'-name', {value:''});
					$('#'+id+' p').html('Your file has been uploaded successfully');
				});
			}});
		}});
	});
	
});