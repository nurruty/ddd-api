const UserSerializer = {
  serialize({ id, name, email, role }) {
    return {
      id,
      name,
      email,
      role
    };
  }
};

module.exports = UserSerializer;
