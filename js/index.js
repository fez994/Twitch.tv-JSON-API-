$(document).ready(function() {

var streamers = ["ESL_SC2", "freecodecamp", "xPeke", "rivalxfactor"];

$.each(streamers, function(i, val) {
	var url = "https://wind-bow.gomix.me/twitch-api/streams/" + val + "?callback=?";

	$.getJSON(url, function(data){
		if(data.stream !== null) {
			// if the data is not null (streaming online) , call the online function, that will display data (all the online channels)
			online(data);
		} else if (data.stream === null ){
			// if the data is null (streaming offline), call the offline function, that will display data  (all the offline channels)
			offline(data);
		}
		console.log(data);

	}); // end getJSON
});  // end $.each



function online(data) {
	// getting data from the API
	var name = data.stream.channel.display_name;
	var game = data.stream.channel.game;
	var logo = data.stream.channel.logo;
	var status = data.stream.channel.status;
	var url = data.stream.channel.url;
	var description = data.stream.channel.status;

	// displaying data on the website
	$('#img-online').html('<img src=\"' + logo + '\" class=\"stream-logo\">');
	$('#content').html('<a href=\"' + url + '\" target=\"_blank\" class=\"link\">\"'+ name +'\"</a>');
	$('#content').append('<p class=\"title\">\"' + status + '\" </p>');
	$('#content').append('<p class=\"game\"> Game : \"' + game + '\" </p>');
}




function offline(data) {
	$('.offline').html('The stream is offline');
}



});