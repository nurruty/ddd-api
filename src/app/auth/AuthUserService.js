const Operation = require('src/app/Operation');

class AuthUserService extends Operation {
  constructor({ usersRepository }) {
    super();
    this.usersRepository = usersRepository;
  }

  async execute(userId, admitedRoles) {
    const { AUTHORIZED, NOT_AUTHORIZED } = this.outputs;

    try {
      const user = await this.usersRepository.getById(userId);
      admitedRoles.forEach(role => {
        if(user.hasRole(role)) this.emit(AUTHORIZED);
      }); 
      this.emit(NOT_AUTHORIZED);
    } catch(error) {
      this.emit(NOT_AUTHORIZED);
    }
  }
}

AuthUserService.setOutputs(['AUTHORIZED', 'NOT_AUTHORIZED']);

module.exports = AuthUserService;
