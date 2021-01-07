const Closeio = require('close.io');

const closeio = new Closeio(process.env.CLOSE_API_KEY, parseInt(process.env.CLOSE_TIMEZONE_OFFSET, 10));

module.exports = closeio;