
const _ = require('lodash');

const isAuthorized = (user, admitedRoles) => {
  if(!user) return false;

  return _.findIndex(admitedRoles, (r) => { return user.hasRole(r); }) > -1;
  
};

module.exports = isAuthorized;