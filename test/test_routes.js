var expect = require('chai').expect;
var request = require('superagent');

describe('Router GET Testing', function() {
    it('signin Tesing', function(done) {
        request
            .post('http://localhost:3000/student/signin')
            .type('application/json')
            .send({username: 'wyc', password: '123'})
            .end(function(err, res) {
                expect(res.body.code).to.equal(1);
                done();
            })
    });
});