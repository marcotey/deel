'use strict';
const AdminRepository = require('../domain/repositories/AdminRepository');
const CommonService = require('./CommomService');


module.exports = class AdminService extends CommonService {
  constructor() {
    super();
  }

  async get(req, res) {
    try {
          const repository = new AdminRepository()
          const {start, end} = req.query

          let result = await repository.get(start, end);
          this.successResponse(res, result, 200);          
      } catch (err) {
          this.errorResponse(res, err.message, 400);
      }
  }

  async getClients(req, res) {
    try {
          const repository = new AdminRepository()          
          const {start, end, limit} = req.query

          let result = await repository.getClients(start, end, limit);
          this.successResponse(res, result, 200);          
      } catch (err) {
          this.errorResponse(res, err.message, 400);
      }
  }
}