const { expect } = require('chai');
const GetPoliciesUserService = require('src/app/policy/GetPoliciesUserService');

describe('App :: User :: GetPoliciesUserService', () => {
  let getPoliciesUserService;

  context('when policy exists', () => {
    beforeEach(() => {
      const MockPoliciesRepository = {
        getByUser: (userName) => Promise.resolve(
          [
            {
              id: 'cde',
              client: {
                id: 'abc',
                name: userName
              }
            },
            {
              id: 'fgh',
              client: {
                id: 'cde',
                name: userName
              }
            }
          ])
      };

      getPoliciesUserService = new GetPoliciesUserService({
        policiesRepository: MockPoliciesRepository
      });
    });

    it('emits SUCCESS with the user', (done) => {
      getPoliciesUserService.on(getPoliciesUserService.outputs.SUCCESS, (policies) => {
        expect(policies).to.have.length(2);
        expect(policies[0].client.name).to.equal('The User');
        expect(policies[1].client.name).to.equal('The User');
        done();
      });

      getPoliciesUserService.execute('The User');
    });
  });

  context('when there are no policies for a user', () => {
    beforeEach(() => {
      const MockPoliciesRepository = {
        getByUser: (userName) => Promise.reject({
          details: `The were no policies found for user ${userName}`
        })
      };

      getPoliciesUserService = new GetPoliciesUserService({
        policiesRepository: MockPoliciesRepository
      });
    });

    it('emits NOT_FOUND with the error', (done) => {
      getPoliciesUserService.on(getPoliciesUserService.outputs.NOT_FOUND, (error) => {
        expect(error.details).to.equal('The were no policies found for user The User');
        done();
      });

      getPoliciesUserService.execute('The User');
    });
  });
});
