const PolicyMapper = require('./PolicyMapper');
const https = require('https');
const axios = require('axios');
const _ = require('lodash');

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
      
      return PolicyMapper.toEntity(policy);
      

    } catch(error){
      throw error;
    }

  }

  
  async getByUser(userName) {

    try {
      const { data } = await this.api(this.usersUrl);
      const { clients: users } = data;

      const response = await this.api(this.policiesUrl);
      const { policies } = response.data;

     
      const usersMap = _.keyBy(users, (u) => { return u.id; });
      const userPolicies = _.filter(policies, (p) => {
        return usersMap[p.clientId].name === userName;
      });


      return userPolicies.map(PolicyMapper.toEntity);

    } catch(error){
  
      throw error;
    }  
  } 
}

module.exports = PoliciesRepository;
