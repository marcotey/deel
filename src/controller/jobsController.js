'use strict';

const JobService = require('../services/JobService')

exports.get = async (req, res, next) => {
  const service = new JobService();
  const result = await service.getAll(req, res);
  res.status(200).json(result)
}

exports.post = async (req, res, next) => {
  const service = new JobService();
  const result = await service.post(req, res);
  res.status(200).json(result)
}
