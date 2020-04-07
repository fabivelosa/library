var rootURL = "http://localhost:8080/library/rest";

$(function() {

	renderLoginContent();

});

function renderLoginContent() {
    console.log('Display login content');
    $.get('login.html', function(response){
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

	$('#btn-logout').click(function(){
		console.log('btn-logout');
		var authToken = sessionStorage.getItem("auth-token");
		$.ajax({
			type: 'GET',
			url: 'rest/logout/' + authToken,
			success: renderLoginContent
		});

	});
}

function authenticateUser() {
    console.log("Authenticating the user.");
    var formData = JSON.stringify({
        "username": $('#username').val(),
        "password": $('#pwd').val()
    });
    $.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: "rest/login",
		dataType: "json",
		data: formData,
		success: function(authInfo, textStatus, jqXHR){
            sessionStorage.setItem("auth-token", authInfo.token);
            sessionStorage.setItem("auth-id", authInfo.userId);
		    console.log("User successfully authenticated, " + sessionStorage.getItem("auth-token"));
            // render the subpage for the specific user category
		    console.log("Category: " + authInfo.category);
            if(authInfo.category == 'MANAGER') {
                renderManagementContent();
            } else if(authInfo.category == 'STAFF') {
                renderEmployeeContent();
            } else if(authInfo.category == 'CUSTOMER') {
                renderCustomerContent();
            }

            initLogout();
		},
		error: function(jqXHR, textStatus, errorThrown){
		    console.log("Unsuccessful user authentication.");
		    $("#invalid-login").addClass('show');
		}
	});
}

function renderManagementContent() {
    console.log('Display management content');
    $.get('management.html', function(response){
        $('#main-container').html(response);
    });
}

function renderEmployeeContent() {
    console.log('Display employee content');
    $.get('employee.html', function(response){
        $('#main-container').html(response);

    	initEmployee();
    });
}

function renderCustomerContent() {
    console.log('Display customer content');
    $.get('customer.html', function(response){
        $('#main-container').html(response);
        initCustomerPage();

        findCustomerClasses();
        findTimetable();
    });
}

function initCustomerPage() {
	$('#class-reg-modal').on('show.bs.modal', function (event) {
		console.log('show.bs.modal');
		var actionLink = $(event.relatedTarget);
		var classId = actionLink.data('identity');
		if (classId != undefined) {
			var modal = $(this);
			modal.find('#class-id').val(classId);
		}
	});

	$('#class-reg-modal').on('hide.bs.modal', function (event) {
		console.log('hide.bs.modal');
		$('#weekly').prop('checked', false);
		$('#whole').prop('checked', false);
	});

	$('#btn-register').click(function() {
		var paymentType;

		if($('#weekly').is(":checked")) {
			paymentType = 'weekly';
		} else if($('#whole').is(":checked")) {
			paymentType = 'whole';
		}

		if($('#weekly').is(":checked") || $('#whole').is(":checked")) {
	    	var classId = $('#class-id').val();
	    	var userId = sessionStorage.getItem("auth-id");
	    	console.log('classId: ' + classId);

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
		}
	 });

	$('#btn-unregister').click(function() {
		console.log('btn-unregister');
		var regId = $('#reg-id').val();
		$.ajax({
    		type: 'DELETE',
    		url: rootURL + '/registration/' + regId,
    		success: function(){
    			findCustomerClasses();
    			$('#class-unreg-modal').modal("hide");
    		}
    	});
	});

	$('#class-unreg-modal').on('show.bs.modal', function (event) {
		console.log('show.bs.modal');
		var actionLink = $(event.relatedTarget);
		var regId = actionLink.data('identity');
		if (regId != undefined) {
			var modal = $(this);
			modal.find('#reg-id').val(regId);
		}
	});
}

function findCustomerClasses(){
	console.log('findCustomerClasses');
	var authId = sessionStorage.getItem("auth-id");
	console.log("auth: " + authId);
	$.ajax({
		type: 'GET',
		url: rootURL + '/classes/query?user=' + authId + '&class=0' ,
		dataType: "json",
		success: renderCustomerClasses
	});
}


function renderCustomerClasses(data){
	if ($.fn.dataTable.isDataTable('#classes_table')) {
		var table = $('#classes_table').DataTable();
		table.clear();
		table.destroy();
	}
	$.each(data, function(index, c){
		$('#classes_table_body').append('<tr><td>' + c.class_title + '</td><td>'
			+ c.class_category + '</td><td>'
			+ c.class_slot + '</td><td>'
			+ c.class_fee + '</td><td>'
			+ c.class_start + '</td><td>'
			+ c.class_duration + '</td><td>'
			+ (c.registrationId > 0
				? '<a href="#" data-identity="' + c.registrationId + '" data-toggle="modal" data-target="#class-unreg-modal">Unregister</a>'
				: '<a href="#" data-identity="' + c.class_id + '" data-toggle="modal" data-target="#class-reg-modal">Register</a>')
			+ '</td></tr>'
		);
	});

	$('#classes_table').DataTable( {
    	ordering: false
    });
}

function findTimetable(){
	console.log('findTimetable');
	$.ajax({
		type: 'GET',
		url: rootURL + '/timetable' ,
		dataType: "json",
		success: renderTimetable
	});
}

function renderTimetable(data){
	if ($.fn.dataTable.isDataTable('#timetable_table')) {
		var table = $('#timetable_table').DataTable();
		table.clear();
		table.destroy();
	}
	var output='';
	for (var classTitle in data) {
		output += '<tr><td>' + classTitle + '</td>';
		$.each(data[classTitle], function(index, classTime){
			output += '<td>' + (classTime != null ? classTime : '') + '</td>'
		});
		output += '</tr>'
	}
	$('#timetable_table_body').append(output);
	$('#timetable_table').DataTable();
}
