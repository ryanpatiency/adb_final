/*
	Phantom by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/



(function ($) {



	function query_send_btn_clicked() {
		dataJson = {}
		dataJson['roomNumber'] = $('#rooms-number').val();
		dataJson['hallNumber'] = $('#halls-number').val();
		dataJson['berthNumber'] = $('#berth-number').val();
		dataJson['priceMin'] = $('#price-region-min').val();
		dataJson['priceMax'] = $('#price-region-max').val();
		dataJson['useCentralPoint'] = $('#use-central-point').prop('checked') ? 1 : 0;
		dataJson['distance'] = $('#distance').val();
		dataJson['lat'] = +$('#center-point').attr('data-lat');
		dataJson['lng'] = +$('#center-point').attr('data-lng');


		$.ajax({
			url: "/query-data",
			data: JSON.stringify(dataJson),
			type: "POST",
			dataType: "json",
			success: function (returnData) {
				console.log(returnData);
			},
			error: function (xhr, ajaxOptions, thrownError) {
				console.log(xhr.status);
				console.log(thrownError);
			}
		});
	}

	function login_btn_clicked() {
		dataJson = {}
		dataJson['account'] = $('#account').val();


		$.ajax({
			url: "/login-info",
			data: JSON.stringify(dataJson),
			type: "POST",
			dataType: "json",
			success: function (returnData) {
				console.log(returnData);
			},
			error: function (xhr, ajaxOptions, thrownError) {
				console.log(xhr.status);
				console.log(thrownError);
			}
		});
	}

	$('#query-btn').on('click', function () {
		$.ajax({
			url: "/get-query-html",
			type: "get",
			success: function (response) {
				$("#content").html(response);
				$('#use-central-point').on('click', function () {
					$('#central-point-div').toggle();
				});
				$('#query-send-btn').click(query_send_btn_clicked)
				// window.setInterval()
			},
			error: function (xhr) {
				//Do Something to handle error
			}
		});
	});

	$('#rec-btn').on('click', function () {
		$.ajax({
			url: "/login",
			type: "get",
			success: function (response) {
				$("#content").html(response);
				$('#login-btn').click(login_btn_clicked)
				// window.setInterval()
			},
			error: function (xhr) {
				//Do Something to handle error
			}
		});
	});

	// get_section_interval = window.setInterval(get_section, 500);

})(jQuery);