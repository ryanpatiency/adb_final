/*
	Phantom by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});
		var get_section_interval;
		
		function get_section() {
			$.ajax({
				url: "/get-section",
				type: "get",
				success: function (response) {
					$("#main div.inner").html(response);
					window.setInterval()
				},
				error: function (xhr) {
					//Do Something to handle error
				}
			});
		}
		get_section_interval = window.setInterval(get_section, 500);
		
})(jQuery);