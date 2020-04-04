const Operation = require('src/app/Operation');
const isAuthorized = require('src/app/helpers/isAuthorized');

class GetUserByIdService extends Operation {
  constructor({ usersRepository }) {
    super();
    this.usersRepository = usersRepository;
  }

  async execute(userId, admitedRoles) {
    const { SUCCESS, NOT_FOUND, UNAUTHORIZED } = this.outputs;

    try {
      const user = await this.usersRepository.getById(userId);
      if(!isAuthorized(user, admitedRoles)) {
        this.emit(UNAUTHORIZED, {details: 'Unauthorized to access this resource'});
        return;
      }
      this.emit(SUCCESS, user);
    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

GetUserByIdService.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND', 'UNAUTHORIZED']);

module.exports = GetUserByIdService;
