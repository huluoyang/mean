var express = require('express');
 var app = express();
 app.get('/foo', function (req, res) {
    res.send('hi');
 }); 
 // add a second foo route handler
 app.get('/foo', function (req, res) {
    res.send('hi2');
 });
 console.log('stack', app._router.stack);
 app.listen(3000);