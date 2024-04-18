const redis = require('redis');
const { promisify } = require('util');
const config = require('../config'); // Ensure the path is correct for your project structure

class RedisClient {
    constructor() {
        this.client = redis.createClient({
            url: `${config['development'].database_url}:${config['development'].database_port}`
        });
        this.client.on('connect', () => console.log('Redis client connected'));
        this.client.on('error', (err) => console.error('Redis Client Error', err));
        this.client.connect();

        // // Promisifying the necessary Redis client methods
        // this.getAsync = promisify(this.client.get).bind(this.client);
        // this.setAsync = promisify(this.client.set).bind(this.client);
    }

    async getData(cacheKey) {
        try {
            const data = await this.client.get(cacheKey);
            return JSON.parse(data);  // Assuming data is stored as JSON
        } catch (err) {
            console.error('Failed to retrieve data from Redis:', err);
            throw err;
        }
    }

    async setData(cacheKey, data, ttl = 3600) {
        try {
            const jsonData = JSON.stringify(data);
            await this.client.set(cacheKey, jsonData, 'EX', ttl);
        } catch (err) {
            console.error('Failed to save data to Redis:', err);
            throw err;
        }
    }
}

module.exports = new RedisClient(); 
