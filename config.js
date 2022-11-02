const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  uris: process.env.MONGODB_URI,
//   masterKey: process.env.API_KEY,
  port: process.env.PORT
};