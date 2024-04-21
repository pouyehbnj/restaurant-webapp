const request = require('supertest');
const expect = require('chai').expect;
const app = require('../server.js'); 
const redis = require('../database/redis-client.js');



describe('GET /api/restaurants/:postcode', function() {

  // Testing the service functionality given a correct input 
  it('should return restaurants data when given a valid postcode', async function() {
    const postcode = 'NE97TY';
    const response = await request(app)
      .get(`/api/restaurants/${postcode}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).to.be.an('object');
    expect(response.body.restaurants).to.be.an('array').that.is.not.empty;
    await redis.delData('restaurants-NE97TY');
  });

  // Testing the service functionality given an invalid input 

  it('should handle invalid postcode formats', async function() {
    const postcode = 'INVALID';
    const response = await request(app)
      .get(`/api/restaurants/${postcode}`)
      .expect(400);

    expect(response.text).to.equal('Incorrect poscode format');
  });

   // Testing the service functionality for sorting,pagination and filtering

  it('should handle results with different queries', async function() {
    const postcode = 'L40TH';
    const response = await request(app)
      .get(`/api/restaurants/${postcode}?page=0&sort=distance&isOpen=true&cuisine=Indian`)
      .expect(200);

    expect(response.body.restaurants).to.be.an('array');
    await redis.delData('restaurants-L40TH');
  });

});
