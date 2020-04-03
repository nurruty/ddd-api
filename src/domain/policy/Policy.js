const { attributes } = require('structure');
const User = require('../user/User');

const Policy = attributes({
  id: String,
  amountInsured: Number,
  inceptionDate: Date,
  email: String,
  installmentPayment: Boolean,
  client: User
})(class Policy {
  
  setClient(client) {
    this.client = client;
  }

});


module.exports = Policy;
