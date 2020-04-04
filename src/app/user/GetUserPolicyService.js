const Operation = require('src/app/Operation');

class GetPoliciesUserService extends Operation {
  constructor({ policiesRepository }) {
    super();
    this.policiesRepository = policiesRepository;
  }

  async execute(policyId) {
    const { SUCCESS, NOT_FOUND } = this.outputs;

    try {

      const policy = await this.policiesRepository.getById(policyId);
      const user = policy.client;
      this.emit(SUCCESS, user);
    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

GetPoliciesUserService.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = GetPoliciesUserService;
