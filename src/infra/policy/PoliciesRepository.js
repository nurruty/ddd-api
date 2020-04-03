const PolicyMapper = require('./PolicyMapper');
const https = require('https');
const axios = require('axios');

class PoliciesRepository {
  constructor({policyWebServiceUrl, userWebServiceUrl}) {
    this.policiesUrl = policyWebServiceUrl;
    this.usersUrl = userWebServiceUrl;
    this.api = axios.create({
      timeout: 1000,
      headers: {'Content-Type': 'application/json'},
      httpsAgent: new https.Agent({  
        rejectUnauthorized: false
      })
    });
  }

  
  async getByUser(userName) {

    try {


      const { data } = await this.api(this.usersUrl);
      const { clients: users } = data;

      const response = await this.api(this.policiesUrl);
      const { policies } = response.data;

      const usersMap = {};
      users.map( user => usersMap[user.id] = user );

      policies.map( policy => policy.client = usersMap[policy.clientId]);

      const result = policies.filter( policy => policy.client.name === userName);

      return result.map(PolicyMapper.toEntity);

    } catch(error){
  
      throw error;
    }
   
  }

  async getByName(name) {

    try {

      const { data } = await this.api(this.url);
      const { clients: users } = data;
      return users.filter(user => user.name === name).map(PolicyMapper.toEntity);

    } catch(error){
      throw error;
    }

  }

 
}

module.exports = PoliciesRepository;
