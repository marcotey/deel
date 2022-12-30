'use strict';
const ContractRepository = require('../domain/repositories/ContractRepository');
const CommonService = require('./CommomService');


module.exports = class ContractService extends CommonService {
  constructor() {
    super();
  }

  async getContractById(req, res) {
    try {
          const repository = new ContractRepository()
          const {id} = req.params
          const profileId = req.profile.id 

          let result = await repository.getContractById(id, profileId);
          this.successResponse(res, result, 200);          
      } catch (err) {
          this.errorResponse(res, err.message, 400);
      }
  }

  async getAll(req, res) {
    try {
          const repository = new ContractRepository()          
          const profileId = req.profile.id 
          let result = await repository.getAll(profileId);
          this.successResponse(res, result, 200);          
      } catch (err) {
          this.errorResponse(res, err.message, 400);
      }
  }
}