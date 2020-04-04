const { expect } = require('chai');
const User = require('src/domain/user/User');

describe('Domain :: User', () => {
  describe('#getRole', () => {
    context('when user is admin', () => {
      it('returns admin', () => {
        const user = new User({ role: 'admin' });

        expect(user.getRole()).to.equal('admin');
      });
    });

    context('when user isnt admin', () => {
      it('returns other role', () => {
        const user = new User({ role: 'user' });

        expect(user.getRole()).to.equal('user');
      });
    });
  });

 
  describe('#hasRole', () => {
    context('when user has role', () => {
      it('returns other role', () => {
        const user = new User({ role: 'admin' });

        expect(user.hasRole('admin')).to.be.true();
      });
    });

    context('when user doesnt have role', () => {
      it('returns other role', () => {
        const user = new User({ role: 'user' });

        expect(user.hasRole('admin')).to.be.false();
      });
    });
  });

});