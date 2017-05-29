$(document).ready(function(){
	var rawURL = window.location.href,
        baseURL = rawURL.split("validate?subject="),
		playlist = [];
	$.post("/sfetch",{'uID': baseURL[1]}, function(data) {
		for ( var i=0; i<data.length; i++) {
			var format = data[i].format,
			source = data[i].source;
			data[i][format] = "https://s3-us-west-2.amazonaws.com/bmishuffle/"+source;
			delete data[i]["format"];
			delete data[i]["source"];
			playlist.push(data[i]);
		}
		var myPlaylist = new jPlayerPlaylist({
			jPlayer: "#jquery_jplayer_1",
			cssSelectorAncestor: "#jp_container_1"
		}, playlist, {
			swfPath: "/",
			supplied: "mp3,wav",
			wmode: "window",
			useStateClassSkin: true,
			autoBlur: false,
			smoothPlayBar: true,
			keyEnabled: true,
			ended: function(e){
				var subject = window.location.href.split("validate?subject="),
				uID = subject[1],
				sID = e.jPlayer.status.media.id,
				dateObj = new Date(),
				month = dateObj.getUTCMonth()+1,
				day = dateObj.getUTCDate(),
				year = dateObj.getUTCFullYear(),
				hour = dateObj.getHours(),
				min = dateObj.getMinutes(),
				date = year+"-"+month+"-"+day,
				time = hour+":"+min,
				root = window.location.host;
				counter++;
				if (counter >= random) {
					setQuestion(uID,sID);
				}
				$.post("/sevent",{'uID': uID,'sID': sID, 'date': date, 'time': time}, function(data) {
					// console.log(data);
				});
			}
		});
		myPlaylist.shuffle();
	});
});
