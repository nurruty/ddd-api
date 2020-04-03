module.exports = {
  web: {
    port: process.env.PORT,
    jwt_secret: process.env.JWT_SECRET,
    jwt_lifetime: process.env.JWT_LIFETIME,
    bcrypt_rounds: 5
  },
  logging: {
    appenders: [
      { type: 'console', layout: { type: 'basic' } }
    ]
  }
};
