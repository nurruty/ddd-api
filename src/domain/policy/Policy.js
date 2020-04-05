const { attributes } = require('structure');

const Policy = attributes({
  id: String,
  amountInsured: Number,
  inceptionDate: Date,
  email: String,
  installmentPayment: Boolean,
  clientId: String
})(class Policy {
  
  getId(){
    return this.id;
  }

  getAmountInsured(){
    return this.amountInsured;
  }

  getEmail(){
    return this.email;
  }

  getInstallmentPayment() {
    return this.installmentPayment;
  }

  getClientId() {
    return this.clientId;
  }

});


module.exports = Policy;
