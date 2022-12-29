'use strict';

const AdminService = require('../services/AdminService')

exports.get = async (req, res, next) => {
  const service = new AdminService();
  const result = await service.get(req, res);
  res.status(200).json(result)
}

exports.getClients = async (req, res, next) => {
  const service = new AdminService();
  const result = await service.getClients(req, res);
  res.status(200).json(result)
}