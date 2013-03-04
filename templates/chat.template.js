
var chatId 

//var messagesRef = new Firebase('https://ewkkujtsrky.firebaseio-demo.com/');
var messagesRef = new Firebase('https://my-chat.firebaseio.com/123422');

// Add a callback that is triggered for each chat message.
messagesRef.limit(10).on('child_added', function (snapshot) {
  var message = snapshot.val();
  $('<div/>').text(message.text).prepend($('<em/>')
    .text(message.name+'>> ')).appendTo($('#template-chat-message-history'));
  $('#template-chat-message-history')[0].scrollTop = $('#template-chat-message-history')[0].scrollHeight;
});

$.notification().listen("click", "button", "chat-submit", function(data) {
	alert("hi");
	var name = $('#template-chat-name').html();
    var text = $('#template-chat-message').val();
    messagesRef.push({name:name, text:text});
    $('#template-chat-message').val('');
});

// VC's name : SANDY from ludlow ventures