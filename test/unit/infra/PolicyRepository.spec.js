const { expect } = require('chai');
const PoliciesRepository = require('src/infra/policy/PoliciesRepository');
const Policy = require('src/domain/policy/Policy');
const { v4 } = require('uuid');

const userWebServiceUrl = 'https://www.mocky.io/v2/5808862710000087232b75ac';
const policyWebServiceUrl = 'https://www.mocky.io/v2/580891a4100000e8242b75c5'

describe('Infra :: Policy ::PoliciesRepository', () => {
  let repository;

  beforeEach(() => {
    repository = new PoliciesRepository({ policyWebServiceUrl, userWebServiceUrl });
  });

  describe('#getById', () => {

    context('when policy exists', () => {
      it('returns policy from webService', async () => {
        const policy = await repository.getById('35a0d2f7-37cd-4c21-8dac-fe91b29bd22b');
  
        expect(policy).to.be.instanceOf(Policy);
        expect(policy.email).to.equal('inesblankenship@quotezart.com');
  
      });
    });

    context('whe policy does not exist', () => {
      it('return empty policy', async () => {
        const policyId = v4();
        try {
          await repository.getById(policyId);
  
        } catch(error) {
          expect(error.message).to.equal('NotFoundError');
          expect(error.details).to.equal(`Policy ${policyId} can't be found.`);
        }
      });
    });

   
  });

  describe('#getByUser', () => {

    context('when policy with user as client exists', () => {
      it('returns policy or policies from webService', async () => {
        const policies = await repository.getByUser('Manning');
  
        expect(policies).not.to.have.lengthOf(0);
        expect(policies[0]).to.be.instanceOf(Policy);
        //expect(policies[0].client.name).to.equal('Manning');
      });
    });

    context('when user does not exist', () => {
      it('return empty array of policies', async () => {
        const policies = await repository.getByUser('Nicolas');
  
        expect(policies).to.have.length(0);
  
      });
    });

   
  });

});
