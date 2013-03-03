// Initialize API key, session, and token...
// Think of a session as a room, and a token as the key to get in to the room
// Sessions and tokens are generated on your server and passed down to the client
var apiKey = "23135122";
var sessionId = "2_MX4yMzEzNTEyMn4xMjcuMC4wLjF-U3VuIE1hciAwMyAwOToxMDo0NyBQU1QgMjAxM34wLjk5MTg4OTgzfg";
var token = "T1==cGFydG5lcl9pZD0yMzEzNTEyMiZzZGtfdmVyc2lvbj10YnJ1YnktdGJyYi12MC45MS4yMDExLTAyLTE3JnNpZz04MTAwODk1ZTVhMGMyYWU1NmRmZTc0MzhiOWFlMTVmNTI1ODk0Y2VhOnJvbGU9cHVibGlzaGVyJnNlc3Npb25faWQ9Ml9NWDR5TXpFek5URXlNbjR4TWpjdU1DNHdMakYtVTNWdUlFMWhjaUF3TXlBd09Ub3hNRG8wTnlCUVUxUWdNakF4TTM0d0xqazVNVGc0T1RnemZnJmNyZWF0ZV90aW1lPTEzNjIzMzA2ODMmbm9uY2U9MC4zMDM0MTU1OTE3MTY1ODI2JmV4cGlyZV90aW1lPTEzNjQ5MjI2ODMmY29ubmVjdGlvbl9kYXRhPQ==";

var publisher = TB.initPublisher(apiKey, 'myPublisherDiv', {width:640, height:480});

// Initialize session, set up event listeners, and connect
var session = TB.initSession(sessionId);
session.addEventListener('sessionConnected', sessionConnectedHandler);
session.addEventListener("streamCreated", streamCreatedHandler);
session.connect(apiKey, token);

function sessionConnectedHandler (event) {
	subscribeToStreams(event.streams);
	session.publish(publisher);
}

function subscribeToStreams(streams) {
	for (i = 0; i < streams.length; i++) {
		var stream = streams[i];
		if (stream.connection.connectionId != session.connection.connectionId) {
			//var streamId = "steam" + i;
			//$("body").append("<div id=\"" + steamId + "\"></div>");
			session.subscribe(stream);
		}
	}
}

function streamCreatedHandler(event) {
	subscribeToStreams(event.streams);
}

