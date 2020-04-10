var rootURL = "http://localhost:8080/library/rest";



$(function() {

	renderLoginContent();

});

function renderLoginContent() {
	console.log('Display login content');
	$.get('login.html', function(response) {
		$('#main-container').html(response);
		initLoginForm();
	});
}

function initLoginForm() {
	$("#invalid-login").removeClass('show');
	$("#btn-logout").hide();
	// submits the form data to login the user
	$('#loginForm').submit(function(event) {
		event.preventDefault();
		authenticateUser();
	});
}

function initLogout() {
	$("#btn-logout").show();

	$('#btn-logout').click(function() {
		console.log('btn-logout');
		var authToken = sessionStorage.getItem("auth-token");
		$.ajax({
			type : 'GET',
			url : 'rest/logout/' + authToken,
			success : renderLoginContent
		});

	});
}

function authenticateUser() {
	console.log("Authenticating the user.");
	var formData = JSON.stringify({
		"username" : $('#username').val(),
		"password" : $('#pwd').val()
	});
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : "rest/login",
		dataType : "json",
		data : formData,
		success : function(authInfo, textStatus, jqXHR) {
			sessionStorage.setItem("auth-token", authInfo.token);
			sessionStorage.setItem("auth-id", authInfo.userId);
			console.log("User successfully authenticated, "
					+ sessionStorage.getItem("auth-token"));
			// render the subpage for the specific user category
			console.log("Category: " + authInfo.category);
			if (authInfo.category == 'MANAGER') {
				renderManagementContent();
			} else if (authInfo.category == 'STAFF') {
				renderEmployeeContent();
			} else if (authInfo.category == 'CUSTOMER') {
				renderCustomerContent();
			}

			initLogout();
		},
		error : function(jqXHR, textStatus, errorThrown) {
			console.log("Unsuccessful user authentication.");
			$("#invalid-login").addClass('show');
		}
	});
}

function renderManagementContent() {
	console.log('Display management content');
	$.get('management.html', function(response) {
		$('#main-container').html(response);

		initManagement();
	});
}

function renderEmployeeContent() {
	console.log('Display employee content');
	$.get('employee.html', function(response) {
		$('#main-container').html(response);

		initEmployee();
	});
}

function renderCustomerContent() {
	console.log('Display customer content');
	$.get('customer.html', function(response) {
		$('#main-container').html(response);
		initCustomerPage();

		findCustomerClasses();
		findTimetable();
	});
}

function initCustomerPage() {

	$('#question-form').submit(function() {
		event.preventDefault();
		console.log('question sent');
	});



	var fee; //Paul Barry

	$('#class-reg-modal').on('show.bs.modal', function (event) {

		console.log('show.bs.modal');
		var actionLink = $(event.relatedTarget);
		var classId = actionLink.data('identity');

		fee = actionLink.data('fee'); //Paul Barry
		console.log('fee is: '+ fee); //Paul Barry

		if (classId != undefined) {
			var modal = $(this);
			modal.find('#class-id').val(classId);
		}
	});

	$('#class-reg-modal').on('hide.bs.modal', function(event) {
		console.log('hide.bs.modal');
		$('#weekly').prop('checked', false);
		$('#whole').prop('checked', false);
	});

	$('#btn-register').click(function() {
		var paymentType;

		var custId; //Paul Barry - Customer ID required


		if ($('#weekly').is(":checked")) {
			paymentType = 'weekly';
		} else if ($('#whole').is(":checked")) {
			paymentType = 'whole';
		}


		if($('#weekly').is(":checked") || $('#whole').is(":checked")) {
	    	var classId = $('#class-id').val();


	    	var userId = sessionStorage.getItem("auth-id");
	    	custId = userId; //Paul Barry - added for convenience to get Cust ID
	    	console.log('classId: ' + classId);

	    	console.log('Fee is: '+fee); //Paul Barry

	    	var formData = JSON.stringify({
    	        "classId": classId,
    	        "memberId": userId
    	    });



	    	$.ajax({
	    		type: 'POST',
	    		contentType: 'application/json',
	    		url: rootURL + '/registration/' + paymentType,
	    		data: formData,
	    		success: function(){
	    			findCustomerClasses();
	    			$('#class-reg-modal').modal("hide");
	    		}
	    	});

	    	//Paul Barry Transaction call
	    	console.log('Inside Paul Barrys Class registration code');
	    	classRegistration(custId, fee, paymentType);



		}

	});





	$('#btn-unregister').click(function() {
		console.log('btn-unregister');
		var regId = $('#reg-id').val();
		$.ajax({
			type : 'DELETE',
			url : rootURL + '/registration/' + regId,
			success : function() {
				findCustomerClasses();
				$('#class-unreg-modal').modal("hide");
			}
		});
	});

	$('#class-unreg-modal').on('show.bs.modal', function(event) {
		console.log('show.bs.modal');
		var actionLink = $(event.relatedTarget);
		var regId = actionLink.data('identity');
		if (regId != undefined) {
			var modal = $(this);
			modal.find('#reg-id').val(regId);
		}
	});

	$('#sendBtn').click(function() {
		var formData = JSON.stringify({
			"name" : $('#name').val(),
			"emailAddress" : $('#email').val(),
			"message" : $('#comment').val()
		});
		$.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : rootURL + '/sendEmail',
			data : formData,
			success : function() {
				$('#send-alert').modal('show');
				clearContactForm();
			}
		});
	});
}

function clearContactForm() {
	$('#name').val('');
	$('#email').val('');
	$('#comment').val('');
}

function findCustomerClasses() {
	console.log('findCustomerClasses');
	var authId = sessionStorage.getItem("auth-id");
	console.log("auth: " + authId);
	$.ajax({
		type : 'GET',
		url : rootURL + '/classes/query?user=' + authId + '&class=0',
		dataType : "json",
		success : function(data) {
			findClassDetails(data); //added now
			renderCustomerClasses(data);
		}
	});
}

function findClassDetails(data){
	console.log('findClassDetails');
	$('#details div').remove();
	var lastRow;
	$.each(data, function(index, c) {
		console.log('index = ' + index + ', modulus = '
				+ (index % 4));
		if (index % 4 == 0) {
			lastRow = 'row' + index;
			$('#details').append(
					'<div id=' + lastRow + ' class="row mb-4">');
		}
		$('#' + lastRow).append(
			'<div class="col-sm-6 col-md-3 col-lg3">'
					+ '<div class="card card-content">'
					+ '<div class="card-img"><img class="card-img-top" src="images/'
					+ (c.picture != null ? c.picture : 'image-coming-soon.jpg')
					+ '" style="width:100%"></div>'
					+ '<div class="card-body">'
					+ '<span class="card-title">' + c.class_title + '</span>'
					+ '</div>'
			);
		});
}

function renderCustomerClasses(data) {
	if ($.fn.dataTable.isDataTable('#classes_table')) {
		var table = $('#classes_table').DataTable();
		table.clear();
		table.destroy();
	}

	$.each(data, function(index, c){
		$('#classes_table_body').append('<tr><td>' + c.class_title + '</td><td>'
			+ c.class_category + '</td><td>'
			+ c.class_slot + '</td><td id="fee">' //Paul Barry - Need ID to get fee value
			+ c.class_fee + '</td><td>'
			+ c.class_start + '</td><td>'
			+ c.class_duration + '</td><td>'
			+ (c.registrationId > 0
				? '<a href="#" data-identity="' + c.registrationId + '" data-toggle="modal" data-target="#class-unreg-modal">Unregister</a>'
				: '<a href="#" data-identity="' + c.class_id +'" data-fee="'+ c.class_fee +'" data-toggle="modal" data-target="#class-reg-modal">Register</a>')
			+ '</td></tr>'
		);

	});

	$('#classes_table').DataTable({
		ordering : false
	});
}

function findTimetable() {
	console.log('findTimetable');
	$.ajax({
		type : 'GET',
		url : rootURL + '/timetable',
		dataType : "json",
		success : renderTimetable
	});
}

function renderTimetable(data) {
	if ($.fn.dataTable.isDataTable('#timetable_table')) {
		var table = $('#timetable_table').DataTable();
		table.clear();
		table.destroy();
	}
	var output = '';
	for ( var classTitle in data) {
		output += '<tr><td>' + classTitle + '</td>';
		$.each(data[classTitle], function(index, classTime) {
			output += '<td>' + (classTime != null ? classTime : '') + '</td>'
		});
		output += '</tr>'
	}
	$('#timetable_table_body').append(output);
	$('#timetable_table').DataTable();
}
