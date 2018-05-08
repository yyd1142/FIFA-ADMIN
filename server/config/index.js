const development = require('./development');
const production = require('./production');

const NODE_ENV = process.env.NODE_ENV || 'development';
module.exports = NODE_ENV === 'development' ? development : production;