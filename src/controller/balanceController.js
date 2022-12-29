'use strict';

const BalanceService = require('../services/BalanceService')

exports.post = async (req, res, next) => {
  const service = new BalanceService();
  const result = await service.post(req, res);
  res.status(200).json(result)
}

