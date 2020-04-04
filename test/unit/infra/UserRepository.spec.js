const { expect } = require('chai');
const UsersRepository = require('src/infra/user/UsersRepository');
const User = require('src/domain/user/User');
const { v4 } = require('uuid');
const dataFaker = require('../../support/dataFaker');

const userWebServiceUrl = 'https://www.mocky.io/v2/5808862710000087232b75ac';

describe('Infra :: User :: UsersRepository', () => {
  let repository;

  beforeEach(() => {
    repository = new UsersRepository({ userWebServiceUrl });
  });

  describe('#getById', () => {

    context('when user exists', () => {
      it('returns user from webService', async () => {
        const user = await repository.getById('e8fd159b-57c4-4d36-9bd7-a59ca13057bb');
  
        expect(user).to.be.instanceOf(User);
        expect(user.name).to.equal('Manning');
  
      });
    });

    context('whe user does not exist', () => {
      it('return empty user', async () => {
        const userId = v4();
        try {
          await repository.getById(userId);
  
        } catch(error) {
          expect(error.message).to.equal('NotFoundError');
          expect(error.details).to.equal(`User ${userId} can't be found.`);
        }
      });
    });

   
  });

  describe('#getByName', () => {

    context('when user exists', () => {
      it('returns user or users from webService', async () => {
        const users = await repository.getByName('Manning');
  
        expect(users).to.have.lengthOf(1);
        expect(users[0]).to.be.instanceOf(User);
        expect(users[0].name).to.equal('Manning');
      });
    });

    context('whe user does not exist', () => {
      it('return empty array of users', async () => {
        const name = dataFaker.name();
        try {
          await repository.getByName(name);
  
        } catch(error) {
          expect(error.message).to.equal('NotFoundError');
          expect(error.details).to.equal(`Users with name ${name} can't be found.`);
        }
      });
    });

   
  });

});
