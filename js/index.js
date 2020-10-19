
const database = require('./js/database');
var update = true;

window.onload = function() {

  var app = new Vue({
    el: '#app',
    data:{
      product: 'Welcome to Employee Portal',
    },
  })
  console.log(update);
  var upd = new Vue({
    el: '#btn',
    data:{
      update: update
    }
  })
  // Populate the table
  populateTable();

  // Add the add button click event
  document.getElementById('add').addEventListener('click', () => {
    console.log("Entered add click evetn");
    // Retrieve the input fields
    var emp_id = document.getElementById('emp_id');
    var firstname = document.getElementById('firstname');
    var lastname = document.getElementById('lastname');
    var email = document.getElementById('email');
    var gender = document.getElementById('gender');
    var dob = document.getElementById('dob');
    var mobile = document.getElementById('mobile');
    var address1 = document.getElementById('address1');
    var address2 = document.getElementById('address2');
    var pincode = document.getElementById('pincode');
    var countrycode = document.getElementById('countrycode');

    // Save the person in the database
    database.addPerson(emp_id.value,
      firstname.value, 
      lastname.value,
      email.value,
      gender.value,
      dob.value,
      mobile.value,
      address1.value,
      address2.value,
      pincode.value,
      countrycode.value
      );

    // Reset the input fields
    emp_id.value=''
    firstname.value = '';
    lastname.value = '';
    email.value='';
    gender.value = '';
    dob.value = '';
    mobile.value = '';
    address1.value = '';
    address2.value = '';
    pincode.value 
    countrycode.value = '';

    // Repopulate the table
    populateTable();
  });

  document.getElementById('update').addEventListener('click', () => {
    
    console.log("Entered update click event");
    // Retrieve the updated input fields
    var emp_id = document.getElementById('emp_id');
    var firstname = document.getElementById('firstname');
    var lastname = document.getElementById('lastname');
    var email = document.getElementById('email');
    var gender = document.getElementById('gender');
    var dob = document.getElementById('dob');
    var mobile = document.getElementById('mobile');
    var address1 = document.getElementById('address1');
    var address2 = document.getElementById('address2');
    var pincode = document.getElementById('pincode');
    var countrycode = document.getElementById('countrycode');
    console.log (typeof(emp_id.value));

    db.update({ _id: parseInt(emp_id.value) }, { $set: 
      { 
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        gender: gender.value,
        dob: dob.value,
        mobile: mobile.value,
        address1: address1.value,
        address2: address2.value,
        pincode: pincode.value,
        countrycode: countrycode.value
      } }, { multi: true }, function (err, numReplaced) {
      console.log(numReplaced);
    });

    // database.deletePerson(emp_id.value);
    populateTable();

    // database.addPerson(emp_id.value,
    //   firstname.value, 
    //   lastname.value,
    //   email.value,
    //   gender.value,
    //   dob.value,
    //   mobile.value,
    //   address1.value,
    //   address2.value,
    //   pincode.value,
    //   countrycode.value
    //   );
    // populateTable();

    // Reset the input fields
    emp_id.value=''
    firstname.value = '';
    lastname.value = '';
    email.value='';
    gender.value = '';
    dob.value = '';
    mobile.value = '';
    address1.value = '';
    address2.value = '';
    pincode.value = '';
    countrycode.value = '';


    // db.find({_id:parseInt(emp_id)}, function(err,docs){
      // if(err){
      //   console.log("Employee must be added first");
      // }
      // else{
      // db.update({_id:parseInt(emp_id)},{lastname:'Bhasin'},{},function(err,numReplaced){
      //   console.log(numReplaced);
      // });
      // }
      //   db.update({_id:parseInt(emp_id)}, {
      //     firstname:firstname, 
      //     lastname:lastname,
      //     email: email,
      //     gender: gender,
      //     dob: dob,
      //     mobible: mobile,
      //     address1: address1,
      //     address2: address2,
      //     pincode:pincode,
      //     countrycode:countrycode
      //   }, {}, function (err, numReplaced) {
      //     if(err)
      //     {
      //       console.log(err);
      //     }
      //   console.log("Employee with id: "+ numReplaced+" is updated")  
      //   });
      // }
    // });
  });

  populateTable();
}  
function populateTable() {

  // Retrieve the persons
  database.getPersons(function(persons) {

    // Generate the table body
    var tableBody = '';
    for (i = 0; i < persons.length; i++) {
      tableBody += '<tr>';
      tableBody += '  <td>' + persons[i]._id + '</td>';
      tableBody += '  <td>' + persons[i].firstname + '</td>';
      tableBody += '  <td>' + persons[i].lastname + '</td>';
      tableBody += '  <td>' + persons[i].email + '</td>';
      tableBody += '  <td>' + persons[i].gender + '</td>';
      tableBody += '  <td>' + persons[i].dob + '</td>';
      tableBody += '  <td>' + persons[i].mobile + '</td>';
      tableBody += '  <td>' + persons[i].address1 + '</td>';
      tableBody += '  <td>' + persons[i].address2 + '</td>';
      tableBody += '  <td>' + persons[i].pincode + '</td>';
      tableBody += '  <td>' + persons[i].countrycode + '</td>';
      tableBody += '  <td><input type="button" value="Delete" onclick="deletePerson(\'' + persons[i]._id + '\')"></td>'
      tableBody += '  <td><input type="button" value="Update" onclick="updatePerson(\'' + persons[i]._id + '\')"></td>'
      tableBody += '</tr>';
    }

    // Fill the table content
    document.getElementById('tablebody').innerHTML = tableBody;
  });
}

// Deletes a person
function deletePerson(id) {

  // Delete the person from the database
  database.deletePerson(id);

  // Repopulate the table
  populateTable();
}
function updatePerson(id) {
  update=true;
  console.log(update);
  // update the person from the database
  database.updatePerson(id);
  // Repopulate the table
  populateTable();
}