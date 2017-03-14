var express = require('express');
var app = express();

app.get('/', function(request, response){
    response.send('OK');
});

app.listen(3000, function(){
    console.log("Listening on PORT 3000");
});
