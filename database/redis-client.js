const redis = require('redis');
const config = require('../config.js');  // Importing configuration settings.

// The Class for handling Redis operations.
class RedisClient {
    // Methof for establishing redis connection
    constructor() {
        const redisUrl = `${config['production'].database_url}:${config['production'].database_port}`;
        this.client = redis.createClient({
            url: redisUrl
        });
        this.client.on('connect', () => console.log('Redis client connected'));
        this.client.on('error', (err) => console.error('Redis Client Error', err));
        this.client.connect();

    }
    // Method to retrieve data from Redis using a cache key.
    async getData(cacheKey) {
        try {
            const data = await this.client.get(cacheKey);
            return JSON.parse(data); 
        } catch (err) {
            console.error('Failed to retrieve data from Redis:', err);
            throw err;
        }
    }
     // Method to save data to Redis with an optional time-to-live (TTL).

    async setData(cacheKey, data, ttl = 3600) {
        try {
            const jsonData = JSON.stringify(data);
            await this.client.set(cacheKey, jsonData, 'EX', ttl);
        } catch (err) {
            console.error('Failed to save data to Redis:', err);
            throw err;
        }
    }
    // Method to delete data from Redis using a cache key.
    async delData(cacheKey){
        try {
            await this.client.del(cacheKey);
        } catch (err) {
            console.error('Failed to delete data from Redis:', err);
            throw err;
        }
    }
}

module.exports = new RedisClient(); // Exporting an instance of the RedisClient.
