const Operation = require('src/app/Operation');

class GetPoliciesUserService extends Operation {
  constructor({ policiesRepository }) {
    super();
    this.policiesRepository = policiesRepository;
  }

  async execute(userName) {
    const { SUCCESS, NOT_FOUND } = this.outputs;

    try {

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

GetPoliciesUserService.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = GetPoliciesUserService;
