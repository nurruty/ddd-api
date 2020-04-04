const UserMapper = require('./UserMapper');
const https = require('https');
const axios = require('axios');

class UsersRepository {
  constructor({userWebServiceUrl}) {
    this.url = userWebServiceUrl;
    this.api = axios.create({
      timeout: 1000,
      headers: {'Content-Type': 'application/json'},
      httpsAgent: new https.Agent({  
        rejectUnauthorized: false
      })
    });
  }

  
  async getById(id) {

    try {


      const { data } = await this.api(this.url);
      const { clients: users } = data;
      const user = users.filter(user => user.id === id)[0];

      if(!user) {
        const error = new Error('NotFoundError');
        error.details = `User ${id} can't be found.`;
        throw error;
      }

      return UserMapper.toEntity(user);

    } catch(error){
  
      throw error;
    }
   
  }

  async getByName(name) {

    try {

      const { data } = await this.api(this.url);
      const { clients: users } = data;
      const user = users.filter(user => user.name === name)[0];

      if(!user) {
        const error = new Error('NotFoundError');
        error.details = `User ${name} can't be found.`;
        throw error;
      }

      return UserMapper.toEntity(user);

    } catch(error){
  
      throw error;
    }

  }

}

module.exports = UsersRepository;
