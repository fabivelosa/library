var rootURL = "http://localhost:8080/library/rest";

$(function() {

    initLoginForm();
    
});

function initLoginForm() {
    $("#invalid-login").removeClass('show');
    // submits the form data to login the user
    $('#loginForm').submit(function(event) {
        event.preventDefault();
        authenticateUser();
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
    });
}

function renderCustomerContent() {
    console.log('Display customer content');
    $.get('customer.html', function(response){
        $('#main-container').html(response);
        initCustomerPage();
        
        findCustomerClasses();
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
		url: rootURL + '/classes/' + authId,
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
