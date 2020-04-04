const { expect } = require('chai');
const GetUserByIdService = require('src/app/user/GetUserByIdService');

describe('App :: User :: GetUserByIdService', () => {
  let getUserByIdService;

  context('when user exists', () => {
    beforeEach(() => {
      const MockUsersRepository = {
        getById: (userId) => Promise.resolve({
          id: userId,
          name: 'The User'
        })
      };

      getUserByIdService = new GetUserByIdService({
        usersRepository: MockUsersRepository
      });
    });

    it('emits SUCCESS with the user', (done) => {
      getUserByIdService.on(getUserByIdService.outputs.SUCCESS, (user) => {
        expect(user.id).to.equal('abc');
        expect(user.name).to.equal('The User');
        done();
      });

      getUserByIdService.execute('abc');
    });
  });

  context('when user does not exist', () => {
    beforeEach(() => {
      const MockUsersRepository = {
        getById: () => Promise.reject({
          details: 'User with id abc can\'t be found.'
        })
      };

      getUserByIdService = new GetUserByIdService({
        usersRepository: MockUsersRepository
      });
    });

    it('emits NOT_FOUND with the error', (done) => {
      getUserByIdService.on(getUserByIdService.outputs.NOT_FOUND, (error) => {
        expect(error.details).to.equal('User with id abc can\'t be found.');
        done();
      });

      getUserByIdService.execute('abc');
    });
  });
});
