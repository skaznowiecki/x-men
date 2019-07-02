const dummyData = require("../../stub/dna");

const request = require('supertest');
const app = require('../../../app/app.js');


describe('POST /mutant', function() {
    it('responds with status 200 given mutant sequence', function(done) {
        request(app)
            .post('/mutant/')
            .send({ dna : dummyData.mutant })
            .set('Content-Type', 'application/json')
            .expect(200, done);        
    });

    it('responds with status 403 given human sequence', function(done) {
        request(app)
            .post('/mutant/')
            .send({ dna : dummyData.human })
            .set('Content-Type', 'application/json')
            .expect(403, done);        
    });
});

