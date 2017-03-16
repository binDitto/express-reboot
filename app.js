var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

app.use(express.static('public'));

app.get('/cities', function(request, response){
  var cities = ['Lotopia', 'Caspiana', 'Indigo'];
  response.json(cities);
});

app.post('/cities', parseUrlencoded, function(request, response){
 var newCity = request.body;
 cities[newCity.name] = newCity.description;

 response.status(201).json(newCity.name);
});

app.delete('/cities/:name', function(request, response){
  var cityName = request.params.name;
  delete cities[cityName];

});

module.exports = app;
