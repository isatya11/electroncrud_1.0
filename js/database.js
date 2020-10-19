// Initialize the database
var Datastore = require('nedb');
db = new Datastore({ filename: 'db/persons.db', autoload: true });

// Adds a person
exports.addPerson = function(emp_id,firstname,lastname,email,gender,dob,mobile,address1,address2,pincode,countrycode) {

  // Create the person object
  var person = {
    "_id": parseInt(emp_id),
    "firstname": firstname,
    "lastname": lastname,
    "email": email,
    "gender":gender,
    "dob":dob,
    "mobile":mobile,
    "address1":address1,
    "address2":address2,
    "pincode":pincode,
    "countrycode":countrycode
  };

  // Save the person to the database
  db.insert(person, function(err, newDoc) {
    // Do nothing
  });
};

// Returns all persons
exports.getPersons = function(fnc) {

  // Get all persons from the database
  db.find({}, function(err, docs) {

    // Execute the parameter function
    fnc(docs);
  });
}

exports.updatePerson = function(id){
  db.findOne({ _id: parseInt(id) }, function (err, docs) {
    // docs contains Mars and Earth
    console.log(docs.firstname);
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

    emp_id.value=docs._id
    firstname.value = docs.firstname
    lastname.value = docs.lastname  
    email.value= docs.email
    gender.value = docs.gender
    dob.value = docs.dob
    mobile.value = docs.mobile
    address1.value = docs.address1
    address2.value = docs.address2
    pincode.value = docs.pincode
    countrycode.value = docs.countrycode
  });
  // db.update({_id:id}, { planet: 'Pluton'}, {}, function (err, numReplaced) {
    // numReplaced = 1
    // The doc #3 has been replaced by { _id: 'id3', planet: 'Pluton' }
    // Note that the _id is kept unchanged, and the document has been replaced
    // (the 'system' and inhabited fields are not here anymore)
  // });
}
// Deletes a person
exports.deletePerson = function(id) {
  db.remove({ _id: parseInt(id) }, {}, function(err, numRemoved) {
    // Do nothing
    console.log(numRemoved);
  });
}
