const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const RestaurantUtils = require('./utilities/restaurantUtils'); 
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;
app.use(express.static('client/build'));

app.get('/api/restaurants/:postcode', async (req, res) => {
    const { postcode } = req.params;
    const { page = 0, sort = 'rating', isOpen = null , cuisine= null } = req.query;
    const limit = 10; // Fixed limit per page
    const url = `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`;
    console.log("pstcode:",postcode);
    console.log("page numbr:",page);
    console.log("sort:",sort);
    if(isOpen){
        console.log("open:",isOpen);
    }
    if(cuisine){
        console.log("cuisine:",cuisine);
    }
    try {
        const response = await axios.get(url);
        let restaurants = response.data.restaurants.map(restaurant => ({
            name: restaurant.name,
            cuisines: restaurant.cuisines.map(cuisine => cuisine.name).join(', '),
            rating: restaurant.rating.starRating,
            logoUrl: restaurant.logoUrl, 
            open: restaurant.isOpenNowForCollection,
            distance:restaurant.driveDistanceMeters,
            address: `${restaurant.address.firstLine}, ${restaurant.address.city}, ${restaurant.address.postalCode}`,
            coordinates: restaurant.address.location.coordinates
        }));

        // console.log(restaurants)
        // if (sort === 'rating') {
        //     restaurants.sort((a, b) => b.rating - a.rating);
        // } else if (sort == 'distance'){
        //     restaurants.sort((a, b) => a.distance - b.distance);
        // }
       
        // const start = page * limit;
        // const paginatedItems = restaurants.slice(start, start + limit);
        // Sorting based on the query parameter
        restaurants = RestaurantUtils.filterRestaurants(restaurants, { isOpen, cuisine });
       
        restaurants = RestaurantUtils.sortRestaurants(restaurants, sort);
        const paginatedItems = RestaurantUtils.paginateRestaurants(restaurants, page, limit);
        
        res.json({ restaurants: paginatedItems, total: restaurants.length });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching restaurant data');
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
