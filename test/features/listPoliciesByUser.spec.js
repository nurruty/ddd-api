const request = require('test/support/request');
const dataFaker = require('test/support/dataFaker');
const { expect } = require('chai');

describe('API :: GET /api/policies', () => {
  context('user is authorized', () => {

    context('when user exists, and there are policies with his name', () => {
      it('returns 200 and the list of policies', async () => {
        const { body } = await request()
          .get('/api/policies/user/Manning')
          .expect(200);
  
        expect(body[0].id).to.exist;
        //expect(body[0].client.name).to.equal('Manning');
        expect(body[0]).to.have.all.keys('id', 'amountInsured', 'inceptionDate', 'installmentPayment', 'email', 'clientId' );
      });
    });
  
    context('when thre are not policies for user name', () => {
      it('returns 200 and the list of policies', async () => {
        const { body } = await request()
          .get('/api/policies/user/Whitley')
          .expect(200);
  
        expect(body).to.have.lengthOf(0);
      });
    });

  });
  
  context('when user exists but not authorized', () => {
    it('returns 401 unauthorzied', async () => {
      const { body } = await request()
        .get('/api/policies/user/Merrill')
        .expect(401);

      expect(body.type).to.equal('Unauthorized');
      //expect(body.details).to.equal(`User ${name} can't be found.`);
    });
  });


  context('when the user does not exist', () => {
    it('returns 200 and the list of policies', async () => {
      const fakeName = dataFaker.name();
      const { body } = await request()
        .get(`/api/policies/user/${fakeName}`)
        .expect(404);

      expect(body.type).to.equal('NotFoundError');
      expect(body.details).to.equal(`User ${fakeName} can't be found.`);
    });
  });

});
