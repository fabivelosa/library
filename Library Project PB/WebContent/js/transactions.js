$(document).ready(function() {

	// The root URL for the RESTful services
	var rootURL = "http://localhost:8080/Library_Project_PB/rest/library";
	var transURL = "http://localhost:8080/Library_Project_PB/rest/library/transaction";
	var userURL = "http://localhost:8080/Library_Project_PB/rest/library/user";
	var userbalURL = "http://localhost:8080/Library_Project_PB/rest/library/user/balance";
	

	var custBalance =0;
	var updatedCustBalance = 0;
	var membershipFee = 25;

	
	/*Run process without Button for test purposes*/
	
	//Get Latest Customer Balance
	var customer = findCustBalanceById(2);
	console.log(customer);
	
	/*
	//Update Customer Balance with Membership fee
	updateCustBalanceMember(custBalance, membershipFee);
	
	//Update Transaction logs for Membership fee
	console.log(customer);
	memberTransaction(customer,custBalance,updatedCustBalance);
	
	
	//Test Generate DataTables list for Customer with ID of 2
	findTransactionsByCustomerId(2);
	
	*/
	
	
	
	/*Perform Business logic***************************************/
	
	//Update the Customer Balance for Membership
	function updateCustBalanceMember(custBalance, membershipFee){
		updatedCustBalance = Number(custBalance) + Number(membershipFee);
		console.log('New Customer Balance: ' + updatedCustBalance);
	}
	
	
	/*END Perform Business logic***************************************/
	
	
	/*Buttons********************************************/
	
	// Membership button listener
	$('#btnMbr').on(
			'click',
			function(e) {
				alert("The btn Add Member was clicked.");
				e.preventDefault();
				findCustBalanceById(2);   //Get Customer current Balance
				memberTransaction(id, custBalance, updatedCustBalance);
				updateCustBalanceMember(custBalance, membershipFee); //Update Customer Balance
				
				return false;
			});
	
	// Payment button listener
	$('#btnPay').on(
			'click',
			function(e) {
				alert("The btn Pay was clicked.");
				e.preventDefault();
				findCustBalanceById(2); //Get Customer current Balance
				paymentTransaction(id, custBalance, updatedCustBalance);
				updateCustBalanceMember(custBalance, membershipFee); //Update Customer Balance
				return false;
			});
	
	/*END Buttons********************************************/
	
	
	
	/*Data Retrieval********************************************/
	
	//Get the Customer Account Balance details        //Need to be able to pass data to Global Variable
	function findCustBalanceById(id) {
		console.log('findCustBalanceById: ' + id);
		customer = $.ajax({
			type : 'GET',
			url : userURL + '/' + id,
			dataType : "json",
		
		success : function(data) {
				console.log(data);
				customer = data;
				console.log('findCustBalanceById success: ' + customer.userId);
				custBalance = parseInt(customer.account_balance);
				console.log('Customer Current Balance: ' + customer.account_balance);
				
									}
			
				});
		
		return customer;
							}
	/*END Data Retrieval*************************************************/
	
	

	/*TRANSACTION LOGS REGION********************************************/
	
	
/*Post Membership Transaction to Transaction logs*/
function memberTransaction(customer, custBalance, updatedCustBalance){
		console.log('memberTransaction');
		console.log('Updated balance is '+ updatedCustBalance);
		/*Post to Transaction Ledger*/
		$.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : transURL,
			dataType : "json",
			data : debitTransToJSON(customer),
			success : function(data, textStatus, jqXHR) {
				alert('Member transaction added successfully');
				$('#btnMbr').hide();
				
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert('memberTransaciton log error: ' + textStatus);
			}
		});
		
}

/*Post Payment Transaction to Transaction logs*/
function paymentTransaction(id, custBalance, updatedCustBalance){
		console.log('paymentTransaction');
		console.log('Updated balance is '+ updatedCustBalance);
		/*Post to Transaction Ledger*/
		$.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : transURL,
			dataType : "json",
			data : creditTransToJSON(customer),
			success : function(data, textStatus, jqXHR) {
				alert('Payment transaction added successfully');
				$('#btnMbr').hide();
				
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert('paymnetTransaciton log error: ' + textStatus);
			}
		});
		
}
		
/*Update Customer Balance for all types of Transactions*/
		
function updateBalance(customer,updatedCustBalance){
	console.log('updateBalance');
	$.ajax({
	type : 'PUT',
	contentType : 'application/json',
	
	url : userbalURL + '/' + customer.userId + '/' + updatedCustBalance,
	dataType : "json",
	success : function(data, textStatus, jqXHR) {
		alert('Account balance updated successfully');
		$('#btnMbr').hide();
		
	},
	error : function(jqXHR, textStatus, errorThrown) {
		alert('updateBalance error: ' + textStatus);
	}
});
	
	console.log('Updated balance is '+ updatedCustBalance);
return false;
}
		

/*Generate JSON Data*/

//JSON for Debit Transaction//
function debitTransToJSON(customer) {
	console.log('transTOJSON');
	console.log('User ID is '+ customer.userId);
	var stringified = JSON.stringify({
		"user_id" : customer.userId,
		"date" : '2020-03-03',
		"name" : 'Membership Fee', //Need to set this Variable from HTML form, currently fixed
		"amount" : membershipFee, //Need to set this Variable from HTML form, currently fixed
		"type" : 'DEBIT',
		"user_ob" : customer.account_balance,
		"user_cb" : updatedCustBalance
	  
	});
	console.log(stringified);
	return stringified;
}

//JSON for Credit Transaction//
function creditTransToJSON(customer) {
	console.log('transTOJSON');
	console.log('User ID is '+ customer.userId);
	var stringified = JSON.stringify({
		"user_id" : customer.userId,
		"date" : '2020-03-03',
		"name" : 'paymentType', //Need to set this Variable
		"amount" : paymentAmount, //Need to set this Variable
		"type" : 'Credit',
		"user_ob" : customer.account_balance,
		"user_cb" : updatedCustBalance
	  
	});
	console.log(stringified);
	return stringified;
}
/*END TRANSACTION LOGS REGION********************************************/



/*DataTables *************************************************************/


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
			    
			    //List Selection Formula
			    
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