function expand(shorturl) {
	$("#expandbutton").html("node is working...");
	$("#expandbutton").attr("disabled", "disabled");
	$("#shorturl").attr("disabled", "disabled");
	$.getJSON("http://landeiro.no.de/expand/?shorturl=" + shorturl + "&callback=?", function(data) {
		data = JSON.parse(data);
		var div = $("<div>");
		$(div).addClass('result');
		$(div).attr('id', 'result');
		if(data.longurl !== "error") {
			var link = $("<a>");
			$(link).attr("href", data.longurl);
			$(link).attr("target", "_blank");
			$(link).html(data.longurl);
		} else {
			var link = $("<p>");
			$(link).html("error: " + data.message);
		}
		$("#result_placement").html($(div).html($(link)).hide().fadeIn());
		$("#time").html("SUE took in " + data.milliseconds + " milliseconds").hide().fadeIn();
		$("#expandbutton").html("expand url");
		$("#expandbutton").removeAttr("disabled");
		$("#shorturl").removeAttr("disabled");
	});
}


$(document).ready(function() {
	$("#shorturl").keypress(function(event) {
		if(event.which == 13) {
			event.preventDefault();
			expand($("#shorturl").val());
		}
	});
});
