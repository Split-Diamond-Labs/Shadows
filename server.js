// Requiring modules
const express = require('express');
const app = express();
const mssql = require("mssql");

// Get request
app.get('/', function (req, res) {
 
    // Config your database credential
    const config = {
        user: 'LC',
        password: '',
        server: 'localhost',
        database: 'playerBase'
    };
 
    // Connect to your database
    mssql.connect(config, function (err) {
 
        // Create Request object to perform
        // query operation
        var request = new mssql.Request(mssql.connection);
 
        // Query to the database and get the records
        request.query('select * from players',
            function (err, records) {
 
                if (err) console.log(err)
 
                // Send records as a response
                // to browser
                res.send(records);
 
            });
    });
});
 
var server = app.listen(5000, function () {
    console.log('Server is listening at port 5000...');
});