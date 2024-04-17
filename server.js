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
    const url = `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`;

    try {
        const response = await axios.get(url);
        const restaurants = response.data.restaurants.map(restaurant => ({
            name: restaurant.name,
            cuisines: restaurant.cuisines.map(cuisine => cuisine.name).join(', '),
            rating: restaurant.rating.starRating,
            address: `${restaurant.address.firstLine}, ${restaurant.address.city}, ${restaurant.address.postalCode}`
        })).slice(0, 10);;
        res.json(restaurants);
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
