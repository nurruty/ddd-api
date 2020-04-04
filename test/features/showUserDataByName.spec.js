const request = require('test/support/request');
const dataFaker = require('test/support/dataFaker');
const { expect } = require('chai');

describe('API :: GET /api/users/name', () => {
  
  context('when user is found', () => {
    it('returns 200 and the new user', async () => {
      const { body } = await request()
        .get('/api/users/name/Barnett')
        .expect(200);

      expect(body.id).to.exist;
      expect(body.name).to.equal('Barnett');
      expect(body).to.have.all.keys('id', 'name', 'role', 'email');
    });
  });

  context('when user arent found', () => {
    it('returns 404 with the validation error', async () => {
      const name = dataFaker.name();
      const { body } = await request()
        .get(`/api/users/name/${name}`)
        .expect(404);

      expect(body.type).to.equal('NotFoundError');
      expect(body.details).to.equal(`User ${name} can't be found.`);
    });
  });
});
