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
        findCustomerClasses();
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
	console.log('data: ' + data);

	$.each(data, function(index, c){
		$('#table_body').append('<tr><td>' + c.class_title + '</td><td>'
			+ c.class_category + '</td><td>'
			+ c.class_slot + '</td><td>'
			+ c.class_fee + '</td><td>'
			+ c.class_start + '</td><td>'
			+ c.class_duration + '</td><td>'
			+ (c.registrationId > 0 ? '<a href="#">Unregister</a>' : '<a href="#" data-toggle="modal" data-target="#class-reg-modal">Register</a>')
			+ '</td></tr>'
		);
	});
	$('#classes_table').DataTable({
		  "ordering": false
	});
}
