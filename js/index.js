$(document).ready(function() {

var streamers = ["ESL_SC2", "freecodecamp", "xPeke", "Doublelift", "boxbox", "IWillDominate", "Gosu"];

$.each(streamers, function(i, val, und) {
	var url = "https://wind-bow.gomix.me/twitch-api/streams/" + val + "?callback=?";

	var get = $.getJSON(url, function(data){
		if(data.stream !== null) {
			// if the data is not null (streaming online) , call the online function, that will display data (all the online channels)
			online(data);
		} else if (data.stream === null){
			// if the data is null (streaming offline), call the offline function, that will display data  (all the offline channels)
			getUserData(val);
		} 
		//console.log(data);
	});
});  // end $.each





// if the streamers are online i'll get the data and display it
function online(data) {
	 // getting data from the API
	var name = data.stream.channel.display_name;
	var game = data.stream.channel.game;
	var logo = data.stream.channel.logo;
	var status = data.stream.channel.status;
	var url = data.stream.channel.url;
	var description = data.stream.channel.status;

	 
	var displayData = '<div class="row ' + 
          status + '"><div class="col-xs-2 col-md-1"><img src="' + 
          logo + '" class="img-responsive"></div><div class="col-xs-3 col-md-3" id="name"><a href="' + 
          url + '" target="_blank">' + 
          name + '</a></div><div class="col-xs-7 col-md-8">'+ 
          description + '</div></div>';

         $('.display').append(displayData);

}

// if it's offline, i have to call the api from a different url ("https://wind-bow.gomix.me/twitch-api/channels/") instead of ("https://wind-bow.gomix.me/twitch-api/streams/")
function getUserData(val) {
	var channelUrl = "https://wind-bow.gomix.me/twitch-api/channels/" + val + "?callback=?";
	$.getJSON(channelUrl, function(data) {
		offline(data);
	});

}


// if streamers are offline i'll get the data and display it
function offline(data) {

	// if the streamer does not exsist, display his name. I'll comment out this section because i don't like the idea of displaying a channel that does not exsist, 
	// it ruins the project in my opinion, if you would like to see if it works, just remove the comments and add "comster404" to the array of streamers


	// START COMMENT OUT SECTION

	// if(data.status === 404){
	// 	var messages = data.message;
	// 	var displayNotExsistingData = '<div class="col-xs-3 col-md-8" id="pm">' + messages + '</div>';
	// 	$('.offline-display').append(messages);
	// } else {




	// getting data from the API
	var status = data.status;
	var name = data.display_name;
	var logo = data.logo;
	var url = data.url;
	var game = "Offline";
	var description = data.description;
	var message = "This channel does not exsist";
	// displaying data
	var displayOfflineData = '<div class="row ' + 
          status + '"><div class="col-xs-2 col-md-1"><img src="' + 
          logo + '" class="img-responsive"></div><div class="col-xs-7 col-md-3" id="name"><a href="' + 
          url + '" target="_blank">' + 
          name + '</a></div><div class="col-xs-3 col-md-8">'+ 
          game + '</div></div>';
     	$('.offline-display').append(displayOfflineData);
	//console.log(data);



// }  END COMMENT OUT SECTION


}



});