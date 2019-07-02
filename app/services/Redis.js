let redis = require('redis');
const process = require('process');
let port = process.env.REDIS_PORT || 6379;  
let host = process.env.REDIS_HOST || '127.0.0.1';


module.exports = redis.createClient(port, host);