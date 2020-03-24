$(document).ready(function() {

	// The root URLs for the RESTful services
	var rootURL = "http://localhost:8080/Library_Project_PB/rest/library";
	var transURL = "http://localhost:8080/Library_Project_PB/rest/library/transaction";
	var userURL = "http://localhost:8080/Library_Project_PB/rest/library/user";
	var userBalURL = "http://localhost:8080/Library_Project_PB/rest/library/user/balance";
	
	//Constants for Customer
	var customer = findCustBalanceById(2); //Testing with Customer ID of 2
	
	
	
	console.log('Customer ID is: '+customer.userId);
	console.log('Customer Acount Balance is: '+customer.account_balance);
	
	var custBalance =customer.account_balance;
	var custId = customer.userId;
	var updatedCustBalance = 0;
	
	var membership = true;
	
	
	//Constants for Debits
	var membershipFee = 20;
	var classFee =40;   //Example Class fee which will be obtained in advance (Connor)
	var calculatedClassFee; 
	
	//Constants for Credits
	var paymentName;   //What payment is for i.e. Class registration/ Membership etc
	var paymentAmount;
	
	
	
	/*TESTING AREA*****************************************************/
	//Build the DataTables Listing
	findTransactionsByCustomerId(custId)
	
	/*Run process without Button for test purposes*/
	
	//Get Latest Customer Balance
	//findCustBalanceById(2);
	
	
	/*
	//Update Customer Balance with Membership fee
	updateCustBalanceMember(custBalance, membershipFee);
	
	//Update Transaction logs for Membership fee
	console.log(customer);
	memberTransaction(customer,custBalance,updatedCustBalance);
	
	
	//Test Generate DataTables list for Customer with ID of 2
	findTransactionsByCustomerId(2);
	
	*/
	
	/*END TESTING AREA*****************************************************/
	
	
	

	
	/*BUTTONS ********************************************/
	
	// Membership button listener
	$('#btnMbr').on(
			'click',
			function(e) {
				alert("The btn Add Member was clicked.");
				e.preventDefault();
				//findCustBalanceById(custId);   //Get Customer current Balance
				name= "Membership Fee"; 
				MemberUpdateCustomerBalance(custBalance, membershipFee) //Business Logic Function for Membership Fee 
				console.log(updatedCustBalance);
				updateCustomerBalance(custId, updatedCustBalance); //Update Customer Balance first
				debitTransaction(custId, name, membershipFee, custBalance, updatedCustBalance); //Add Transaction to log
				
				return false;
			});
	
	
	// Register for Class button listener
	$('#btnClass').on(
			'click',
			function(e) {
				alert("The btn Class register was clicked.");
				e.preventDefault();
				findCustBalanceById(2);   //Get Customer current Balance
				name= "Class Registration";
				amount= calculatedClassFee; 
				debitTransaction(id, custBalance, updatedCustBalance, name, amount);
				updateCustomerBalance(custBalance, calculatedClassFee); //Update Customer Balance
				return false;
			});
	
	
	// Payment button listener
	$('#btnPay').on(
			'click',
			function(e) {
				alert("The btn Pay was clicked.");
				e.preventDefault();
				findCustBalanceById(2); //Get Customer current Balance
				creditTransaction(id, custBalance, updatedCustBalance);
				updateCustomerBalance(custBalance, membershipFee); //Update Customer Balance
				return false;
			});
	
	/*END BUTTONS ********************************************/
	
	
	/*BUSINESS LOGIC***************************************/
	
	//Update the Customer Balance for Membership
	function MemberUpdateCustomerBalance(custBalance, membershipFee){
		console.log('MemberUpdateCustomerBalance Function');
		updatedCustBalance = Number(custBalance) + Number(membershipFee);
		console.log('New Customer Balance: ' + updatedCustBalance);
	}
	
	
	//Calculate the class Fee
	function calculateClassFee(classFee, membership, custBalance, payfull){
		fullClassFee = classFee * 12;
		if (membership){
			fullClassFee =fullClassFee- 50; //€50 Discount on Membership
		}
		if (custBalance ==0){
			fullClassFee =fullClassFee- (fullClassFee * 0.1); //10% Discount on Clear Balance
		}
		if (payfull){
			fullClassFee =fullClassFee- (fullClassFee * 0.1); //10% Discount on Payment in Advance
		}
		calculatedClassFee = fullClassFee;
	}
	
	
	/*END BUSINESS LOGIC ***************************************/
	
	
	/*Data Retrieval********************************************/
	
	//Get the Customer Account Balance details        //Need to be able to pass data to Global Variable
	function findCustBalanceById(id) {
		console.log('findCustBalanceById: ' + id);
		$.ajax({
			type : 'GET',
			url : userURL + '/' + id,
			dataType : "json",
			async:false,
		
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
	
	
/*Post Debit Transaction to Transaction logs*/
function debitTransaction(customer, custBalance){
		console.log('POST debitTransaction');
		console.log('Updated balance is '+ updatedCustBalance);
		/*Post to Transaction Ledger*/
		$.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : transURL,
			dataType : "json",
			data : debitTransToJSON(custId, name, membershipFee, custBalance, updatedCustBalance),
			success : function(data, textStatus, jqXHR) {
				alert('Debit transaction added successfully');
				$('#btnMbr').hide();
				
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert('debitTransaciton log error: ' + textStatus);
			}
		});
		
}

/*Post Credit Transaction to Transaction logs*/
function creditTransaction(id, custBalance, updatedCustBalance){
		console.log('POST creditTransaction');
		console.log('Updated balance is '+ updatedCustBalance);
		/*Post to Transaction Ledger*/
		$.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : transURL,
			dataType : "json",
			data : creditTransToJSON(custId, name, amount, custBalance, updatedCustBalance),
			success : function(data, textStatus, jqXHR) {
				alert('Credit transaction added successfully');
				$('#btnMbr').hide();
				
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert('creditTransaciton log error: ' + textStatus);
			}
		});
		
}
		
/*Update Customer Balance for all types of Transactions*/
		
function updateCustomerBalance(custId, updatedCustBalance){
	console.log('updateCustomerBalance');
	$.ajax({
	type : 'PUT',
	contentType : 'application/json',
	
	url : userBalURL + '/' + custId + '/' + updatedCustBalance,
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
function debitTransToJSON(custId, name, amount) {
	console.log('debitTransTOJSON');
	console.log('User ID is '+ custId);
	var stringified = JSON.stringify({
		"user_id" : custId,
		"date" : '2020-03-03',
		"name" : name, //Need to set this Variable from HTML form, currently fixed
		"amount" : amount, //Need to set this Variable from HTML form, currently fixed
		"type" : 'DEBIT',
		"user_ob" : custBalance,
		"user_cb" : updatedCustBalance
	  
	});
	console.log(stringified);
	return stringified;
}

//JSON for Credit Transaction//
function creditTransToJSON(custId, name, amount) {
	console.log('creditTransTOJSON');
	console.log('User ID is '+ customer.userId);
	var stringified = JSON.stringify({
		"user_id" : custId,
		"date" : '2020-03-03',
		"name" : name, //Need to set this Variable
		"amount" : amount, //Need to set this Variable
		"type" : 'CREDIT',
		"user_ob" : custBalance,
		"user_cb" : updatedCustBalance
	  
	});
	console.log(stringified);
	return stringified;
}
/*END TRANSACTION LOGS REGION********************************************/



/*DATATABLES *************************************************************/


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
			    
			   
			    /*Build the DataTable*/
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

/*END DATATABLES *************************************************************/

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