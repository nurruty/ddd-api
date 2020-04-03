const User = require('src/domain/user/User');

const UserMapper = {
  toEntity( dataValues ) {
    if(dataValues) {
      const { id, name, email, role } = dataValues;
      return new User({ id, name, email, role });
    }
    return {};
  },

  toDatabase() {
    // transaltion to database form if the was one
  }
};

module.exports = UserMapper;
