const { expect } = require('chai');
const GetUserPolicyService = require('src/app/user/GetUserPolicyService');

describe('App :: User :: GetUserPolicyService', () => {
  let getUserPolicyService;

  context('when policy exists', () => {
    beforeEach(() => {
      const MockPoliciesRepository = {
        getById: (policyId) => Promise.resolve({
          id: policyId,
          client: {
            id: 'abc',
            name: 'The Client'
          }
        })
      };

      getUserPolicyService = new GetUserPolicyService({
        policiesRepository: MockPoliciesRepository
      });
    });

    it('emits SUCCESS with the user', (done) => {
      getUserPolicyService.on(getUserPolicyService.outputs.SUCCESS, (user) => {
        expect(user.name).to.equal('The Client');
        done();
      });

      getUserPolicyService.execute('abc');
    });
  });

  context('when policy does not exist', () => {
    beforeEach(() => {
      const MockPoliciesRepository = {
        getById: () => Promise.reject({
          details: 'Policy with id cde can\'t be found.'
        })
      };

      getUserPolicyService = new GetUserPolicyService({
        policiesRepository: MockPoliciesRepository
      });
    });

    it('emits NOT_FOUND with the error', (done) => {
      getUserPolicyService.on(getUserPolicyService.outputs.NOT_FOUND, (error) => {
        expect(error.details).to.equal('Policy with id cde can\'t be found.');
        done();
      });

      getUserPolicyService.execute('cde');
    });
  });
});
