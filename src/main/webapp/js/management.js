var rootURL = "http://localhost:8080/library/rest/classes";

$(document).ready(function() {
	findClasses();
	
	$('#btn-save').click(function(){
		console.log('Button save clicked');
		
		var formData = formToJSON();
		
		$.ajax({
    		type: 'POST',
    		contentType: 'application/json',
    		url: rootURL,
    		data: formData,
    		success: function(){
    			console.log('successfully saved');
    			findClasses();
    			$('#class-modal').modal("hide");
    		}
    	});
	})
	$('#classes_table_body a').click(function(){
		deleteClass();
		return false;
	});
	
});

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

var deleteClass = function(){
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		url: rootURL + '/' + id,
		success: function(){
			alert('Class deleted successfully');
			findClasses();
		}
	});
};

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
			+ '<a href="#" data-identity="' + c.class_id + '" data-toggle="modal" data-target="#class-modal">Edit</a>'
			+ ' | <a href="#" data-identity="' + c.class_id + '" data-toggle="modal" data-target="#class-delete-modal">Delete</a>'
			+ '</td></tr>'
		);
	});

	$('#classes_table').DataTable();
}


