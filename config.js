const config = {
    development: {
        Restaurant_URL: 'https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/',
        PORT:5000
    },
    production: {
        Restaurant_URL: 'https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/'
    }
};

module.exports = config;
