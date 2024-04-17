const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;
app.use(express.static('client/build'));

app.get('/api/restaurants/:postcode', async (req, res) => {
    const { postcode } = req.params;
    const { page = 0, sort = 'rating' } = req.query;
    const limit = 10; // Fixed limit per page
    const url = `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`;
    console.log("pstcode:",postcode)
    console.log("page numbr:",page)
    console.log("sort:",sort)
    try {
        const response = await axios.get(url);
        let restaurants = response.data.restaurants.map(restaurant => ({
            name: restaurant.name,
            cuisines: restaurant.cuisines.map(cuisine => cuisine.name).join(', '),
            rating: restaurant.rating.starRating,
            // isOpen: restaurant.availability.delivery.isOpen,
            distance:restaurant.driveDistanceMeters,
            address: `${restaurant.address.firstLine}, ${restaurant.address.city}, ${restaurant.address.postalCode}`
        }));

        
        if (sort === 'rating') {
            restaurants.sort((a, b) => b.rating - a.rating);
        } else if (sort == 'distance'){
            restaurants.sort((a, b) => a.distance - b.distance);
        }
       
        const start = page * limit;
        const paginatedItems = restaurants.slice(start, start + limit);
        // Sorting based on the query parameter
        
        res.json({ restaurants: paginatedItems, total: response.data.restaurants.length });
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
