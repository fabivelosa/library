/**
 * 
 */
var rootURL = "http://localhost:8080/library/rest";

$(document).ready(function() {
	initEmployeePage();
});

$(function() {
	$("#tabs").tabs({
		activate : function(event, ui) {
			if (ui.newTab.index() == 1) {
				findAllUsersMember();
			} else if (ui.newTab.index() == 2) {
				findAllUsers();
			} else if (ui.newTab.index() == 3) {
				findAllClasses();
			} else if (ui.newTab.index() == 5) {
				findAttendance();
			}
		}
	});
});

function findAllClasses() {
	$.ajax({
		type : 'GET',
		url : rootURL + '/classes',
		dataType : "json",
		success : function(data) {
			renderDTClasses(data);
		}
	});
}

function findClasseById(id) {
	$.ajax({
		type : 'GET',
		url : rootURL + '/classes/query?user=0&class=' + id, // classes/query?user=0&class=9
		dataType : "json",
		success : function(data) {
			$('#classId').val(data[0].class_id);
			$('#duration').val(data[0].class_duration);
			$('#title').val(data[0].class_title);
			$('#category').val(data[0].class_category);
			$('#start_class').val(data[0].class_start);
			$('#slot').val(data[0].class_slot);
			$('#fee').val(data[0].class_fee);
		}

	});
}

function findAllRegistration(classID) {
	$.ajax({
		type : 'GET',
		url : rootURL + '/registration/query?user=0&class=' + classID,
		dataType : "json",
		success : function(data) {
			// renderDTRegistration(data);
		}
	});
}

function findAllRegistration(userID) {
	$.ajax({
		type : 'GET',
		url : rootURL + '/registration/query?user=' + userID + '&class=0',
		dataType : "json",
		success : function(data) {
			// renderDTRegistration(data);
		}
	});
}

function findAllUsersMember() {
	$.ajax({
		type : 'GET',
		url : rootURL + '/membership',
		dataType : "json",
		success : function(data) {
			renderDTUsers(data);

		}
	});
}

function findAllUsers() {
	$.ajax({
		type : 'GET',
		url : rootURL + '/user',
		dataType : "json",
		success : function(data) {
			renderUserList(data);

		}
	});
}

function findUserByName(name) {
	$.ajax({
		type : 'GET',
		url : rootURL + '/user/search/' + name,
		dataType : "json",
		success : function(user) {
			if ($.fn.dataTable.isDataTable('#registerclasses')) {
				var table = $('#registerclasses').DataTable();
				table.clear();
				table.destroy();
			}
			if (user.length == 0) {
				alert("Not found! Please search by Last Name!");
				$('#searchKey').val("");
				$('#userList li').remove();
				findAllUsers();
			} else {
				renderUserList(user);
				//findUserClasses(user);
			}
		}
	});
}

function findUserById(userId) {
	$.ajax({
		type : 'GET',
		url : rootURL + '/user/' + userId,
		dataType : "json",
		success : function(user) {
			renderUserSelect(user);
			findUserClasses(userId);
			}
	});
}

function findUserClasses(userId) {
	$.ajax({
		type : 'GET',
		url : rootURL + '/classes/query?user=' + userId + '&class=0',
		dataType : "json",
		success : renderUserClasses
	});
}

function findAttendance() {
	$.ajax({
		type : 'GET',
		url : rootURL + '/classes/' + 1,

		dataType : "json",
		success : function(data) {
			renderGrid(data);
		}

	});
}

var renderUserList = function(users) {
	$("#userList li").remove();
	$.each(users, function(index, user) {
		$("#userList").append(
				'<li><a href="#" id="' + user.userId + '">' + user.firstname
						+ ' ' + user.lastname + '</a></li>');

	})
}

var renderUserSelect = function(user) {
	$("#userList li").remove();
		$("#userList").append(
				'<li><a href="#" id="' + user.userId + '">' + user.firstname
						+ ' ' + user.lastname + '</a></li>');
}

var renderUserClasses = function(data) {

	if ($.fn.dataTable.isDataTable('#registerclasses')) {
		var table = $('#registerclasses').DataTable();
		table.clear();
		table.destroy();
	}
	$
			.each(
					data,
					function(index, c) {
						$('#registerclassesbody')
								.append(
										'<tr><td>'
												+ c.class_title
												+ '</td><td>'
												+ c.class_category
												+ '</td><td>'
												+ c.class_slot
												+ '</td><td>'
												+ c.class_fee
												+ '</td><td>'
												+ c.class_start
												+ '</td><td>'
												+ c.class_duration
												+ '</td><td>'
												+ (c.registrationId > 0 ? '<a href="#" data-identity="'
														+ c.registrationId
														+ '" data-toggle="modal" data-target="#class-unreg-modal">Unregister</a>'
														: '<a href="#" data-identity="'
																+ c.class_id
																+ '" data-toggle="modal" data-target="#class-reg-modal">Register</a>')
												+ '</td></tr>');
					});

	$('#registerclasses').DataTable({
		ordering : false
	});
}

function renderGrid(data) {
	console.log($('#classes-item').length);
	$(data).each(function(i, classes) {
		append(classes);
	});
}

function append(classes) {

	var pt = $('#classes-item').clone();
	pt.find('.classes-title').text(classes.class_title);
	pt.find('.classes-category').text(classes.class_category);
	pt.find('.classes-slot').text(classes.class_slot);
	pt.find('.classes-fee').text(classes.class_fee);
	pt.find('.classes-start').text(classes.class_start);
	pt.find('.classes-duration').text(classes.class_duration);
	pt.attr('id', 'classes-id-' + classes.class_id)
	pt.find('.classes-image').attr('src', classes.class_image);
	pt.show();

	$('#classes-row').append(pt);
}

function renderDTClasses(data) {
	if ($.fn.dataTable.isDataTable('#table_id-3')) {
		var table = $('#table_id-3').DataTable();
		table.clear();
		table.destroy();
	}
	$('#table_id-3')
			.DataTable(
					{
						"paging" : true,
						"searching" : true,
						"retrieve" : true,
						// "processing" : true,
						"data" : data,
						"columns" : [ {
							"data" : "class_title"
						}, {
							"data" : "class_category"
						}, {
							"data" : "class_slot"
						}, {
							"data" : "class_fee"
						}, {
							"data" : "class_start"
						}, {
							"data" : "class_duration"
						}, {
							"data" : "class_id"
						}, ],
						"columnDefs" : [
								{// title
									visible : true,
									targets : 0,
									className : 'dt-center',
									render : function(data, type, full, meta) {
										return data;
									}
								},
								{// category
									visible : true,
									targets : 1,
									className : 'dt-center',
									render : function(data, type, full, meta) {
										return data;
									}
								},
								{// slot
									visible : true,
									targets : 2,
									className : 'dt-center',
									render : function(data, type, full, meta) {
										return data;
									}
								},
								{// fee
									visible : true,
									targets : 3,
									className : 'dt-center',
									render : function(data, type, full, meta) {
										return data;
									}
								},
								{// start
									visible : true,
									targets : 4,
									className : 'dt-center',
									render : function(data, type, full, meta) {
										return data;
									}
								},
								{// duration
									visible : true,
									targets : 5,
									className : 'dt-center',
									render : function(data, type, full, meta) {
										return data;
									}
								},
								{// action
									visible : true,
									targets : 6,
									className : "dt-center",
									searchable : false,
									orderable : false,
									render : function(data, type, full_row,
											meta) {

										return '<a href="#" data-identity="'
												+ data
												+ '" data-toggle="modal" data-target="#class-update-modal">Edit</a>';

									}
								} ],
					});
}

function initEmployeePage() {
	$('#class-update-modal').on('hidden.bs.modal', function() {
		console.log('hide.bs.modal');
		$('#classId').val("");
		$('#duration').val("");
		$('#title').val("");
		$('#category').val("");
		$('#start').val("");
		$('#slot').val("");
		$('#fee').val("");
	});

	$('#class-update-modal').on('show.bs.modal', function(event) {
		console.log('show.bs.modal');
		var actionLink = $(event.relatedTarget);
		var classId = actionLink.data('identity');
		console.log('classId :' + classId);
		findClasseById(classId);

	});

	$('#btn-save').on('click', function(e) {
		// e.preventDefault();
		var classId = $('#classId').val();
		console.log('click' + classId);
		console.log(formToJSON());
		$.ajax({
			type : 'PUT',
			contentType : 'application/json',
			url : rootURL + '/classes/' + classId,
			dataType : "json",
			data : formToJSON(),
			success : function(response) {
				findAllClasses();
				$('#class-update-modal').modal("hide");

			}
		})
	});

	$('#success_message').hide();

	$('#btnSaveUser').click(function() {
		if ($('#userId').val() == '')
			addUser();
		return false;
	});

	$(document).on("click", "#userList a", function() {
		//findUserClasses(this.id);
		findUserById(this.id);
	});
	$(document).on("click", "#btnSearch", function() {
		findUserByName($('#searchKey').val())
	});
}

var formToJSON = function() {
	return JSON.stringify({
		"class_id" : $('#classId').val(),
		"class_duration" : $('#duration').val(),
		"class_title" : $('#title').val(),
		"class_category" : $('#category').val(),
		"class_start" : $('#start_class').val(),
		"class_slot" : $('#slot').val(),
		"class_fee" : $('#fee').val()
	});
};

var addUser = function() {
	console.log('addUser');
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : rootURL + '/user',
		dataType : "json",
		data : UserformToJSON(),
		success : function(data, textStatus, jqXHR) {
			alert('User created successfully');
			$('#userId').val(data.id);
			// findAll();
			$('#success_message').show();
			clearForm();
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert('addUser error: ' + textStatus);
		}
	});
};

var UserformToJSON = function() {
	return JSON.stringify({
		"category" : $('#cmbCategory').val(),
		"birth_date" : $('#dateofbirth').val(),
		"eircode" : $('#eircode').val(),
		"email" : $('#email').val(),
		"college_name" : $('#college').val(),
		"firstname" : $('#first_name').val(),
		"lastname" : $('#last_name').val(),
		"mobileTel" : $('#contact_no').val(),
		"addressName" : $('#address_name').val(),
		"addressStreet" : $('#address').val(),
		"addressTown" : $('#town').val(),
		"addressCounty" : $('#county').val()
	});
};

var clearForm = function() {

	$('#cmbCategory').val(""), $('#dateofbirth').val(""),
			$('#eircode').val(""), $('#email').val(""), $('#college').val(""),
			$('#first_name').val(""), $('#last_name').val(""), $('#contact_no')
					.val(""), $('#address_name').val(""),
			$('#address').val(""), $('#town').val(""), $('#county').val("")

}

function renderDTUsers(data) {
	$('#table_id-1')
			.DataTable(
					{
						"paging" : true,
						"searching" : true,
						"retrieve" : true,
						// "processing" : true,
						"data" : data,
						"columns" : [ {
							"data" : "user.firstname"
						}, {
							"data" : "user.lastname"
						}, {
							"data" : "user.ageGroup"
						}, {
							"data" : "user.account_balance"
						}, {
							"data" : "user.mobileTel"
						}, {
							"data" : "userId"
						}, ],
						"columnDefs" : [
								{// first_name
									visible : true,
									targets : 0,
									className : 'dt-center',
									render : function(data, type, full, meta) {
										return data;
									}
								},
								{
									visible : true,
									targets : 1,
									className : 'dt-center',
									render : function(data, type, full, meta) {
										return data;
									}
								},
								{// age_group
									visible : true,
									targets : 2,
									className : 'dt-center',
									render : function(data, type, full, meta) {
										return data;
									}
								},
								{// account_balance
									visible : true,
									targets : 3,
									className : 'dt-center',
									render : function(data, type, full, meta) {
										return data;
									}
								},
								{// mobile_tel
									visible : true,
									targets : 4,
									className : 'dt-center',
									render : function(data, type, full, meta) {
										return data;
									}
								},
								{// action
									visible : true,
									targets : 5,
									className : "dt-center",
									render : function(data, type, full, meta) {

										var button;
										if (data > 0) {
											button = '<button id="deleteBtn"  class="btn btn-info btn-flat delete"  name="deleteBtn" type="button">UnRegister</button>';
										} else {
											button = '<button id="saveBtn"  class="btn btn-info btn-flat edit"  name="saveBtn" type="button">Register</button>';

										}
										return button;
									}
								} ],
					});
}

function renderDTRegistration(data) {
	$('#table_id-2')
			.DataTable(
					{
						"paging" : true,
						"searching" : true,
						"retrieve" : true,
						// "processing" : true,
						"data" : data,
						"columns" : [ {
							"data" : "user.firstname"
						}, {
							"data" : "user.lastname"
						}, {
							"data" : "user.ageGroup"
						}, {
							"data" : "user.account_balance"
						}, {
							"data" : "user.mobileTel"
						}, {
							"data" : "userId"
						}, ],
						"columnDefs" : [
								{// first_name
									visible : true,
									targets : 0,
									className : 'dt-center',
									render : function(data, type, full, meta) {
										return data;
									}
								},
								{
									visible : true,
									targets : 1,
									className : 'dt-center',
									render : function(data, type, full, meta) {
										return data;
									}
								},
								{// age_group
									visible : true,
									targets : 2,
									className : 'dt-center',
									render : function(data, type, full, meta) {
										return data;
									}
								},
								{// account_balance
									visible : true,
									targets : 3,
									className : 'dt-center',
									render : function(data, type, full, meta) {
										return data;
									}
								},
								{// mobile_tel
									visible : true,
									targets : 4,
									className : 'dt-center',
									render : function(data, type, full, meta) {
										return data;
									}
								},
								{// action
									visible : true,
									targets : 5,
									className : "dt-center",
									render : function(data, type, full, meta) {

										var button;
										if (data > 0) {
											button = '<button id="deleteBtn"  class="btn btn-info btn-flat delete"  name="deleteBtn" type="button">UnRegister</button>';
										} else {
											button = '<button id="saveBtn"  class="btn btn-info btn-flat edit"  name="saveBtn" type="button">Register</button>';

										}
										return button;
									}
								} ],
					});
}
