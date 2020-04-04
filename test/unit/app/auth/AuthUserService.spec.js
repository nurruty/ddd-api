const { expect } = require('chai');
const AuthUserService = require('src/app/auth/AuthUserService');
const User = require('src/domain/user/User');

describe('App :: Auth :: AuthUserService', () => {
  let authUserService;

  context('when user exists', () => {
    context('when user is authorized', () => {
      beforeEach(() => {
        const MockUsersRepository = {
          getById: (userId) => Promise.resolve(new User({id: userId, role: 'admin'}))
        };
  
        authUserService = new AuthUserService({
          usersRepository: MockUsersRepository
        });
      });
  
      it('emits AUTHORIZED', (done) => {
        const admitedRoles = ['admin', 'user']
        authUserService.on(authUserService.outputs.AUTHORIZED, () => {
          done();
        });
  
        authUserService.execute('abc', admitedRoles);
      });
    });

    context('when user isnt authorized', () => {
      beforeEach(() => {
        const MockUsersRepository = {
          getById: (userId) => Promise.resolve(new User({id: userId, role: 'user'}))
        };
  
        authUserService = new AuthUserService({
          usersRepository: MockUsersRepository
        });
      });
  
      it('emits NOT_AUTHORIZED', (done) => {
        const admitedRoles = ['admin'];
        authUserService.on(authUserService.outputs.NOT_AUTHORIZED, () => {
          done();
        });
  
        authUserService.execute('abc', admitedRoles);
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

      authUserService = new AuthUserService({
        usersRepository: MockUsersRepository
      });
    });

    it('emits NOT_AUTHORIZED with the error', (done) => {
      authUserService.on(authUserService.outputs.NOT_AUTHORIZED, () => {
        done();
      });

      authUserService.execute('abc');
    });
  });
});
