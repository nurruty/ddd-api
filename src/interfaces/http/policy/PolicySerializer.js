const PolicySerializer = {
  serialize({ id, amountInsured, inceptionDate, installmentPayment, email, clientId }) {
    return {
      id,
      amountInsured,
      inceptionDate,
      email,
      installmentPayment,
      clientId
    };
  }
};

module.exports = PolicySerializer;
