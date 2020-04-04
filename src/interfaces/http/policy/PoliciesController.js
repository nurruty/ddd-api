const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const PolicysController = {
  get router() {
    const router = Router();

    router.use(inject('policySerializer'));

    router.get('/user/:name', inject('getPoliciesUserService'), this.show);
    
    return router; 
  },

 
  show(req, res, next) {
    const { getPoliciesUserService, policySerializer } = req;

    const { SUCCESS, ERROR, NOT_FOUND, UNAUTHORIZED } = getPoliciesUserService.outputs;

    getPoliciesUserService
      .on(SUCCESS, (policies) => {
        res
          .status(Status.OK)
          .json(policies.map(policySerializer.serialize));
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

    getPoliciesUserService.execute(req.params.name, ['admin'] );
  },

 
};

module.exports = PolicysController;
