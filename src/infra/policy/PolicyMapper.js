const Policy = require('src/domain/policy/Policy');

const PolicyMapper = {
  toEntity( dataValues ) {
    if(dataValues) {
      const { id, amountInsured, inceptionDate, installmentPayment, email, clientId } = dataValues;
      return new Policy({ id, amountInsured, inceptionDate, installmentPayment, email, clientId });
    }
    return {};
  },

  toDatabase() {
    // transaltion to database form if the was one
  }
};

module.exports = PolicyMapper;
