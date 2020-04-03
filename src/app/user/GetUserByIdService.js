const Operation = require('src/app/Operation');

class GetUserByIdService extends Operation {
  constructor({ usersRepository }) {
    super();
    this.usersRepository = usersRepository;
  }

  async execute(userId) {
    const { SUCCESS, NOT_FOUND } = this.outputs;

    try {
      const user = await this.usersRepository.getById(userId);
      this.emit(SUCCESS, user);
    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

GetUserByIdService.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = GetUserByIdService;
