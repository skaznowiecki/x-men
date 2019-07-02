
const request = require('supertest');
const app = require('../../../app/app.js');


describe('GET /stats', function() {
    it('responds with status 200 ', function(done) {
        request(app)
            .get('/stats')
            .set('Content-Type', 'application/json')
            .expect(200, done);        
    });
}); 

