var request = require('supertest');
var app = require('./app');


describe('REquests to the root path', function(){
    
    it('Returns a 200 status code', function(done) {

        request(app)
            .get('/')
            .expect(200)
            .end(function(error){
                if(error) throw error;
                console.log('Done');
            });
        done();
    });

});
