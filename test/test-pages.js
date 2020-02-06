var expect  = require('chai').expect;
var request = require('request');

//this tests that the page gives us a 200 response.
it('Main page status', function(done) {
    request('https://rawbarbershop.herokuapp.com/home' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});



