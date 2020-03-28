/**
 * 
 */
var rootURL = "http://localhost:8080/library/rest";

var dataClasses;
var dataUsers;
var dataRegistration;

$(function() {
	$("#tabs").tabs({
		activate : function(event, ui) {

				if (ui.newTab.index() == 1) {
					findAllUsers();
				}else if(ui.newTab.index() == 2) {
				     	findAllRegistration(1);
				} else if (ui.newTab.index() == 3) {
					findAllClasses();
				}else if(ui.newTab.index() ==5) {
					//renderGrid(dataClasses);
					findAttendance() ;
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
			dataClasses = data;
			renderDTClasses(dataClasses);
			}
		
	});
}

function findAllRegistration(classID) {
	$.ajax({
		type : 'GET',
		url : rootURL + '/registration/query?user=0&class=' + classID,
		dataType : "json",
		success : function(data) {
			dataRegistration = data;
			//renderDTRegistration(data);
		}
	});
}

function findAllRegistration(userID) {
	$.ajax({
		type : 'GET',
		url : rootURL + '/registration/query?user=' + userID + '&class=0',
		dataType : "json",
		success : function(data) {
			dataRegistration = data;
			//renderDTRegistration(data);
		}
	});
}

function findAllUsers() {
	$.ajax({
		type : 'GET',
		url : rootURL + '/membership',
		dataType : "json",
		success : function(data) {
			dataUsers = data;
			renderDTUsers(dataUsers);

		}
	});
}

function findAttendance() {
	console.log("atendance");
	$.ajax({
		type : 'GET',
		url : rootURL + '/classes/' + classId,
		dataType : "json",
		success : function(data) {
			dataClasses = data;
			renderGrid(dataClasses);
			}
		
	});
}

function renderGrid(data) {
	// $('#classes-item').remove();
	console.log("grid");
	console.log(data);
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
							"data" : "null"
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
										return '<div style="display:block">'
												+ '<button onclick="edit_action(this, '
												+ full_row.id
												+ ')" type="button" class="edit_action btn btn-warning btn-xs" data-toggle="modal" data-target="#class-update-modal" style="margin:3px"><i class="fa fa-edit"></i> Edit </button>'
												+ '</div>';
										// '<button id="editBtn" class="btn
										// btn-wrang btn-flat edit"
										// name="editBtn"
										// type="button">Edit</button>';
										// <a href="#">Unregister</a>' : '<a
										// href="#" data-toggle="modal"
										// data-target="#class-update-modal">Register</a>')

									}
								} ],
					});
	
	$('#edit_action').on('click', function(e) {
		e.preventDefault();
		// $.ajax({
		// url: "{{ route('admin.book_languages.edit') }}",
		// data: {
		// 'item_id': $('#item_id').val(),
		// 'language_name': $('#language_name').val(),
		// '_token': "{{ csrf_token() }}"
		// },
		// type: "POST",
		// success: function (response) {
		// $('#modal_edit').modal('hide');
		// DataTable.ajax.reload(null, false);
		// console.log(data.message);
		// }
		// })
	});

	$('#class-update-modal').on('hidden.bs.modal', function() {
		$('#class_id').val(0);
		// $('#language_name').val("");
	});
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
											button= '<button id="saveBtn"  class="btn btn-info btn-flat edit"  name="saveBtn" type="button">Register</button>';
											
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
											button= '<button id="saveBtn"  class="btn btn-info btn-flat edit"  name="saveBtn" type="button">Register</button>';
											
										}
										return button;
									}
								} ],
					});
}

