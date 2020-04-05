const Operation = require('src/app/Operation');
const isAuthorized = require('src/app/helpers/isAuthorized');

class GetPoliciesUserService extends Operation {
  constructor({ policiesRepository, usersRepository }) {
    super();
    this.policiesRepository = policiesRepository;
    this.usersRepository = usersRepository;
  }

  async execute(policyId, admitedRoles) {
    const { SUCCESS, NOT_FOUND, UNAUTHORIZED } = this.outputs;

    try {
      const policy = await this.policiesRepository.getById(policyId);
      const user = await this.usersRepository.getById(policy.clientId);
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

GetPoliciesUserService.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND', 'UNAUTHORIZED']);

module.exports = GetPoliciesUserService;
