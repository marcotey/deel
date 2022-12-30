'use strict';
const BalanceRespository = require('../domain/repositories/BalanceRespository');
const CommonService = require('./CommomService');


module.exports = class BalanceService extends CommonService {
  constructor() {
    super();
  }

  async post(req, res) {
    try {
          const repository = new BalanceRespository()
          const client = req.profile
          const {userId} = req.params
          const {amount} = req.body

          let result = await repository.post(client, userId, amount);
          this.successResponse(res, result, 200);          
      } catch (err) {
          this.errorResponse(res, err.message, 400, false);
      }
  }

  
}