const { createContainer, asClass, asFunction, asValue } = require('awilix');
const { scopePerRequest } = require('awilix-express');

const config = require('../config');
const Application = require('./app/Application');
const {
  AuthUserService
} = require('./app/auth');

const {
  GetUserByIdService,
  GetUserByNameService,
  GetUserPolicyService
} = require('./app/user');

const {
  GetPoliciesUserService
} = require('./app/policy');


const UserSerializer = require('./interfaces/http/user/UserSerializer');
const PolicySerializer = require('./interfaces/http/policy/PolicySerializer');

const Server = require('./interfaces/http/Server');
const router = require('./interfaces/http/router');
const loggerMiddleware = require('./interfaces/http/logging/loggerMiddleware');
const errorHandler = require('./interfaces/http/errors/errorHandler');
const devErrorHandler = require('./interfaces/http/errors/devErrorHandler');

const logger = require('./infra/logging/logger');
const UsersRepository = require('./infra/user/UsersRepository');
const PoliciesRepository = require('./infra/policy/PoliciesRepository');

const container = createContainer();

// System
container
  .register({
    app: asClass(Application).singleton(),
    server: asClass(Server).singleton()
  })
  .register({
    router: asFunction(router).singleton(),
    logger: asFunction(logger).singleton()
  })
  .register({
    config: asValue(config)
  });

// Middlewares
container
  .register({
    loggerMiddleware: asFunction(loggerMiddleware).singleton()
  })
  .register({
    containerMiddleware: asValue(scopePerRequest(container)),
    errorHandler: asValue(config.production ? errorHandler : devErrorHandler),
  });

// Repositories
container.register({
  usersRepository: asClass(UsersRepository).singleton(),
  policiesRepository: asClass(PoliciesRepository).singleton(),
  userWebServiceUrl: asValue('https://www.mocky.io/v2/5808862710000087232b75ac'),
  policyWebServiceUrl: asValue('https://www.mocky.io/v2/580891a4100000e8242b75c5'),
});


// Operations
container.register({
  authUserService: asClass(AuthUserService),

  getUserByIdService: asClass(GetUserByIdService),
  getUserByNameService: asClass(GetUserByNameService),
  getUserPolicyService: asClass(GetUserPolicyService),

  getPoliciesUserService: asClass(GetPoliciesUserService)
});

// Serializers
container.register({
  userSerializer: asValue(UserSerializer),
  policySerializer: asValue(PolicySerializer)
});


module.exports = container;
