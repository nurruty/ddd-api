const request = require('test/support/request');
const dataFaker = require('test/support/dataFaker');
const { expect } = require('chai');

describe('API :: GET /api/policies', () => {
  context('when user exists and there policies with his name', () => {
    it('returns 200 and the list of policies', async () => {
      const { body } = await request()
        .get('/api/policies/user/Manning')
        .expect(200);

      expect(body[0].id).to.exist;
      expect(body[0].client.name).to.equal('Manning');
      expect(body[0]).to.have.all.keys('id', 'amountInsured', 'inceptionDate', 'installmentPayment', 'email', 'client' );
    });
  });

  context('when thre are not policies for user name', () => {
    it('returns 200 and the list of policies', async () => {
      const { body } = await request()
        .get('/api/policies/user/Merril')
        .expect(200);

      expect(body).to.have.lengthOf(0);
    });
  });

  context('when the user does not exist', () => {
    it('returns 200 and the list of policies', async () => {
      const fakeName = dataFaker.name();
      const { body } = await request()
        .get(`/api/policies/user/${fakeName}`)
        .expect(200);

      expect(body).to.have.lengthOf(0);
    });
  });



});
