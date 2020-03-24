/**
 * 
 */
var classesURL = "http://localhost:8080/library/rest/classes";
var usersURL = "http://localhost:8080/library/rest/user";
var registrationURL = "http://localhost:8080/library/rest/registration";

var dataClasses;
var dataUsers;
var dataRegistration;
	


//TAB REGISTRATION USER 

//TAB REGISTRATION USER End

//TAB UPDATE CLASS BEGIN
$(function() {
	$("#tabs").tabs({
		activate : function(event, ui) {
			
						
			if(dataClasses == null){
				ui.newPanel.load(self.findAllClasses(ui.newTab.index()));
			}else{
				if(ui.newTab.index()== 2){
					if($('.row .col-lg-3').length <= 1) {
							populateGrid(dataClasses);
					}
				}else if(ui.newTab.index()== 3){
					console.log("tab id"+ui.newTab.index());
					populateDTClasses(dataClasses);
					//populateDTUsers(dataUsers);
					//if (! $('#table_id-1').DataTable().data().any()) {}
					}
				}
			}
		});
	});


function findAllClasses(id) {
		$.ajax({
			type : 'GET',
			url : classesURL,
			dataType : "json",
			success : function(data) {
				dataClasses = data;
				if (id == 3) {
					populateDTClasses(data);
				} else if (id == 2) {
					populateGrid(data);
				}
			}
		});
	}

function findAllRegistration(id) {
	$.ajax({
		type : 'GET',
		url : registrationURL,
		dataType : "json",
		success : function(data) {
			dataRegistration = data;
			if (id == 3) {
				populateDTRegistration(data);
			}
		}
	});
}

function findAllUsers(classId) {
	$.ajax({
		type : 'GET',
		url : usersURL,
		dataType : "json",
		success : function(data) {
			dataUsers = data;
			populateDTUsers(dataUsers,classId);
			
		}
	});
}
	
function populateGrid(data) {

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

function populateDTClasses(data) {
	$('#table_id-1')
			.DataTable(
					{
						"paging" : true,
						"searching" : true,
						"retrieve" : true,
						//"processing" : true,
						"data" : dataClasses,
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
						}, ],
						"columnDefs" : [
								{//title
									visible : true,
									targets : 0,
									className : 'dt-center',
									render : function(data, type, full,
											meta) {
										return data;
									}
								},
								{//category
									visible : true,
									targets : 1,
									className : 'dt-center',
									render : function(data, type, full,
											meta) {
										return data;
									}
								},
								{//slot
									visible : true,
									targets : 2,
									className : 'dt-center',
									render : function(data, type, full,
											meta) {
										return data;
									}
								},
								{//fee
									visible : true,
									targets : 3,
									className : 'dt-center',
									render : function(data, type, full,
											meta) {
										return data;
									}
								},
								{//start
									visible : true,
									targets : 4,
									className : 'dt-center',
									render : function(data, type, full,
											meta) {
										return data;
									}
								},
								{//duration	
									visible : true,
									targets : 5,
									className : 'dt-center',
									render : function(data, type, full,
											meta) {
										return data;
									}
								},
								{//action
									visible : true,
									targets : 6,
									className : "dt-center",
									render : function(data, type, full,
											meta) {

										return '<button id="editBtn" class="btn btn-info btn-flat add"   name="addBtn" type="button">Add</button>'
												+ '&nbsp;&nbsp;<button id="deleteBtn" class="btn btn-info  btn-flat delete" name="deleteBtn" type="button" >Remove</button>';
									}
								} ],
					});
}
	
	function populateDTUsers(data,classId) {
		$('#table_id-2')
				.DataTable(
						{
							"paging" : true,
							"searching" : true,
							"retrieve" : true,
							//"processing" : true,
							"data" : data,
							"columns" : [ {
								"data" : "firstname"
							}, {
								"data" : "lastname"
							}, {
								"data" : "ageGroup"
							}, {
								"data" : "college_name"
							}, {
								"data" : "account_balance"
							}, {
								"data" : "mobileTel"		
							}, ],
							"columnDefs" : [
									{//first_name
										visible : true,
										targets : 0,
										className : 'dt-center',
										render : function(data, type, full,
												meta) {
											return data;
										}
									},
									{//last_name
										visible : true,
										targets : 1,
										className : 'dt-center',
										render : function(data, type, full,
												meta) {
											return data;
										}
									},
									{//age_group
										visible : true,
										targets : 2,
										className : 'dt-center',
										render : function(data, type, full,
												meta) {
											return data;
										}
									},
									{//mobile_tel
										visible : true,
										targets : 3,
										className : 'dt-center',
										render : function(data, type, full,
												meta) {
											return data;
										}
									},
									{//college_name
										visible : true,
										targets : 4,
										className : 'dt-center',
										render : function(data, type, full,
												meta) {
											return data;
										}
									},
									{//account_balance	
										visible : true,
										targets : 5,
										className : 'dt-center',
										render : function(data, type, full,
												meta) {
											return data;
										}
									},
									{//action
										visible : true,
										targets : 6,
										className : "dt-center",
										render : function(data, type, full,
												meta) {

											return '<button id="addtBtn"  class="btn btn-info btn-flat edit"  name="addBtn" type="button">Register</button>';

										}
									} ],
						});
	}

	
	 var table = $('#table_id-1').DataTable();
	     
	    $('#table_body-1').on('click', 'tr', function () {
	        var data = table.row( this ).data();
	      //  alert( 'You clicked on '+data[0]+'\'s row' );
	        alert("oi");
	        findAllUsers(1);		
	    } );

	
	
	
	function addEmploye(classId){
		 alert( "add class id"+classId );
		 findAllUsers(classId);		

	}
	
	function removeEmploye(classId){
		  alert( "remove class id"+classId );	
		 findAllRegistration(classId);

	}
	
	function registerCustomer(userId,classId){
		  alert( "registration class id"+classId );	
		// findAllRegistration(userId,classId);

	}
//TAB UPDATE CLASS end	