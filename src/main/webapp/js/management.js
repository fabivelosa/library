var classesURL = "http://localhost:8080/library/rest/classes";



var addClass = function () {
	console.log('addClass');
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: classesURL,
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus, jqXHR){
			alert('Class created successfully');
//			$('#btnDelete').show();
			$('#class_title').val(data.class_title);
                        findAll();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('addClass error: ' + textStatus);
		}
	});
};


var updateClass= function () {
	console.log('updateClass');
	$.ajax({
		type: 'PUT',
		contentType: 'application/json',
		url: rootURL + '/' + $('#class_title').val(),
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus, jqXHR){
			alert('Class updated successfully');
                         findAll();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('updateClass error: ' + textStatus);
		}
	});
};

var renderList = function(data){
list = data.classes;
console.log("classes");
$.each(list, function(index, classes)	{
	
	$('#table_body').append('<tr><td>'+classes.class_title+'</td><td>'+classes.class_category+'</td><td>'+classes.class_slot+'</td><td>'+classes.class_fee+'</td><td>'+classes.class_start+'</td><td>'+classes.class_duration+'</td></tr>');
});
}

var formToJSON = function () {
	var class_title = $('#class_title').val();
	return JSON.stringify({
		"class_title": $('#class_title').val(), 
		"class_category": $('#class_category').val(), 
		"class_slot": $('#class_slot').val(),
		"class_fee": $('#class_fee').val(),
		"class_start": $('#class_start').val(),
		"class_duration": $('#class_duration').val(),
		});
};

$(document).ready( function () {
    $('#classes_table').DataTable();
    
    
    
});

