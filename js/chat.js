
var chatId = $.url.parameter("id");

if (chatId === undefined || chatId === null || chatId === "") {
	chatId = "123";
}

//var messagesRef = new Firebase('https://ewkkujtsrky.firebaseio-demo.com/');

var firebaseURL = 'https://my-chat.firebaseio.com/' + chatId;

var messagesRef = new Firebase(firebaseURL);

// Add a callback that is triggered for each chat message.
messagesRef.limit(10).on('child_added', function (snapshot) {
  var message = snapshot.val();
  $('<div/>').text(message.text).prepend($('<em/>')
    .text(message.name+' ').wrap("<span>")).appendTo($('#template-chat-message-history'));
  $('#template-chat-message-history')[0].scrollTop = $('#template-chat-message-history')[0].scrollHeight;
});

$.notification().listen("click", "button", "chat-submit", function(data) {
	var name = $('#template-chat-name').html();
    var text = $('#template-chat-message').val();
    messagesRef.push({name:name, text:text});
    $('#template-chat-message').val('');
});