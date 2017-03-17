var request = require('supertest');
var app = require('./app');

var redis = require('redis');
var client = redis.createClient();

client.select('test'.length);// so we don't accidentally mess with production ro developement database
client.flushdb();// this flushes the database making all info empty array

describe('Requests to the root path', function(){

    it('Returns a 200 status code', function(done) {

        request(app)
            .get('/')
            .expect(200, done);
   });

    it('Returns a HTML format', function(done){

      request(app)
        .get('/')
        .expect('Content-type', /html/, done);


    });

    it('Returns an index file with Cities', function(done){
      request(app)
        .get('/')
        .expect(/cities/i, done);
    });
});

describe('Listing cities on/cities', function(){

  it('Returns 200 status code', function(done){

    request(app)
        .get('/cities')
        .expect(200, done);


  });


  it('Returns JSON format', function(done){
    request(app)
      .get('/cities')
      .expect('Content-Type', /json/)
      .end(function(error){
        if(error) throw error;
        done();
      });
  });

  it('Returns initial cities', function(done){
    request(app)
      .get('/cities')
      .expect(JSON.stringify([]), //set to empty array instead of '['Lotopia', .. etc]' because of error.. see app.js.
          done);
  });

});

describe('Creating new cities', function (){

  it('Retuns a 201 status code', function(done){

    request(app)
      .post('/cities')
      .send('name=Springfield&description=where+the+simpsons+live')
      .expect(201, done);

  });

  it('Return the city name', function(done){
    request(app)
      .post('/cities')
      .send('name=Springfield&description=where+the+simpsons+live')
      .expect(/springfield/i, done);
  });
});
