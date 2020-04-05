const { attributes } = require('structure');

const User = attributes({
  id: String,
  name: String,
  email: String,
  role: String
})(class User {

  getId(){
    return this.id;
  }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }

  getRole() {
    return this.role;
  }

  hasRole(role) {
    return this.role === role;
  }

});


module.exports = User;
