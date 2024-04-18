const config = {
    development: {
        Restaurant_URL: 'https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/',
        PORT:5000,
        database_url:'redis://localhost',
        database_port:6379
    },
    production: {
        Restaurant_URL: 'https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/',
        database_url:'redis://localhost',
        database_port:6379
    }
};

module.exports = config;
