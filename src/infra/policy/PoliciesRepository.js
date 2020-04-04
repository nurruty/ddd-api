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

  async getById(policyId) {

    try {

      const response = await this.api(this.policiesUrl);
      const { policies } = response.data;
      const policy = policies.filter(policy => policy.id === policyId)[0];
      
      if(!policy) {
        const error = new Error('NotFoundError');
        error.details = `Policy ${policyId} can't be found.`;
        throw error;
      }
      
      const { data } = await this.api(this.usersUrl);
      const { clients } = data;
      const client = clients.filter(client => client.id === policy.clientId)[0];
      policy.client = client;

      return PolicyMapper.toEntity(policy);
      

    } catch(error){
      throw error;
    }

  }

 
}

module.exports = PoliciesRepository;
