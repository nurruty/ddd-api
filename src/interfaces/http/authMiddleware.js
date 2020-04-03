

const Status = require('http-status');

const authMiddleware = (admitedRoles) => {

  return async (req, res, next) => {
    try {

      const { authUserService } = req;
    
      const { AUTHORIZED, NOT_AUTHORIZED } = authUserService.outputs;
    
      authUserService
        .on(AUTHORIZED, next)
        .on(NOT_AUTHORIZED, (error) => {
          res.status(Status.UNAUTHORIZED).json(error);
        });
    
      authUserService.execute(req.params.id, admitedRoles);
    }
    catch (error) {
      //next(error);
    }
  };
};

  

module.exports = authMiddleware;