const Operation = require('src/app/Operation');

class GetUserByName extends Operation {
  constructor({ usersRepository }) {
    super();
    this.usersRepository = usersRepository;
  }

  async execute(name) {
    const { SUCCESS, NOT_FOUND } = this.outputs;

    try {
      const users = await this.usersRepository.getByName(name);
      this.emit(SUCCESS, users);
    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

GetUserByName.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = GetUserByName;
