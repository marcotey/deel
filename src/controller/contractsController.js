'use strict';

const ContractService = require('../services/ContractService')

exports.get = async (req, res, next) => {
  const service = new ContractService();
  const result = await service.getContractById(req, res);
  res.status(200).json(result)
}

exports.getAll = async (req, res, next) => {
  const service = new ContractService();
  const result = await service.getAll(req, res);
  res.status(200).json(result)
}

/*const {Contract} = req.app.get('models')
  //let {Profile} = req.app.get('models')
  const {id} = req.params
  const profileId = req.profile.id 
  const contract = await Contract.findOne({where: {id: id, ClientId: profileId}})
  /*const contract = await Profile.findAll({where: {'$Profile.id$': profileId},
      include:{
      model: Contract,
      as: 'Client',
      where: { id: id }
  }
  })
  if(!contract) return res.status(404).end()
  res.status(200).json(contract)*/