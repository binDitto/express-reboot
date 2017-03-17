var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

//Redis connection

var redis = require('redis');

  // This portion is for heroku to correctly use Redis

if (process.env.REDISTOGO_URL){

  var rtg = require("url").parse(process.env.REDISTOGOL_URL);
  var client = redis.createCient(rtg.port, rtg.hostname);

  client.auth(rtg.auth.split(":")[1]);

} else {

  var client = redis.createClient();

}

  // end heroku helper

  client.select((process.env.NODE_ENV || 'development').length);

//end Redis Connection

//client.hset('cities', 'Hanoi', 'Place of wonders');
//client.hset('cities', 'Danang', 'Best place to live');
//client.hset('cities', 'Saigon', 'Pearl of Asia');
//
// ^ commented this out because it was doing the Error: expected '["Lotopia", .. etc]' from test.js
//
// var cities = {
//    'Hanoi': 'Place of magic',
//    'Danang': 'Caspers home?',
//    'Saigon': 'Pokemon town?'
//  };

app.use(express.static('public'));

app.get('/cities', function(request, response){
  client.hkeys('cities', function(error, cityNames){
    if(error) throw error;

    response.json(cityNames);
     //response.json(Object.keys(cities));
  });
});

app.post('/cities', parseUrlencoded, function(request, response){
  var newCity = request.body;
  // cities[newCity.name] = newCity.description;
  client.hset('cities', newCity.name, newCity.description, function(error){
  if(error) throw error;

  response.status(201).json(newCity.name);
 });
});

app.delete('/cities/:name', function(request, response){
  var cityName = request.params.name;
  delete cities[cityName];

});

module.exports = app;
