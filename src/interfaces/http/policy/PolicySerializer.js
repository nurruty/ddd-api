const PolicySerializer = {
  serialize({ id, amountInsured, inceptionDate, installmentPayment, email, client }) {
    return {
      id,
      amountInsured,
      inceptionDate,
      email,
      installmentPayment,
      client
    };
  }
};

module.exports = PolicySerializer;
