const Operation = require('src/app/Operation');
const isAuthorized = require('src/app/helpers/isAuthorized');

class GetUserByName extends Operation {
  constructor({ usersRepository }) {
    super();
    this.usersRepository = usersRepository;
  }

  async execute(name, admitedRoles) {
    const { SUCCESS, NOT_FOUND, UNAUTHORIZED} = this.outputs;

    try {
      const user = await this.usersRepository.getByName(name);
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

GetUserByName.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND', 'UNAUTHORIZED']);

module.exports = GetUserByName;
