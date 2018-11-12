var express = require('express')
var app = express()
 
app.get('/', function (req, res) {
  res.send('IT WORKS!')
})

app.get('/contact', function (req, res) {
    res.send('This is the contact page')
  })










 
app.listen('3000', function(err){
    if(err){
        console.log("Couldn't connect to the server");
        
    }
    console.log("Server is running on port 3000");
    
})