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
		    console.log("User successfully authenticated." + sessionStorage.getItem("auth-token"));
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
    });
}
