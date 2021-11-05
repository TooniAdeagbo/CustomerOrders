//Server Connection
const MongoClient =require('mongodb').MongoClient;
//const assert  = require('//assert');
const connect = require("./connect");
const client = new MongoClient(connect.database.url, {useUnifiedTopology: true});
var cust=3;
//database name
const dbName = 'customers';

//use connect method to connect to server
client.connect(function(err){
    ////assert module for testing
    //assert.equal(null,err);
    console.log("Connected Succesfully");
    const db = client.db(dbName);

    insertCustomers(db, function() {});
 //   findCustomer(db, function() {});
    findCustomerFiltered(db, function() {});
    updateCustomer(db, function() {});
    removeCustomer(db, function() {});
    insertItem(db, function() {});
    findItem(db, function() {});
    updateItem(db, function() {});
    removeItem(db, function() {});
    insertOrder(db, function() {});
    findOrder(db, function() {});
    updateOrder(db, function() {});
    removeOrder(db, function() {
      client.close();
    });
});

//end of part one

const insertCustomers = function(db, callback) {
  // Using the "documents" collection
  const collection = db.collection('customerInfo');
  // Insert some documents
  collection.insertMany([
    {"CustomerID":1,
    "title":"Miss",
    "fname":"Tooni",
    "lname":"Adeagbo",
    "email":"tooni.adeagbo@tooniemail.ie",
    "mobile":"0849937354",
    "Home Address":{
        "AddressLine1":"123 RainyLane",
        "AddressLine2":"Aungier Street",
        "Town":"Dublin",
        "County":"Dublin",
        "Eircode":"D17 C456",
        },
    "Shipping Address":{
      "AddressLine1":"456 Industrial",
      "AddressLine2":"Figaro Street",
      "Town":"Dublin",
      "County":"Dublin",
      "Eircode":"L07 C456",
      }
    },
    {"CustomerID":2,
    "title":"Miss",
    "fname":"Marijana",
    "lname":"Markovich",
    "email":"marijana.markovich@mariemail.ie",
    "mobile":"0849574643",
    "Home Address":{
        "AddressLine1":"123 SunnyWalk",
        "AddressLine2":"Regal Bay",
        "Town":"Maynooth",
        "County":"Kildare",
        "Eircode":"K17 C456",
        },
    "Shipping Address":{
      "AddressLine1":"123 SunnyWalk",
      "AddressLine2":"Regal Bay",
      "Town":"Maynooth",
      "County":"Kildare",
      "Eircode":"K17 C456",
      }
    },
    {"CustomerID":3,
    "title":"Mr",
    "fname":"Paul",
    "lname":"Okuna",
    "email":"paul.okuna@paulemail.ie",
    "mobile":"08274324949",
    "Home Address":{
        "AddressLine1":"123 RainyLane",
        "AddressLine2":"Aungier Street",
        "Town":"Dublin",
        "County":"Dublin",
        "Eircode":"D17 C456",
        },
    "Shipping Address":{
      "AddressLine1":"123 RainyLane",
      "AddressLine2":"Aungier Street",
      "Town":"Dublin",
      "County":"Dublin",
      "Eircode":"D17 C456",
      }
    }
   
  ], function(err, result) {
    // using the //assert module for testing
  //  //assert.equal(err, null);
    ////assert.equal(3, result.result.n);
    ////assert.equal(3, result.ops.length);
    
    // all good if we get to here
    console.log("Inserted 3 documents into the collection");
  /*  console.log(insertMany.length);//get length; so we can randomise which one is printed out
   // var a = Math.floor(Math.random()*db.customerInfo.count())+1;
    if({CustomerID:1}){
console.log
    }*/
    
    callback(result)
  });
}//CREATE


/*const findCustomer = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('customerInfo');
  // Find some documents 
  collection.find({}).toArray(function(err, docs) {
    // using the //assert module for testing
    //assert.equal(err, null); 
    // all good if we get to here
    console.log("Found the following records");
    console.log(docs)
    callback(docs); 
  });
}*/
const findCustomerFiltered = function(db, callback) {
  // Get the documents collection
  var ran =Math.floor(Math.random()*cust)+1;
  const collection = db.collection('customerInfo');
  // Find some documents - with a filter
  collection.find({"CustomerID": ran}).toArray(function(err, docs) {
    // using the //assert module for testing
 //   //assert.equal(err, null);
    console.log("Found the following record");
    // all good if we get to here
    console.log(docs);
    callback(docs);
  });
} 
//RETRIEVE
const updateCustomer = function(db, callback) {
  // Get the documents collection
  var ran =Math.floor(Math.random()*cust)+1;
  console.log(ran);
  const collection = db.collection('customerInfo');
  // Update document where email is "alondra.dunne@purplemail.ie", set to "alondra.dunne@redmail.ie"
  collection.updateOne({CustomerID : ran }//i'm not sure if this works :/
    , { $set: { email :  "marijana.markovich8765@mariemail.ie" } }, function(err, result) {
    // using the //assert module for testing
  //  //assert.equal(err, null);
    ////assert.equal(1, result.result.n);
    // all good if we get to here
    console.log("Updated the document: reset email field set to marijana.markovich8765@mariemail.ie");
    callback(result);
  });  
  collection.updateOne({CustomerID : ran }//i'm not sure if this works :/
  , { $set: { title :  "Miss" } }, function(err, result) {
  // using the //assert module for testing
 // //assert.equal(err, null);
  ////assert.equal(1, result.result.n);
  // all good if we get to here
  console.log("Updated the document: reset email field set to marijana.markovich8765@mariemail.ie");
  callback(result);
}); 
collection.updateOne({CustomerID : ran }//i'm not sure if this works :/
, { $set: { phone :  "marijana.markovich8" } }, function(err, result) {
// using the //assert module for testing
//assert.equal(err, null);
//assert.equal(1, result.result.n);
// all good if we get to here
console.log("Updated the document: reset email field set to marijana.markovich8765@mariemail.ie");
callback(result);
}); 
}
//UPDATE
const removeCustomer = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('customerInfo');
  // Delete document where email is "alondra.dunne@redmail.ie"
  collection.deleteOne({ email : "marijana.markovich8765@mariemail.ie" }, function(err, result) {
    // using the //assert module for testing
    //assert.equal(err, null);
    //assert.equal(1, result.result.n);
    // all good if we get to here      
    console.log("Removed the document with email : 'marijana.markovich8765@mariemail.ie'");
    callback(result);
  });
}    
//REMOVE
const insertItem = function(db, callback) {
  // Using the "documents" collection
  const collection = db.collection('Items');
  // Insert some documents
  collection.insertMany([
    {"Manufacturer":"Samsung",
    "Model":"S10",
    "Price":1000
  
    },
    {"Manufacturer":"IPhone",
    "Model":"10",
    "Price":790
    },
    {"Manufacturer":"Huawei",
    "Model":"P30",
    "Price": 500
    }
   
  ], function(err, result) {
    // using the //assert module for testing
    //assert.equal(err, null);
    //assert.equal(3, result.result.n);
    //assert.equal(3, result.ops.length);
    
    // all good if we get to here
    console.log("Inserted 3 documents into the collection");
  /*  console.log(insertMany.length);//get length; so we can randomise which one is printed out
   // var a = Math.floor(Math.random()*db.customerInfo.count())+1;
    if({CustomerID:1}){
console.log
    }*/
    callback(result)
  });
}//CREATE
const findItem = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('Items');
  // Find some documents 
  collection.find({}).toArray(function(err, docs) {
    // using the //assert module for testing
    //assert.equal(err, null); 
    // all good if we get to here
    console.log("Found the following records");
    console.log(docs)
    callback(docs); 
  });
}
//RETRIEVE
const updateItem = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('Items');

  collection.updateOne({Model : "S10" }
    , { $set: { Model :  "S20" } }, function(err, result) {
    // using the //assert module for testing
    //assert.equal(err, null);
    //assert.equal(1, result.result.n);
    // all good if we get to here
    console.log("Updated the document: reset Model field set to S20");
    callback(result);
  });  
}
//UPDATE
const removeItem = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('Items');
  collection.deleteOne({ Model : "10" }, function(err, result) {
    // using the //assert module for testing
    //assert.equal(err, null);
    //assert.equal(1, result.result.n);
    // all good if we get to here      
    console.log("Removed the document with Model : '10'");
    callback(result);
  });
}    
//REMOVE
const insertOrder = function(db, callback) {
  const collection = db.collection('Orders');
  // Insert some documents
  collection.insertMany([
    {"Phone":"Samsung S10",
      "CustomerID":2,
      "Order No": 2
    },
    {"Phone":"Huwaei P30",
    "CustomerID":3,
    "Order No": 1
    },
    {"Phone":"IPhone 10",
    "CustomerID":1,
    "Order No": 5
    }
   
  ], function(err, result) {
    // using the //assert module for testing
    //assert.equal(err, null);
    //assert.equal(3, result.result.n);
    //assert.equal(3, result.ops.length);
    
    // all good if we get to here
    console.log("Inserted 3 documents into the collection");
  /*  console.log(insertMany.length);//get length; so we can randomise which one is printed out
   // var a = Math.floor(Math.random()*db.customerInfo.count())+1;
    if({CustomerID:1}){
console.log
    }*/
    callback(result)
  });
}//CREATE
const findOrder = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('Orders');
  // Find some documents 
  collection.find({}).toArray(function(err, docs) {
    // using the //assert module for testing
    //assert.equal(err, null); 
    // all good if we get to here
    console.log("Found the following records");
    console.log(docs)
    callback(docs); 
  });
}
//RETRIEVE
const updateOrder = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('Orders');

  collection.updateOne({Phone : "Samsung S10" }
    , { $set: { Phone :  "Samsung S20" } }, function(err, result) {
    // using the //assert module for testing
    //assert.equal(err, null);
    //assert.equal(1, result.result.n);
    // all good if we get to here
    console.log("Updated the document: reset Phone field set to Samsung S20");
    callback(result);
  });  
}
//UPDATE
const removeOrder = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('Orders');
  collection.deleteOne({ Phone : "IPhone 10" }, function(err, result) {
    // using the //assert module for testing
    //assert.equal(err, null);
    //assert.equal(1, result.result.n);
    // all good if we get to here      
    console.log("Removed the document with Phone : 'IPhone 10'");
    callback(result);
  });
}    
//REMOVE


//referenced jk code
/*$(document).ready(function (e){
  var http = require("http"); // creating an API using http
  var url = require("url"); // using url to extract the route (e.g. /, /api/user)
  var querystring = require("querystring"); // this will contain the body of the POST request
  var fs = require("fs"); // file handling to read the index.html served for / route
  var port = 8000; // port the server with listen on
  
  var server = http.createServer(); // create the server
  
  var userDatabase = []; // this is the in-memory database that holds the JSON records
  // supplied by the POST request via route /api/user
  
  // listen for requests from clients
  server.on("request", function (request, response) {
    var currentRoute = url.format(request.url); // get the route (/ or /api/user)
    var currentMethod = request.method; // get the HTTP request type (POST - Create; GET - Retrieve)
    var requestBody = ""; // will contain the extracted POST data later
    
  })
  });*/