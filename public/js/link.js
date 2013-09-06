$(document).ready(function() {
	console.log(document.URL);
	var tokens = document.URL.split('/');
	var code = tokens[tokens.length-1].trim();
	console.log(code);
	$.ajax('/links/' + encodeURI(code) + '/urls').done(function(resp) {
		resp = JSON.parse(resp);
		console.log(resp);
		$.each(resp.urls, function() {
		
			var url = this.trim();
			var url_entry = $('<dt class="url-entry"/>').append(url);
			$('#links').append(url_entry).append('<br>');
			url_entry.click(function() {
				window.open("/url?url=" + encodeURI(url), "_blank", "toolbar=yes,location=yes,menubar=yes,resizable=yes,scrollbars=yes,status=yes,titlebar=yes");
			});
			url_entry.click();
			//window.open("/url?url=" + encodeURI(url), "_blank", "toolbar=yes,location=yes,menubar=yes,resizable=yes,scrollbars=yes,status=yes,titlebar=yes");
		});
	});
});