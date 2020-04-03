const path = require('path');
const logPath = path.join(__dirname, '../../logs/development.log');

module.exports = {
  web: {
    port: 8080,
    jwt_secret: 'dev-secret',
    jwt_lifetime: 1000,
    //jwt_algoritm
    bcrypt_rounds: 5
  },
  logging: {
    appenders: [
      { type: 'console' },
      { type: 'file', filename: logPath }
    ]
  }
};
