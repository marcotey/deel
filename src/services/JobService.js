'use strict';
const JobRepository = require('../domain/repositories/JobRepository');
const CommonService = require('./CommomService');


module.exports = class JobService extends CommonService {
  constructor() {
    super();
  }

  async getAll(req, res) {
    try {
          const repository = new JobRepository()
          const profileId = req.profile.id 

          let result = await repository.getAll(profileId);
          this.successResponse(res, result, 200);          
      } catch (err) {
          this.errorResponse(res, err.message, 400);
      }
  }

  async post(req, res) {
    try {
          const repository = new JobRepository()
          const client = req.profile
          const {job_id} = req.params

          let result = await repository.post(client, job_id);
          this.successResponse(res, result, 200);          
      } catch (err) {
          this.errorResponse(res, err.message, 400);
      }
  }


  
}