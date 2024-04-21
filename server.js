const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const RestaurantUtils = require('./utilities/processing/restaurant-utils.js');
const Validator = require('./utilities/validation/validation-utils.js')
const config = require('./config.js');
const redis = require('./database/redis-client.js');
const app = express();

app.use(cors({
    origin:  ['http://localhost','http://frontend','http://localhost:80','http://frontend:80']
  }));
const PORT = config['development'].PORT;
const Restaurant_URL = config['development'].Restaurant_URL;
app.use(express.static('client/build'));

app.get('/api/restaurants/:postcode', async (req, res) => {
    const { postcode } = req.params;
    console.log(postcode)
    if (Validator.isValidUKPostcode(postcode)) {
        const { page = 0, sort = 'rating', isOpen = null, cuisine = null } = req.query;
        const limit = 10;
        let restaurants = []
        const restaurn_url = (`${Restaurant_URL}${postcode}`);
        const cacheKey = `restaurants-${postcode.toLowerCase()}`;
        console.log("pstcode:", postcode);
        console.log("page numbr:", page);
        console.log("sort:", sort);

        try {
            // Attempt to get data from cache
            console.log("here?")
            const cachedData = await redis.getData(cacheKey)
            // const cachedData =  getAsync(cacheKey).catch(err=>{
            //     console.log(err)
            //     throw new Error("Redis retrieval failed");
            // });

            if (cachedData) {
                console.log('Using cached data');
                restaurants = JSON.parse(cachedData);
            } else {
                console.log("data from JET API")
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
                // console.log(restaurants)
                // Save to cache
                await redis.setData(cacheKey, JSON.stringify(restaurants));
                // await setAsync(cacheKey, JSON.stringify(restaurants), 'EX', 3600);
            }
            // console.log("restaurants in the end:", restaurants)
            // Apply filters and sorting
            if (isOpen !== null || cuisine !== null) {
                restaurants = RestaurantUtils.filterRestaurants(restaurants, { isOpen, cuisine });
            }
            restaurants = RestaurantUtils.sortRestaurants(restaurants, sort);
            const paginatedItems = RestaurantUtils.paginateRestaurants(restaurants, page, 10);
        
            res.json({ restaurants: paginatedItems, total: restaurants.length });
        } catch (error) {
            console.error('Error processing request:', error);
            res.status(500).send('Error fetching restaurant data');
        }
    }else{
        console.log("test")
        res.status(400).send('Incorrect poscode format');
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
// if (require.main === module) {
//     app.listen(PORT, () => {
//         console.log(`Server running on http://localhost:${PORT}`);
//     });
// }
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
module.exports = app;