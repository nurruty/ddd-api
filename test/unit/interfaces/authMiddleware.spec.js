const { expect } = require('chai');
const authMiddleware = require('src/interfaces/http/authMiddleware');

describe('Interface :: Auth :: authMiddleware', () => {

  let admitedRoles = ['admin', 'user'];
  let req;
  let res;
  let next;


  context('user role is authorized', () => {
    beforeEach(() => {
      req
    } )
  })

  context('user role is not authorized', () => {

  })

})