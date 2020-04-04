const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const UsersController = {
  get router() {
    const router = Router();

    router.use(inject('userSerializer'));

    router.get('/:id', inject('getUserByIdService'), this.show);
    router.get('/name/:name', inject('getUserByNameService'), this.index);
    router.get('/policy/:id', inject('getUserPolicyService'), this.user);

    return router; 
  },

 
  show(req, res, next) {
    const { getUserByIdService, userSerializer } = req;

    const { SUCCESS, ERROR, NOT_FOUND, UNAUTHORIZED } = getUserByIdService.outputs;

    getUserByIdService
      .on(SUCCESS, (user) => {
        res
          .status(Status.OK)
          .json(userSerializer.serialize(user));
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(UNAUTHORIZED, () => {
        res.status(Status.UNAUTHORIZED).json({
          type: 'Unauthorized'
        });
      })
      .on(ERROR, next);

    getUserByIdService.execute(req.params.id, ['admin', 'user'] );
  },

  index(req, res, next) {
    const { getUserByNameService, userSerializer } = req;

    const { SUCCESS, ERROR, NOT_FOUND, UNAUTHORIZED } = getUserByNameService.outputs;

    getUserByNameService
      .on(SUCCESS, (user) => {
        res
          .status(Status.OK)
          .json(userSerializer.serialize(user));
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(UNAUTHORIZED, () => {
        res.status(Status.UNAUTHORIZED).json({
          type: 'Unauthorized'
        });
      })
      .on(ERROR, next);

    getUserByNameService.execute(req.params.name, ['admin', 'user'] );
  },

  user(req, res, next) {
    const { getUserPolicyService, userSerializer } = req;

    const { SUCCESS, ERROR, NOT_FOUND, UNAUTHORIZED } = getUserPolicyService.outputs;

    getUserPolicyService
      .on(SUCCESS, (user) => {
        res
          .status(Status.OK)
          .json(userSerializer.serialize(user));
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(UNAUTHORIZED, () => {
        res.status(Status.UNAUTHORIZED).json({
          type: 'Unauthorized'
        });
      })
      .on(ERROR, next);

    getUserPolicyService.execute(req.params.id, ['admin'] );
  }

 
};

module.exports = UsersController;
