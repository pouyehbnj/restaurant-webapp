// Importing necessary Node.js modules.
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

// Importing local utility functions and classes
const RestaurantUtils = require('./utilities/processing/restaurant-utils.js');
const Validator = require('./utilities/validation/validation-utils.js')
const config = require('./config.js');
const redis = require('./database/redis-client.js');

// Creating server and Configuring CORS middleware to allow requests from specified origins
const app = express();
app.use(cors({
    origin:  ['http://localhost','http://frontend','http://localhost:80','http://frontend:80']
  }));

// Extracting the server port and API base URL from configuration.  
const PORT = config['development'].PORT;
const Restaurant_URL = config['development'].Restaurant_URL;

// Serving static files from the 'client/build' directory.
app.use(express.static('client/build'));

// Route for fetching restaurant data based on a postcode.
app.get('/api/restaurants/:postcode', async (req, res) => {
    const { postcode } = req.params;

     // Validating the postcode.
    if (Validator.isValidUKPostcode(postcode)) {
        const { page = 0, sort = 'rating', isOpen = null, cuisine = null } = req.query;
        let restaurants = []
        const restaurn_url = (`${Restaurant_URL}${postcode}`);
        const cacheKey = `restaurants-${postcode.toLowerCase()}`;
        

        try {
            // Attempting to retrieve restaurant data from cache.
            const cachedData = await redis.getData(cacheKey)

            if (cachedData) {
                restaurants = JSON.parse(cachedData);
            } else {
            
             // Data not in cache, fetch from external API
                const response = await axios.get(restaurn_url);
                restaurants = response.data.restaurants.map(restaurant => ({
                    name: restaurant.name,
                    cuisines: restaurant.cuisines.map(cuisine => cuisine.name).join(', '),
                    rating: restaurant.rating.starRating,
                    logoUrl: restaurant.logoUrl,
                    open: restaurant.isOpenNowForCollection,
                    distance: restaurant.driveDistanceMeters,
                    address: `${restaurant.address.firstLine}, ${restaurant.address.city}, ${restaurant.address.postalCode}`,
                    coordinates: restaurant.address.location.coordinates
                }));

               // Saving the fetched data to cache.
                await redis.setData(cacheKey, JSON.stringify(restaurants));
            }

           // Applying filters and sorting to the restaurant data.

            if (isOpen !== null || cuisine !== null) {
                restaurants = RestaurantUtils.filterRestaurants(restaurants, { isOpen, cuisine });
            }
            restaurants = RestaurantUtils.sortRestaurants(restaurants, sort);
            const paginatedItems = RestaurantUtils.paginateRestaurants(restaurants, page, 10);
            // Sending the final processed data as a JSON response.
            res.json({ restaurants: paginatedItems, total: restaurants.length });

        } catch (error) {
            console.error('Error processing request:', error);
            res.status(500).send('Error fetching restaurant data');
        }
    }else{
        res.status(400).send('Incorrect poscode format');
    }
});
// Route to serve the frontend application from any other path.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
// Starting the server.
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
module.exports = app;