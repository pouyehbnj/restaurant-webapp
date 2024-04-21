const request = require('supertest');
const expect = require('chai').expect;
const app = require('../server.js'); 
const redis = require('../database/redis-client.js');

// Mock data and functions
// const mockData = [
//   {
//     name: "The Stone Trough",
//     cuisines: ["Burgers", "Pizza", "Collect stamps", "Deals"],
//     rating: 5,
//     logoUrl: "http://d30v2pzvrfyzpo.cloudfront.net/uk/images/restaurants/138062.gif",
//     open: true,
//     distance: 1078,
//     address: "774 Durham Road, Gateshead, NE9 7TA",
//     coordinates: [-1.594932,54.926138]
//   }
// ];

describe('GET /api/restaurants/:postcode', function() {
  
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

  it('should handle invalid postcode formats', async function() {
    const postcode = 'INVALID';
    const response = await request(app)
      .get(`/api/restaurants/${postcode}`)
      .expect(400);

    expect(response.text).to.equal('Incorrect poscode format');
  });

  it('should handle results with different queries', async function() {
    const postcode = 'L40TH';
    const response = await request(app)
      .get(`/api/restaurants/${postcode}?page=0&sort=distance&isOpen=true&cuisine=Indian`)
      .expect(200);

    expect(response.body.restaurants).to.be.an('array');
    await redis.delData('restaurants-L40TH');
  });

});
