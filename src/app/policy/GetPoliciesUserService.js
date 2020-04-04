const Operation = require('src/app/Operation');
const isAuthorized = require('src/app/helpers/isAuthorized');

class GetPoliciesUserService extends Operation {
  constructor({ policiesRepository, usersRepository }) {
    super();
    this.policiesRepository = policiesRepository;
    this.usersRepository = usersRepository;
  }

  async execute(userName, admitedRoles) {
    const { SUCCESS, NOT_FOUND, UNAUTHORIZED } = this.outputs;

    try {
      const user = await this.usersRepository.getByName(userName);
      if(!isAuthorized(user, admitedRoles)) {
        this.emit(UNAUTHORIZED, {details: 'Unauthorized to access this resource'});
        return;
      }
      const policies = await this.policiesRepository.getByUser(userName);
      this.emit(SUCCESS, policies);
    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

GetPoliciesUserService.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND', 'UNAUTHORIZED']);

module.exports = GetPoliciesUserService;
