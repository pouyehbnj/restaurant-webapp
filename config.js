const config = {
    development: {
        Restaurant_URL: 'https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/',
        PORT: 5000,
        database_url: `redis://${process.env.REDIS_HOST}` || 'redis://localhost',
        database_port:  process.env.REDIS_PORT || 6379
    },
    production: {
        Restaurant_URL: 'https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/',
        database_url: `redis://${process.env.REDIS_HOST}` || 'redis://localhost',
        database_port: process.env.REDIS_PORT || 6379,
        PORT: 5000,
    }
};

module.exports = config;
