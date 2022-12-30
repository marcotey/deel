'use strict';
const CommonRepository = require('./CommomRepository');
const {Contract} = require('../entities/Contract')
const {Job} = require('../entities/Job')
const {Profile} = require('../entities/Profile')


module.exports = class JobRepository extends CommonRepository {
    constructor() { 
        super();
    }

    async getAll(profileId) {
        try {
          const jobs = await Contract.findAll({where: {[this._Op.or]: [
            { ClientId: profileId },
            { ContractorId: profileId}
          ],status: 'in_progress'
        },
            include:{
            model: Job,
            as: 'Jobs',
            where: { paymentDate:{[this._Op.is]:null}   }  
        }
        })
    
    
        if(!jobs) throw new Error('getAll: no jobs found')
        return jobs
        } catch (err) {
           throw new Error('getAll: ' +  err.message);
        }
    } 
    
    
   async post(client, job_id){

    const t = await this._sequelize.transaction({isolationLevel: this._Transaction.ISOLATION_LEVELS.SERIALIZABLE});

    const job = await Job.findByPk(job_id)

    const contract = await Contract.findOne({id: job.ContractId})

    const canPay = (client.balance >= job.price)

    if (!canPay) throw new Error(`This profile can't pay for the job`)
    
    const contractor = await Profile.findByPk(contract.ContractorId)
    
    try {
          await contractor.increment('balance', {by: job.price}, { transaction: t })
          await client.decrement('balance', {by: job.price}, { transaction: t })
          await job.update({paid: 1, paymentDate: new Date()}, { transaction: t })
           
          await t.commit();
          return {message: 'operation successfully'}
    } catch (error) {
        await t.rollback();
         throw new Error('post jobs: ' +  err.message);
    }
   }
}