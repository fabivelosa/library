/*
 * A00267345 - Fabiane
 */
var rootURL = "http://localhost:8080/library/rest";

window.initEmployee = function initEmployee() {
	
	$("#tabs").tabs({
		activate : function(event, ui) {
			if (ui.newTab.index() == 1) {//Membership
				findAllUsersMember();
				initMembership();
			} else if (ui.newTab.index() == 2) {//Register on Class
				findAllUsers(2);
				initRegisterClass();
			} else if (ui.newTab.index() == 3) {//Update Class
				findAllClasses();
				initUpdateClasses();
			} else if (ui.newTab.index() == 4) {//Check Account
				findAllUsers(4);
				initUserTransactions();
			} else if (ui.newTab.index() == 5) {//Payments
				findAllUsers(5)
				initUserPayment();
			}else if (ui.newTab.index() == 6) {//Reports
				findAttendance();
			}
		}
	});

	$('#contact_form').submit(function(){
		event.preventDefault();
	});
	initRegisterUser();
	$("#success-message").hide();
};

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

function findAllUsers(tab) {
	$.ajax({
		type : 'GET',
		url : rootURL + '/user',
		dataType : "json",
		success : function(data) {
			if (tab==2)
			renderUserList(data);
			else if (tab==4)
			renderUserCombo(data);
			else if (tab==5)
				renderUserCmb(data);
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
				findAllUsers(2);
			} else {
				renderUserList(user);
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
			$('#searchKey').val("");
		}
	});
}

function findUserClasses(userId) {
	$.ajax({
		type : 'GET',
		url : rootURL + '/classes/query?user=' + userId + '&class=0',
		dataType : "json",
		success : function(data) {
			renderUserClasses(data)
		}
	});
}

function findAttendance() {
	$.ajax({
		type : 'GET',
		url : rootURL + '/attendance',

		dataType : "json",
		success : function(data) {
			renderGrid(data);
		}

	});
}

var renderUserCombo = function(users) {
	$("#userCombo option").remove();
	$.each(users, function(index, user) {
		$("#userCombo").append(
				'<option value="'+ user.userId + '">'+ user.firstname
				+ ' ' + user.lastname +'</option>;'
	)})
}

var renderUserCmb = function(users) {
	$("#userCmb option").remove();
	$.each(users, function(index, user) {
		$("#userCmb").append(
				'<option value="' + user.userId + '">' + user.firstname + ' '
						+ user.lastname + '</option>;')
	})
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
			'<li><a href="#" id="' + user.userId + '">' + user.firstname + ' '
					+ user.lastname + '</a></li>');
}

function renderUserClasses(data) {
console.log(data);
	if ($.fn.dataTable.isDataTable('#registerclasses')) {
		var table = $('#registerclasses').DataTable();
		table.clear();
		table.destroy();
	}
	$.each(data,function(index, c ) {
						$('#registerclassesbody')
								.append('<tr><td>'
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
												+ (c.registrationId > 0 ? '<a href="#" data-identity="'+ c.registrationId+ '" data-toggle="modal" data-target="#class-unregStaff-modal">Unregister</a>'
																		: '<a href="#" data-identity="' + c.class_id +'" data-fee="'+ c.class_fee +'" data-toggle="modal" data-target="#class-regStaff-modal">Register</a>')
												+ '</td></tr>');
					});

	$('#registerclasses').DataTable({
		ordering : false
	});
}

function renderGrid(data) {

	$(data).each(function(i, data) {
		append(data);
	});
}

function append(classes) {
	var pt = $('#classes-item').clone();
	pt.find('.classes-title').text(classes.class_title);
	pt.find('.classes-category').text(classes.class_category);
	pt.find('.classes-slot').text(classes.class_slot);
	pt.find('.classes-fee').text(classes.class_fee);
	pt.find('.classes-start').text(classes.class_start);
	pt.find('.classes-attendance').text(classes.attendance);
	pt.attr('id', 'classes-id-' + classes.class_id)
	pt.find('.classes-image').attr('src', 'images/'+classes.picture);
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

function renderDTUsers(data) {
	 $('#table_id-1').DataTable(
					{	"paging" : true,
						"searching" : true,
						"retrieve" : true,
						"data" : data,
						"columns" : [   {"data" : "user.userId"},
										{"data" : "user.firstname"},
										{"data" : "user.lastname"},
										{"data" : "user.ageGroup"},
										{"data" : "user.account_balance"},
										{"data" : "user.mobileTel"},
										{"data" : "userId"}, ],
						"columnDefs" : [
								{	visible : false,
									targets : 0,
									className : 'dt-center',
									render : function(data, type, full, meta) {
										return data;
									}
								},
								{	visible : true,
									targets : 1,
									className : 'dt-center',
									render : function(data, type, full, meta) {
										return data;
									}
								},
								{	visible : true,
									targets : 2,
									className : 'dt-center',
									render : function(data, type, full, meta) {
										return data;
									}
								},
								{	visible : true,
									targets : 3,
									className : 'dt-center',
									render : function(data, type, full, meta) {
										return data;
									}
								},
								{  visible : true,
									targets : 4,
									className : 'dt-center',
									render : function(data, type, full, meta) {
										return data;
									}
								},
								{   visible : true,
									targets : 5,
									className : 'dt-center',
									render : function(data, type, full, meta) {
										return data;
									}
								},
								{ 	visible : true,
									targets : 6,
									className : "dt-center",
									render : function(data, type, full, meta) {
										var button;
										if (data > 0) {
											button = '<button id="endBtn" class="btn btn-info btn-flat delete"  name="endBtn" type="button">UnRegister</button>';
										} else {
											button = '<button id="createBtn" class="btn btn-info btn-flat edit"  name="createBtn" type="button">Register</button>';

										}
										return button;
									}
								} ],
					});

}

function initUpdateClasses() {

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

	$('#btn-save').on('click', function(e) {
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
}

function initRegisterUser() {


$('#cmbCategory').change(function() {
		if ($('#cmbCategory').val()=='WALK_IN_CUSTOMER'){
			$('#eircode').hide();
			$('#eircodel').hide();
			$('#email').hide();
			$('#emaill').hide();
			$('#contact_no').hide();
			$('#contact_nol').hide();
			$('#address_name').hide();
			$('#address_namel').hide();
			$('#address').hide();
			$('#addressl').hide();
			$('#town').hide();
			$('#townl').hide();
			$('#county').hide();
			$('#countyl').hide();
			$('#user_name').hide();
			$('#user_namel').hide();
			$('#user_password').hide();
			$('#user_passwordl').hide();

		}else {
			$('#eircode').show();
			$('#email').show();
			$('#contact_no').show();
			$('#address_name').show();
			$('#address').show();
			$('#town').show();
			$('#user_name').show();
			$('#user_password').show();

			$('#county').show();
			$('#eircodel').show();
			$('#emaill').show();
			$('#contact_nol').show();
			$('#address_namel').show();
			$('#addressl').show();
			$('#townl').show();
			$('#countyl').show();
			$('#user_namel').show();
			$('#user_passwordl').show();
		}
})


$('#btnSaveUser').click(function() {
		console.log('click user');
		
	var formToJSON = function() {
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
		"addressCounty" : $('#county').val(),
		"username" : $('#user_name').val(),
		"password" : $('#user_password').val()
		});
	};

	    	
		console.log('addUser');
		$.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : rootURL + '/user',
			dataType : "json",
			data : formToJSON(),
			success : function(data, textStatus, jqXHR) {
				 $("#success-message").hide();
				 $("#success-message").fadeTo(2000, 500).slideUp(500, function(){
				 $("#success-message").slideUp(500);});   
				clearForm();
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert('addUser error: ' + textStatus);
				clearForm();
			}
		});

	function clearForm() {
		$('#cmbCategory').val("");
		$('#dateofbirth').val("");
		$('#eircode').val("");
		$('#email').val("");
		$('#college').val("");
		$('#first_name').val("");
		$('#last_name').val("");
		$('#contact_no').val("");
		$('#address_name').val("");
		$('#address').val("");
		$('#town').val("");
		$('#county').val("");
		}
	});
}


function initMembership() {
	$('#table_id-1 tbody').on(
			'click',
			'#endBtn',
			function() {
				var row = $(this).parents('tr')[0];
				var table = $('#table_id-1').DataTable();
				var mydata = (table.row(row).data());
				var memberId = mydata["userId"];
				var formToData = JSON.stringify({
					"endDate" : new Date(),
					"userId" : memberId
				});
				console.log(formToData);
				var con = confirm("Are you sure you want to END membership of "
						+ mydata.user["lastname"] + "?");

				if (con) {
					console.log('yes');
					$.ajax({
						type : 'PUT',
						contentType : 'application/json',
						url : rootURL + '/membership/' + memberId,
						data : formToData,
						success : function() {
							if ($.fn.dataTable.isDataTable('#table_id-1')) {
								var table = $('#table_id-1').DataTable();
								table.destroy();
								table.clear();
							}
							findAllUsersMember();
						}
						
					});
				}
			});

	$('#table_id-1 tbody')
			.on(
					'click',
					'#createBtn',
					function() {
						var row = $(this).parents('tr')[0];
						var table = $('#table_id-1').DataTable();
						var mydata = (table.row(row).data());
						console.log('userid:' + mydata.user["userId"]);
						var memberId = mydata.user["userId"];
						var formToData = JSON
								.stringify({
									"startDate" : new Date(), // start date is
									// TODAY DATE
									"endDate" : new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // END DATE is  TODAY PLUS 1 YEAR
									"userId" : memberId
								});
						console.log('formToData:' + formToData);
						var con = confirm("Are you sure you want to ADD membership for "
								+ mydata.user["lastname"] + "?");
						if (con) {
							$.ajax({
								type : 'POST',
								contentType : 'application/json',
								url : rootURL + '/membership/',
								data : formToData,
								success : function() {
									if ($.fn.dataTable
											.isDataTable('#table_id-1')) {
										var table = $('#table_id-1')
												.DataTable();
										table.destroy();
										table.clear();
									}
									findAllUsersMember();
								}
							});
						}
						// Paul Barry Add Membership Fee Transaction
						membershipRegistration(memberId);
					});
}

function initRegisterClass() {
	var fee; //Paul Barry
	var currentUser;
	$(document).on("click", "#userList a", function(e) {
		e.stopPropagation();
		findUserById(this.id);
		currentUser= this.id;
	});
	
	// Trigger search when pressing 'Return' on search key input field
	$('#searchKey').keypress(function(e){
		if(e.which == 13) {
			search($('#searchKey').val());
			e.preventDefault();
			return false;
	    }
	});
	
	var search =function(searchKey) {
		if (searchKey == '') 
			findAllUsers(2);
		else
			findUserByName($('#searchKey').val())
	};	

	
	$(document).on("click", "#btnSearch", function() {
		//findUserByName($('#searchKey').val())
		search($('#searchKey').val());
		return false;
	});

	$('#class-regStaff-modal').on('show.bs.modal', function(event) {
		var actionLink = $(event.relatedTarget);
		var classId = actionLink.data('identity');
		
		fee = actionLink.data('fee'); //Paul Barry
		console.log('fee is: '+ fee); //Paul Barry
		
		console.log('show.bs.modal:'+$(event.relatedTarget));
		console.log('classId: ' + classId);
		console.log('userId: ' + currentUser);
		if (classId != undefined) {
			var modal = $(this);
			modal.find('#class-id').val(classId);
		}
	});

	$('#class-regStaff-modal').on('hide.bs.modal', function(event) {
		console.log('hide.bs.modal');
		$('#weekly').prop('checked', false);
		$('#whole').prop('checked', false);
	});

	$('#btn-staff-register').click(function(e) {
		e.stopPropagation();
		var paymentType;
		var custId; //Paul Barry - Customer ID required

		if ($('#weekly').is(":checked")) {
			paymentType = 'weekly';
		} else if ($('#whole').is(":checked")) {
			paymentType = 'whole';
		}

		if ($('#weekly').is(":checked") || $('#whole').is(":checked")) {
			var classId = $('#class-id').val();
			
			/*var userId = sessionStorage.getItem("auth-id"); //Paul Barry
*/	    	custId = currentUser; //Paul Barry - added for convenience to get Cust ID
	    	console.log('classId: ' + classId); //Paul Barry
	    	
	    	console.log('Fee is: '+fee); //Paul Barry
	    	

			var formData = JSON.stringify({
				"classId" : classId,
				"memberId" : currentUser
			});

			$.ajax({
				type : 'POST',
				contentType : 'application/json',
				url : rootURL + '/registration/' + paymentType,
				data : formData,
				success : function() {
					findUserClasses(currentUser);
					$('#class-regStaff-modal').modal("hide");
				}
			});
			
			//Paul Barry Transaction call
	    	console.log('Inside Paul Barrys Class registration code');
	    	classRegistration(custId, fee, paymentType);
		}
		
	});

	$('#btn-staff-unregister').click(function() {
		var regId = $('#reg-id').val();
		$.ajax({
			type : 'DELETE',
			url : rootURL + '/registration/' + regId,
			success : function() {
				findUserClasses(currentUser);
				$('#class-unregStaff-modal').modal("hide");
			}
		});
	});

	$('#class-unregStaff-modal').on('show.bs.modal', function(event) {
		var actionLink = $(event.relatedTarget);
		var regId = actionLink.data('identity');
		if (regId != undefined) {
			var modal = $(this);
			modal.find('#reg-id').val(regId);
		}
	});
}

function initUserPayment() {
	$('#btn-pay').on('click', function(e) {
		e.stopPropagation();
		var amount = $('#amount').val();
		var payName = $('#cbCategory').val();
		var custId	= $('#userCmb').val();
		
		console.log('Payment amount: '  +amount);
		console.log('Payment payName: ' +payName);
		console.log('Payment custId: '  +custId);
		payment(custId, payName, amount);
	})
}

function initUserTransactions() {
	$("#userCombo").on("change", function(event) {
		event.stopPropagation();
		if ($.fn.dataTable.isDataTable('#table_id')) {
			var table = $('#table_id').DataTable();
			table.clear();
			table.destroy();
		}
		findTransactionsByCustomerId(this.value);
	});
}