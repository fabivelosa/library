

// Paul Barry A00048299


	// The root URLs for the RESTful services

	
	var transURL = "http://localhost:8080/library/rest/transaction";
	var userURL = "http://localhost:8080/library/rest/user";
	var userBalURL = "http://localhost:8080/library/rest/user/balance";

	
	//Constants for Customer
	var customer;
	
	//Variables/Constants for Customers
	var custBalance;
	var customerId;
	
	var membership = true; //Fabi???
	var ageGroup = "standard";  //Maryanna???
	
	var updatedCustBalance = 0;
	 
	//Variables/Constants for Debits
	var membershipFee = 20;
	var walkinFeeStandard = 10;
	var walkinFeeDiscounted = 5;
	var walkinFeeApplied;
	
	//Variables/Constants for Classes
	var classFee;   
	var payfull = true;  
	
	var calculatedClassFee; 
	
	//Variables/Constants for Credits
	var paymentName = "Class Payment";   //What payment is for i.e. Class registration/ Membership/ Walkin etc (Fabi)?????
	var paymentAmount =10; //From Form done by (Fabi)?????
	
	
	
	/*INTEGRATION AREA*****************************************************/
	
	//Registration
	
	function classRegistration(custId, fee, paymentType){
	console.log('Inside classRegistration Function');
		//Locate Customer
	customer = findCustBalanceById(custId);
	custBalance =customer.account_balance;
	customerId = customer.userId;
	
	if(paymentType =="whole"){payfull = true	
	}else payfull = false;
	
	console.log('Customer' +customer);
	
	classFee = fee;
	console.log('classFee is '+classFee);
	name = "Class Registration";
	calculateClassFee(); 
	amount = calculatedClassFee;
	updatedCustBalance = Number(custBalance) + Number(calculatedClassFee);
	updateCustomerBalance(customerId, updatedCustBalance); //Update Customer Balance first
	debitTransaction(customerId, name, amount, custBalance, updatedCustBalance); //Add Transaction to log
	}
	
	//Membership
	
	function membershipRegistration(memberId){
		console.log('Inside membershipRegistration Function');
		//Locate Customer
	customer = findCustBalanceById(memberId);
	custBalance =customer.account_balance;
	customerId = customer.userId;
	
	name= "Membership Fee"; 
	amount = membershipFee;
	memberUpdateCustomerBalance(custBalance, membershipFee) //Business Logic Function for Membership Fee 
	console.log(updatedCustBalance);
	updateCustomerBalance(customerId, updatedCustBalance); //Update Customer Balance first
	debitTransaction(customerId, name, amount, custBalance, updatedCustBalance); //Add Transaction to log
	}
	
	//Payments
	
	function payment(custId, payName, amount){
		console.log('Inside payment Function');
		//Locate Customer
	customer = findCustBalanceById(custId);
	custBalance =customer.account_balance;
	customerId = customer.userId;
	
	paymentName = payName;
	paymentAmount = amount;
	paymentUpdateCustomerBalance();
	updateCustomerBalance(customerId, updatedCustBalance); //Update Customer Balance first
	creditTransaction(customerId, paymentName, paymentAmount, custBalance, updatedCustBalance); //Add Transaction to log
	
	
		
	}
	/*END INTEGRATION AREA*****************************************************/
	
	/*TESTING AREA*****************************************************/
	$(document).ready(function() {
	
	
	//Build the DataTables Listing
	//findTransactionsByCustomerId(custId)
	
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
	
	});
	

	
	/*BUTTONS ********************************************/
	
	// Membership button listener
	$('#btnMbr').on(
			'click',
			function(e) {
				alert("The btn Add Member was clicked.");
				e.preventDefault();
				//findCustBalanceById(custId);   //Get Customer current Balance
				name= "Membership Fee"; 
				amount = membershipFee;
				memberUpdateCustomerBalance(custBalance, membershipFee) //Business Logic Function for Membership Fee 
				console.log(updatedCustBalance);
				updateCustomerBalance(custId, updatedCustBalance); //Update Customer Balance first
				debitTransaction(custId, name, amount, custBalance, updatedCustBalance); //Add Transaction to log
				
				return false;
			});
	
	
	// Register for Class button listener
	$('#btnClass').on(
			'click',
			function(e) {
				alert("The btn Class register was clicked.");
				e.preventDefault();
				//findCustBalanceById(custId);   //Get Customer current Balance
				name = "Class Registration";
				calculateClassFee(); 
				amount = calculatedClassFee;
				updatedCustBalance = Number(custBalance) + Number(calculatedClassFee);
				updateCustomerBalance(custId, updatedCustBalance); //Update Customer Balance first
				debitTransaction(custId, name, amount, custBalance, updatedCustBalance); //Add Transaction to log
				return false;
			});
	
	
	// Payment button listener
	$('#btnPay').on(
			'click',
			function(e) {
				alert("The btn Pay was clicked.");
				e.preventDefault();
				//findCustBalanceById(custId);   //Get Customer current Balance
				name = paymentName;
				amount = paymentAmount;
				paymentUpdateCustomerBalance();
				updateCustomerBalance(custId, updatedCustBalance); //Update Customer Balance first
				creditTransaction(custId, name, amount, custBalance, updatedCustBalance); //Add Transaction to log
				return false;
			});
	
	// Walk-in button listener
	$('#btnWlk').on(
			'click',
			function(e) {
				alert("The btn Walkin Service was clicked.");
				e.preventDefault();
				//findCustBalanceById(custId);   //Get Customer current Balance
				name= "Walk-In Fee"; 
				walkinUpdateCustomerBalance(custBalance, walkinFeeApplied) //Business Logic Function for Walk-in Fee 
				console.log(updatedCustBalance);
				amount = walkinFeeApplied;
				updateCustomerBalance(custId, updatedCustBalance); //Update Customer Balance first
				debitTransaction(custId, name, amount, custBalance, updatedCustBalance); //Add Transaction to log
				
				return false;
			});
	
	/*END BUTTONS ********************************************/
	
	
	/*BUSINESS LOGIC***************************************/
	
	//Update the Customer Balance for Membership
	function memberUpdateCustomerBalance(custBalance, membershipFee){
		console.log('MemberUpdateCustomerBalance Function');
		updatedCustBalance = Number(custBalance) + Number(membershipFee);
		console.log('New Customer Balance: ' + updatedCustBalance);
	}
	
	//Update the Customer Balance for Walk-In Service
	function walkinUpdateCustomerBalance(){
		console.log('walkinUpdateCustomerBalance Function');
		if(ageGroup === "discounted"){
			updatedCustBalance = Number(custBalance) + Number(walkinFeeDiscounted);
			walkinFeeApplied = walkinFeeDiscounted;
		}else{
		updatedCustBalance = Number(custBalance) + Number(walkinFeeStandard);
		walkinFeeApplied = walkinFeeStandard;}
		
		console.log('New Customer Balance: ' + updatedCustBalance);
	}
	
	
	//Calculate the class Fee
	function calculateClassFee(){
		console.log('calculateClassFee');
		fullClassFee = classFee * 12;
		console.log('fullClassFee' +fullClassFee);
		if (membership){
			fullClassFee =fullClassFee - 50; //€50 Discount on Membership
			console.log('fullClassFee Membership Discount €50 ' +fullClassFee);
		}
		if (custBalance ==0){
			fullClassFee =fullClassFee - (fullClassFee * 0.1); //10% Discount on Clear Balance
			console.log('fullClassFee Clear Balance Discount 10% ' +fullClassFee);
		}
		if (payfull){
			fullClassFee =fullClassFee - (fullClassFee * 0.1); //10% Discount on Payment in Advance
			console.log('fullClassFee Pay in Advance Discount 10%' +fullClassFee);
		}
		calculatedClassFee = fullClassFee;
		console.log('calculated Class Fee is '+ calculatedClassFee );
	}
	
	
	//Update the Customer Balance after Payment
	function paymentUpdateCustomerBalance(){
		console.log('paymentUpdateCustomerBalance Function');
		updatedCustBalance = Number(custBalance) - Number(paymentAmount);
		console.log('New Customer Balance: ' + updatedCustBalance);
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
function debitTransaction(customerId, custBalance){
		console.log('POST debitTransaction');
		console.log('Updated balance is '+ updatedCustBalance);
		/*Post to Transaction Ledger*/
		$.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : transURL,
			dataType : "json",
			data : debitTransToJSON(customerId, name, amount, custBalance, updatedCustBalance),
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
function creditTransaction(custBalance){
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
function debitTransToJSON(customerId, name, amount) {
	console.log('debitTransTOJSON');
	console.log('User ID is '+ customerId);
	var stringified = JSON.stringify({
		"user_id" : customerId,
		/*"date" : '2020-03-03',*/
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
	console.log('User ID is '+ custId);
	var stringified = JSON.stringify({
		"user_id" : custId,
		/*"date" : '2020-03-03',*/
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

			    
			   
			    /*Build the DataTable*/
			    $.each(data,function (index, transaction) {
			    	console.log('Building DataTable')
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
	
		
