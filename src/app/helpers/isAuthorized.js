

const isAuthorized = (user, admitedRoles) => {
  if(!user) return false;

  for(let i = 0; i < admitedRoles.length; i++){
    if(user.hasRole(admitedRoles[i])) {
      return true;
    } 
  }
  return false;
};

module.exports = isAuthorized;