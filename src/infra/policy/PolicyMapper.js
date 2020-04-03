const Policy = require('src/domain/policy/Policy');
const UserMapper = require('../user/UserMapper');

const PolicyMapper = {
  toEntity( dataValues ) {
    if(dataValues) {
      const { id, amountInsured, inceptionDate, installmentPayment, email, client } = dataValues;
      const clientEntity = UserMapper.toEntity(client);
      return new Policy({ id, amountInsured, inceptionDate, installmentPayment, email, client: clientEntity });
    }
    return {};
  },

  toDatabase() {
    // transaltion to database form if the was one
  }
};

module.exports = PolicyMapper;
