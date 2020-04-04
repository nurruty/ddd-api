const { expect } = require('chai');
const GetUserByNameService = require('src/app/user/GetUserByNameService');
const User = require('src/domain/user/User');

describe('App :: User :: GetUserByNameService', () => {
  let getUserByNameService;

  context('when user exists', () => {
    context('when is authorized', () => {
      beforeEach(() => {
        const MockUsersRepository = {
          getByName: (userName) =>  Promise.resolve(new User({id: 'abc', name: userName, role: 'user'}))
        };
  
        getUserByNameService = new GetUserByNameService({
          usersRepository: MockUsersRepository
        });
      });
  
      it('emits SUCCESS with the user', (done) => {
        getUserByNameService.on(getUserByNameService.outputs.SUCCESS, (user) => {
          expect(user.id).to.equal('abc');
          expect(user.name).to.equal('The User');
          done();
        });
  
        getUserByNameService.execute('The User', ['admin', 'user']);
      });
    });

    context('when is unauthorized', () => {
      beforeEach(() => {
        const MockUsersRepository = {
          getByName: (userName) =>  Promise.resolve(new User({id: 'abc', name: userName, role: 'user'}))
        };
  
        getUserByNameService = new GetUserByNameService({
          usersRepository: MockUsersRepository
        });
      });
  
      it('emits UNAUTHORIZED with the user', (done) => {
        getUserByNameService.on(getUserByNameService.outputs.UNAUTHORIZED, (error) => {
          expect(error.details).to.equal('Unauthorized to access this resource');
          done();
        });
  
        getUserByNameService.execute('The User', ['admin']);
      });
    });
    
  });

  context('when user does not exist', () => {
    beforeEach(() => {
      const MockUsersRepository = {
        getByName: () => Promise.reject({
          details: 'User with name The User can\'t be found.'
        })
      };

      getUserByNameService = new GetUserByNameService({
        usersRepository: MockUsersRepository
      });
    });

    it('emits NOT_FOUND with the error', (done) => {
      getUserByNameService.on(getUserByNameService.outputs.NOT_FOUND, (error) => {
        expect(error.details).to.equal('User with name The User can\'t be found.');
        done();
      });

      getUserByNameService.execute('The User', ['admin']);
    });
  });
});
