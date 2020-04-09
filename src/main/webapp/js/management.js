var rootURL = "http://localhost:8080/library/rest/classes";

var deleteClassId;
var editClassId;

$(document).ready(function() {
	findClasses();

	$('#btn-save').click(function(){
		console.log('Button save clicked');

		var formData = formToJSON();
		if (editClassId > 0) {
			$.ajax({
				type: 'PUT',
				contentType: 'application/json',
				url: rootURL + '/' + editClassId,
				data: formData,
				success: function() {
					console.log('successfully update');
					findClasses();
					$('#class-modal').modal("hide");
				}
			});
		} else {
			$.ajax({
				type: 'POST',
				contentType: 'application/json',
				url: rootURL,
				data: formData,
				success: function(){
					console.log('successfully created');
					findClasses();
					$('#class-modal').modal("hide");
				}
			});
    	}
	})

	$('#class-delete-modal').on('show.bs.modal', function(event) {
		console.log('show.bs.modal');
		var actionLink = $(event.relatedTarget);
		deleteClassId = actionLink.data('identity');

	});

	$('#btn-delete').click(function(){
		console.log('Delete button clicked :' + deleteClassId);
		$.ajax({
			type: 'DELETE',
			url: rootURL + '/' + deleteClassId,
			success : function() {
				findClasses();
				$('#class-delete-modal').modal("hide");

			}
		});
	});

	$('#class-modal').on('show.bs.modal', function(event){
		console.log('show.bs.modal');
		var actionLink = $(event.relatedTarget);
		var classId = actionLink.data('identity');
		if (classId != undefined) {
			$.ajax({
        		type : 'GET',
        		url : rootURL + '/' + classId,
        		dataType : "json",
        		success : renderDetails
			});
		} else {
			clearForm();
		}
	});
});


var renderDetails = function(c) {
	editClassId = c.class_id;
	$('#class_title').val(c.class_title);
	$('#class_category').val(c.class_category);
	$('#class_slot').val(c.class_slot);
	$('#class_fee').val(c.class_fee);
	$('#class_start').val(c.class_start);
	$('#class_duration').val(c.class_duration);
};

function clearForm() {
	editClassId = 0;
	$('#class_title').val("");
	$('#class_category').val("");
	$('#class_slot').val("");
	$('#class_fee').val("");
	$('#class_start').val("");
	$('#class_duration').val("");
};

var formToJSON = function () {
	return JSON.stringify({
		"class_title": $('#class_title').val(),
		"class_category": $('#class_category').val(),
		"class_slot": $('#class_slot').val(),
		"class_fee": $('#class_fee').val(),
		"class_start": $('#class_start').val(),
		"class_duration": $('#class_duration').val(),
	});
};

function findClasses(){
	console.log('findClasses');
	$.ajax({
		type: 'GET',
		url: rootURL,
		dataType: "json",
		success: renderClasses
	});
}

function renderClasses(data){
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
			+ '<a href="#" class="edit" data-identity="' + c.class_id + '" data-toggle="modal" data-target="#class-modal">Edit</a>'
			+ ' | <a href="#" data-identity="' + c.class_id + '" data-toggle="modal" data-target="#class-delete-modal">Delete</a>'
			+ '</td></tr>'
		);
	});

	$('#classes_table').DataTable();
}


