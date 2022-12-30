'use strict';
const CommonRepository = require('./CommomRepository');
const {Contract} = require('../entities/Contract')

module.exports = class ContractRepository extends CommonRepository {
    constructor() { 
        super();
    }

    async getContractById(id, profileId) {
        try {
          const result = await Contract.findOne({where: {id: id, ClientId: profileId}})
          return result
        } catch (err) {
           throw new Error('getContractById: ' +  err.message);
        }
    }

    async getAll(profileId) {
      try {
        const contract = await Contract.findAll({where: {[this._Op.or]: [
            { ClientId: profileId },
            { ContractorId: profileId}
          ],
          [this._Op.not]: [
            { Status: 'terminated' },
          ]
        }
      })
      if(!contract)  throw new Error('getAll: no profile found')

      return contract

      } catch (error) {
        throw new Error('getAll: ' +  error.message);
      }
   }
    
}