

View = {
	init_render : function() {
		var error_box = $('#custom-link-error');
		var custom_link_box = $('#custom-link-maker');
		error_box.css({
			position: 'absolute',
			top : custom_link_box.position().top + custom_link_box.height()+5,
			left: custom_link_box.position().left
		});
	},
	init : function() {
		View.init_render();
		var verify_links = function(callback) {
			$('#all-link-inputs .link-input').each(function() {
				var input_box = $(this).find('input');
				var url = input_box.val();
				var error_box =  $(this).find('.input-error');
				error_box.empty();
				input_box.removeClass('error-link');
				$.ajax('/verify/link_input?link=' + encodeURI(url.trim())).done(function(resp) {
					resp = JSON.parse(resp);
					if (!resp.valid) {
						error_box.append(resp.message);
						input_box.addClass('error-link');
					}
					callback(!resp.valid);
				});				
			});
		};
		var verify_custom_link = function(callback) {	
			var position_error_box = function() {
				var error_box = $('#custom-link-error');
				var custom_link_box = $('#custom-link-maker');
				error_box.css({
					position: 'absolute',
					top : custom_link_box.position().top + custom_link_box.height()+5,
					left: custom_link_box.position().left
				});
			}
			var tag = $('#custom-link-entry').val().trim();
			$('#custom-link-entry').removeClass('error-custom-link');
			var error_box = $('#custom-link-error');
			error_box.empty();
			$.ajax('/verify/tag?tag=' + encodeURI(tag)).done(function(resp) {
				resp = JSON.parse(resp);
				
				if (!resp.valid) {
					position_error_box();
					error_box.append(resp.message);
					$('#custom-link-entry').addClass('error-custom-link');
				}
				callback(resp.valid);
			});
		}
		
		View.defaultize();	
		$('#custom-link-domain').empty().append(window.location.origin + "/code/");
		
		$('#customize-link').click(function() {
		
			View.defaultize();
			$('#customize-link').hide();
			$('#custom-link-entry').val('');
			$('#custom-link-maker').hide().slideDown();
			
			
			
			
			
		});
		
		$('#confirm-custom-link').click(function() {
			var button = $(this);
			var verify_custom_link_done = function(valid) {
				
				if (!valid) { 
					button.removeClass('disabled').text('Generate Custom Link');
					return;
				}
				
				
				var num_inputs = $('#all-link-inputs').find('.link-input').length;
				var num_errors = 0;
				var verify_done = function(has_error) {
					if (has_error) num_errors++;
					if (--num_inputs > 0) return;
					button.removeClass('disabled').text('Generate Custom Link');
					if (num_errors) return;
					//if the links are all valid
					button.addClass('disabled').text('Linking...');
					var urls = [];
					$('#all-link-inputs .link-input input').each(function() {
						urls.push(encodeURIComponent($(this).val().trim()));
					});
					$.ajax('/links/code?urls=' + JSON.stringify(urls) + '&code=' + encodeURI($('#custom-link-entry').val().trim())).done(function(resp) {
						resp = JSON.parse(resp);
						console.log(resp);
						var code = resp;
							

						$('#coded-link').append(window.location.origin + "/code/" + code);
						button.removeClass('disabled').text('Generate Custom Link');
						$('#custom-link-maker').hide();
						$('#customize-link').removeClass('disabled').text('Customize my Link').show();
					});
				}
				button.text('Verifying Links...');
				verify_links(verify_done);
			}
			button.addClass('disabled').text('Verifying Tag...');
			verify_custom_link(verify_custom_link_done);
			
		});
		
		
		$('#add-link').click(function() {
			var link_input = $('<div class="link-input"/>').append('<br>').append('<input class="form-control" id="" placeholder="Enter a url to be shortened">').append('<div class="cool-font input-error"></div>');
			$('#all-link-inputs').append(link_input);
			link_input.hide();
			link_input.slideDown('slow');
			console.log($('#all-link-inputs')[0]);
		});
		
		$('#remove-link').click(function() {
			if ($('#all-link-inputs').find('.link-input').length == 1) return;
			var link_input = $('#all-link-inputs .link-input:last-child');
			link_input.slideUp('slow', function() {$(this).remove() });
		});
		
		$('#create-link').click(function() {
			View.defaultize();
			$('#create-link').addClass('disabled').text('Verifying Links...');
			
			var num_inputs = $('#all-link-inputs').find('.link-input').length;
			var num_errors = 0;
			var verify_done = function(has_error) {
				if (has_error) num_errors++;
				if (--num_inputs > 0) return;
				$('#create-link').removeClass('disabled').text('Make me a Link');
				if (num_errors) return;
				//if the links are all valid
				$('#create-link').addClass('disabled').text('Linking...');
				var urls = [];
				$('#all-link-inputs .link-input input').each(function() {
					urls.push(encodeURIComponent($(this).val().trim()));
				});
				$.ajax('/links/code?urls=' + JSON.stringify(urls)).done(function(resp) {
					resp = JSON.parse(resp);
					console.log(resp);
					var code = resp;
						

					$('#coded-link').append(window.location.origin + "/code/" + code);
					$('#create-link').removeClass('disabled').text('Make me a Link');
				});
			}
			
			//first verify the input links
			verify_links(verify_done);
		});
	},
	
	defaultize : function() {
		$('#coded-link').empty();
		$('#custom-link-maker').hide();
		$('#custom-link-error').empty();
		$('#customize-link').removeClass('disabled').text('Customize my Link').show();
		$('#create-link').removeClass('disabled').text('Make me a Link');
	}
}


$(document).ready(function() {
	$('#encode-urls-btn').click(function() {
		var urls = []
		var urls_temp = $('#urls-area').val().trim().split(",");
		console.log(urls_temp);
		for (var i in urls_temp) {
			var url = urls_temp[i]
			url = url.trim();
			if (url.length) urls.push(url);
		}
		console.log(urls);
		$.ajax('/links/code?urls=' + encodeURI(JSON.stringify(urls))).done(function(resp) {
			resp = JSON.parse(resp);
			console.log(resp);
			$('body').append("<br>" + resp + "<br>");
		});
	});
	
	View.init();
	
	
	
})