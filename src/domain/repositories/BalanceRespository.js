'use strict';
const CommonRepository = require('./CommomRepository');

module.exports = class BalanceRepository extends CommonRepository {
    constructor() { 
        super();
    }

    async post(client, userId, amount, models) {
      const {Contract} = models
      const {Job} = models
      const {Profile} = models
      const t = await this._sequelize.transaction({isolationLevel: this._Transaction.ISOLATION_LEVELS.SERIALIZABLE});

 
    
    try {

        const jobs = await Contract.findAll({where: { ClientId: client.id },
            include:{
            model: Job,
            as: 'Jobs',
            where: { paymentDate:{[this._Op.is]:null}   }  
        }
        })
    
        client.totalToPay = 0
        jobs[0].Jobs.map((item) =>{
           client.totalToPay += item.price
        })
    
        client.maxDeposit = (25 * client.totalToPay) / 100
    
        const canDeposit = (client.balance >= client.maxDeposit) && (amount <= client.maxDeposit)
    
        if (!canDeposit) throw new Error(`This profile can't deposit: the amount it's bigger than balance or it's over 25% of their debts`)
        
        const clientDestination = await Profile.findByPk(userId)

          await clientDestination.increment('balance', {by: amount}, { transaction: t })
          await client.decrement('balance', {by: amount}, { transaction: t })
           
          await t.commit();

          return {message: 'operation successfully'}
    } catch (error) {
        await t.rollback();
        throw new Error('post deposit: ' +  error.message);
        
    }

    }
    
}