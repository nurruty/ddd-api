const request = require('test/support/request');
const { expect } = require('chai');
const { v4 } = require('uuid');

describe('API :: GET /api/users', () => {
  context('when policy is found', () => {
    it('returns 200 and the user', async () => {
      const { body } = await request()
        .get('/api/users/policy/35a0d2f7-37cd-4c21-8dac-fe91b29bd22b')
        .expect(200);

      expect(body.id).to.exist;
      expect(body.name).to.equal('Manning');
      expect(body).to.have.all.keys('id', 'name', 'role', 'email');
    });
  });

  context('when policy isnt found', () => {
    it('returns 404 with the validation error', async () => {
      const fakeId = v4();
      const { body } = await request()
        .get(`/api/users/policy/${fakeId}`)
        .expect(404);

      expect(body.type).to.equal('NotFoundError');
      expect(body.details).to.equal(`Policy ${fakeId} can't be found.`);
    });
  });
});
