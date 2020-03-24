$(document).ready(function() {

	// The root URL for the RESTful services
	var rootURL = "http://localhost:8080/Library_Project_PB/rest/library";
	var transURL = "http://localhost:8080/Library_Project_PB/rest/library/transaction";
	var userURL = "http://localhost:8080/Library_Project_PB/rest/library/user";
	var userbalURL = "http://localhost:8080/Library_Project_PB/rest/library/user/balance";
	var customer;
	
	var custBalance =0;
	var updatedCustBalance = 0;
	var a = 10;
	var membershipFee = 25;

	


	myFunction();

	function myFunction(){
	   a = custBalance + membershipFee;
	}

	alert("Value of 'a' outside the function " + a);
	
	/*Run process without Button for test purposes*/
	
	findById(2);
	findTransactionsByCustomerId(2);
	
	
	
	/*Perform Business logic*/
	function updateCustBalance(custBalance, membershipFee){
		updatedCustBalance = Number(custBalance) + Number(membershipFee);
		console.log('New Customer Balance: ' + updatedCustBalance);
	}
	
	
	
	
	
	// Membership button listener
	$('#btnMbr').on(
			'click',
			function(e) {
				alert("The btn Add Member was clicked.");
				e.preventDefault();
				findById(2);
				memberTransaction(id, custBalance);
				return false;
			});
	
	/*Get the Customer details*/
	function findById(id) {
		console.log('findById: ' + id);
		$.ajax({
			type : 'GET',
			url : userURL + '/' + id,
			dataType : "json",
			success : function(data) {
				customer = data;
				console.log('findById success: ' + customer.userId);
				custBalance = parseInt(customer.account_balance);
				console.log('Customer Current Balance: ' + customer.account_balance);
				updateCustBalance(custBalance, membershipFee);
				myFunction();
				alert("Value of 'a' outside the function " + a);
				memberTransaction(data,custBalance,a);
			
									}
				});
		
		
							}
	
	

	
	
	
	/*Post Transaction to Transaction logs*/
function memberTransaction(customer, custBalance, updatedCustBalance){
		console.log('memberTransaction');
		console.log('Updated balance is '+ updatedCustBalance);
		/*Post to Transaction Ledger*/
		$.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : transURL,
			dataType : "json",
			data : transToJSON(customer),
			success : function(data, textStatus, jqXHR) {
				alert('Member transaction added successfully');
				$('#btnMbr').hide();
				
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert('memberTransaciton log error: ' + textStatus);
			}
		});
		console.log('memberbalanceUpdate');
		console.log('Updated balance is '+ updatedCustBalance);
		/*Update User Customer Balance*/
		$.ajax({
			type : 'PUT',
			contentType : 'application/json',
			
			url : userbalURL + '/' + customer.userId + '/' + a,
			dataType : "json",
			/*data : {account_balance: updatedCustBalance },*/
			success : function(data, textStatus, jqXHR) {
				alert('Member account balance updated successfully');
				$('#btnMbr').hide();
				
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert('memberTransaciton Account balance error: ' + textStatus);
			}
		});
		return false;
	}
function transToJSON(customer) {
	console.log('transTOJSON');
	console.log('User ID is '+ customer.userId);
	var stringified = JSON.stringify({
		"user_id" : customer.userId,
		"date" : '2020-03-03',
		"name" : 'Membership Fee',
		"amount" : membershipFee,
		"type" : 'DEBIT',
		"user_ob" : customer.account_balance,
		"user_cb" : updatedCustBalance
	  
	});
	console.log(stringified);
	return stringified;
}

/*Datatables **************************************/


/*Get all Transactions by Customer*/
function findTransactionsByCustomerId(custId) {
	console.log('findTransactionsByCustomerId: ' + custId);
	$.ajax({
		type : 'GET',
		url : transURL + '/search/' + custId,
		dataType : "json",
		 success: function (data) {

			    console.log(data);
			    // JAX-RS serializes an empty list as null, and a
			    // 'collection of one' as an
			    // object (not an 'array of one')

			    var transactions = data.transactionEntity;
			    
			   

			    $.each(transactions,function (index, transaction) {
			    	console.log('renderlist values' + transaction.user_id);
			                $('#table_body')
			                    .append(
			                        '<tr><td id="identify">' +
			                        transaction.transaction_id +
			                        '</td><td>' +
			                        transaction.user_id +
			                        '</td><td>' +
			                        transaction.date +
			                        '</td><td>' +
			                        transaction.name +
			                        '<td>' +
			                        transaction.type +
			                        '</td><td>' +
			                        transaction.user_ob +
			                        '</td><td>' +
			                        transaction.amount +
			                        '</td><td>' +
			                        transaction.user_cb +
			                        '</td></tr>'
			                     );
			            });

			  

			    var table = $('#table_id').DataTable();
			    
			    $('#table_id tbody').on(
			        'click',
			        'tr',
			        function () {
			            if ($(this).hasClass('selected')) {
			                $(this).removeClass('selected');
			                data_id = null;

			            } else {
			                table.$('tr.selected').removeClass(
			                    'selected');
			                data_id = null;
			                $(this).addClass('selected');

			                data_id = table.cell(
			                    '.selected #identify').data();
			                alert(data_id);
			            }

			        });



				
			}
	});
}

function renderList(data) {

    console.log('in renderList'+data);
    // JAX-RS serializes an empty list as null, and a
    // 'collection of one' as an
    // object (not an 'array of one')

    var transactions = data.transaction;
    
   

    $.each(transactions,function (index, transaction) {
    	console.log('renderlist values' + transaction.user_id);
                $('#table_body')
                    .append(
                        '<tr><td id="identify">' +
                        transaction.transaction_id +
                        '</td><td>' +
                        transaction.user_id +
                        '</td><td>' +
                        transaction.date +
                        '</td><td>' +
                        transaction.name +
                        '<td>' +
                        transaction.type +
                        '</td><td>' +
                        transaction.user_ob +
                        '</td><td>' +
                        transaction.amount +
                        '</td><td>' +
                        transaction.user_cb +
                        '</td></tr>'
                     );
            });

  

    var table = $('#table_id').DataTable();
    
    $('#table_id tbody').on(
        'click',
        'tr',
        function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
                data_id = null;

            } else {
                table.$('tr.selected').removeClass(
                    'selected');
                data_id = null;
                $(this).addClass('selected');

                data_id = table.cell(
                    '.selected #identify').data();
                alert(data_id);
            }

        });



	
}
	
		
});