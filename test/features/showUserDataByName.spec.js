const request = require('test/support/request');
const dataFaker = require('test/support/dataFaker');
const { expect } = require('chai');

describe('API :: GET /api/users', () => {
  context('when user or users are found', () => {
    it('creates and returns 201 and the new user', async () => {
      const { body } = await request()
        .get('/api/users/name/Barnett')
        .expect(200);

      expect(body).not.to.have.lengthOf(0);
      expect(body[0].id).to.exist;
      expect(body[0].name).to.equal('Barnett');
      expect(body[0]).to.have.all.keys('id', 'name', 'role', 'email');
    });
  });

  context('when users arent found', () => {
    it('returns 404 with the validation error', async () => {
      const name = dataFaker.name();
      const { body } = await request()
        .get(`/api/users/name/${name}`)
        .expect(404);

      expect(body.type).to.equal('NotFoundError');
      expect(body.details).to.equal(`Users with name ${name} can't be found.`);
    });
  });
});
