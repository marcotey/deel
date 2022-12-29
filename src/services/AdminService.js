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
          const models = await req.app.get('models')

          let result = await repository.get(start, end, models);
          this.successResponse(res, result, 200);          
      } catch (err) {
          this.errorResponse(res, err.message, 400);
      }
  }

  async getClients(req, res) {
    try {
          const repository = new AdminRepository()          
          const models = await req.app.get('models')
          const {start, end, limit} = req.query

          let result = await repository.getClients(start, end, limit, models);
          this.successResponse(res, result, 200);          
      } catch (err) {
          this.errorResponse(res, err.message, 400);
      }
  }
}