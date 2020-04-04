const { attributes } = require('structure');

const User = attributes({
  id: String,
  name: String,
  email: String,
  role: String
})(class User {

  hasRole(role) {
    return this.role === role;
  }
  
  getRole() {
    return this.role;
  }

});


module.exports = User;
