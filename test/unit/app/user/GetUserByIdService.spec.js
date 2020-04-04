const { expect } = require('chai');
const GetUserByIdService = require('src/app/user/GetUserByIdService');
const User = require('src/domain/user/User');

describe('App :: User :: GetUserByIdService', () => {
  let getUserByIdService;

  context('when user exists', () => {
    context('when user is authorized', () => {
      beforeEach(() => {
        const MockUsersRepository = {
          getById: (userId) => Promise.resolve(new User({id: userId, name: 'The User', role: 'admin'}))
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
  
        getUserByIdService.execute('abc', ['admin', 'user']);
      });
    });

    context('when user is unathorized', () => {
      beforeEach(() => {
        const MockUsersRepository = {
          getById: (userId) => Promise.resolve(new User({id: userId, name: 'The User', role: 'user'}))
        };
  
        getUserByIdService = new GetUserByIdService({
          usersRepository: MockUsersRepository
        });
      });

      it('emits UNAUTHORIZED', (done) => {
        getUserByIdService.on(getUserByIdService.outputs.UNAUTHORIZED, (error) => {
          expect(error.details).to.equal('Unauthorized to access this resource');
          done();
        });
  
        getUserByIdService.execute('abc', ['admin']);
      });

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

      getUserByIdService.execute('abc', ['admin']);
    });
  });
});
