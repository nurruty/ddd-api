const { expect } = require('chai');
const GetPoliciesUserService = require('src/app/policy/GetPoliciesUserService');
const User = require('src/domain/user/User');

describe('App :: User :: GetPoliciesUserService', () => {
  let getPoliciesUserService;

  context('when policy exists', () => {
    context('when user is authorized', () => {
      beforeEach(() => {
        const MockPoliciesRepository = {
          getByUser: (userName) => Promise.resolve(
            [
              {
                id: 'cde',
                client: new User({
                  id: 'abc',
                  name: userName,
                  role: 'user'
                })
              },
              {
                id: 'abc',
                client: new User({
                  id: 'abc',
                  name: userName,
                  role: 'user'
                })
              }
            ])
        };

        const MockUsersRepository = {
          getByName: (userName) =>  Promise.resolve(new User({id: 'abc', name: userName, role: 'user'})),
        };
  
        getPoliciesUserService = new GetPoliciesUserService({
          policiesRepository: MockPoliciesRepository,
          usersRepository: MockUsersRepository
        });
      });
  
      it('emits SUCCESS with the user', (done) => {
        getPoliciesUserService.on(getPoliciesUserService.outputs.SUCCESS, (policies) => {
          expect(policies).to.have.length(2);
          expect(policies[0].client.name).to.equal('The User');
          expect(policies[1].client.name).to.equal('The User');
          done();
        });
  
        getPoliciesUserService.execute('The User', ['user']);
      });
    });

    context('when user is unauthorized', () => {
      beforeEach(() => {
        const MockPoliciesRepository = {
          getByUser: (userName) => Promise.resolve(
            [{id: 'cde', client: new User({ id: 'abc', name: userName, role: 'user'})}])
        };

        const MockUsersRepository = {
          getByName: (userName) =>  Promise.resolve(new User({id: 'abc', name: userName, role: 'user'})),
        };
  
        getPoliciesUserService = new GetPoliciesUserService({
          policiesRepository: MockPoliciesRepository,
          usersRepository: MockUsersRepository
        });
  
      });

      it('emits UNAUTHORIZED with the user', (done) => {
        getPoliciesUserService.on(getPoliciesUserService.outputs.UNAUTHORIZED, (error) => {
          expect(error.details).to.equal('Unauthorized to access this resource');
          done();
        });
  
        getPoliciesUserService.execute('The User', ['admin']);
      });
    });
   
  });

  context('when there are no policies for a user', () => {
    beforeEach(() => {
      const MockPoliciesRepository = {
        getByUser: (userName) => Promise.reject({
          details: `The were no policies found for user ${userName}`
        })
      };

      const MockUsersRepository = {
        getByName: (userName) =>  Promise.resolve(new User({id: 'abc', name: userName, role: 'admin'})),
      };

      getPoliciesUserService = new GetPoliciesUserService({
        policiesRepository: MockPoliciesRepository,
        usersRepository: MockUsersRepository
      });
    });

    it('emits NOT_FOUND with the error', (done) => {
      getPoliciesUserService.on(getPoliciesUserService.outputs.NOT_FOUND, (error) => {
        expect(error.details).to.equal('The were no policies found for user The User');
        done();
      });

      getPoliciesUserService.execute('The User', ['admin']);
    });
  });
});
