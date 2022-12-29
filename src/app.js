const express = require('express');
const bodyParser = require('body-parser');
const {sequelize, Op, Job, Transaction} = require('./model')
const {getProfile} = require('./middleware/getProfile');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const contractRoute = require('./routes/contractsRoute')
const jobsRoute = require('./routes/jobRoutes')
const adminRoutes = require('./routes/adminRoutes')
const balanceRoutes = require('./routes/balanceRoutes')
app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/contracts', getProfile, contractRoute);
app.use('/contracts', getProfile, contractRoute);
app.use('/jobs', getProfile, jobsRoute);
app.use('/admin', adminRoutes);
app.use('/balances', getProfile, balanceRoutes);





/*app.get('/contracts',getProfile ,async (req, res) =>{
    const {Contract} = req.app.get('models')
    const profileId = req.profile.id
    const contract = await Contract.findAll({where: {[Op.or]: [
        { ClientId: profileId },
        { ContractorId: profileId}
      ],
      [Op.not]: [
        { Status: 'terminated' },
      ]
    }
})
    if(!contract) return res.status(404).end()
    res.json(contract)
})*/


/*app.get('/jobs/unpaid',getProfile ,async (req, res) =>{
    const {Contract} = req.app.get('models')
    const profileId = req.profile.id
    const jobs = await Contract.findAll({where: {[Op.or]: [
        { ClientId: profileId },
        { ContractorId: profileId}
      ],status: 'in_progress'
    },
        include:{
        model: Job,
        as: 'Jobs',
        where: { paymentDate:{[Op.is]:null}   }  
    }
    })


    if(!jobs) return res.status(404).end()
    res.json(jobs)
})*/

/*
app.get('/admin/best-profession' ,async (req, res) =>{
    const {start, end} = req.query
    var timestamp = Date.parse(start);
    var timestamp2 = Date.parse(end);

    console.log(timestamp, timestamp2, start, end, req.query)

    if (isNaN(timestamp) || isNaN(timestamp2) ) {
        return res.status(404).send({message: 'Invalid date'});       
}

    if ( timestamp > timestamp2)
        return res.status(404).send({message: 'final date must be higher than initial date'});


        const result = await sequelize.query(` SELECT Profiles.profession, SUM(price) total
                            FROM Contracts
                            INNER JOIN Jobs ON Contracts.id = Jobs.ContractId
                            INNER JOIN Profiles ON Profiles.id = Contracts.ContractorId
                            WHERE   Jobs.paymentDate IS NOT NULL 
                                    AND substr(Jobs.paymentDate, 1, 10) BETWEEN :start AND :end     
                            GROUP BY Profiles.profession
                            ORDER by total desc
                            LIMIT 1
    `, { raw: true,
        replacements: { start: start, end: end }
     })

    if(!result) return res.status(404).end()
    res.json(result)
})
*/
/*
app.get('/admin/best-clients' ,async (req, res) =>{
    const {start, end, limit} = req.query
    var timestamp = Date.parse(start);
    var timestamp2 = Date.parse(end);

    if (isNaN(timestamp) || isNaN(timestamp2) ) {
        return res.status(404).send({message: 'Invalid date'});       
}

    if ( timestamp > timestamp2)
        return res.status(404).send({message: 'final date must be higher than initial date'});


        const result = await sequelize.query(` SELECT Profiles.id, Profiles.firstName || ' ' || Profiles.lastName fullName, SUM(price) paid
                            FROM Contracts
                            INNER JOIN Jobs ON Contracts.id = Jobs.ContractId
                            INNER JOIN Profiles ON Profiles.id = Contracts.ClientId
                            WHERE   Jobs.paymentDate IS NOT NULL 
                                    AND substr(Jobs.paymentDate, 1, 10) BETWEEN :start AND :end     
                            GROUP BY Profiles.id
                            ORDER by paid desc
                            LIMIT :limit
    `, { raw: true,
        replacements: { start: start, end: end, limit: limit || 2 }
     })

    if(!result) return res.status(404).end()
    res.json(result)
})

*/

/*app.post('/jobs/:job_id/pay', getProfile ,async (req, res) =>{
    const {Contract} = req.app.get('models')
    const {Job} = req.app.get('models')
    const {Profile} = req.app.get('models')
    const client = req.profile
    const {job_id} = req.params
    const t = await sequelize.transaction({isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE});

    const job = await Job.findByPk(job_id)

    const contract = await Contract.findOne({id: job.ContractId})

    const canPay = (client.balance >= job.price)

    if (!canPay) return res.status(400).json({message:`This profile can't pay for the job`})
    
    const contractor = await Profile.findOne({where: id = contract.ContractorId})
    
    try {
        

          await contractor.increment('balance', {by: job.price}, { transaction: t })
          await client.decrement('balance', {by: job.price}, { transaction: t })
          await job.update({paid: 1, paymentDate: new Date()}, { transaction: t })
           
          await t.commit();
    } catch (error) {
        await t.rollback();
        res.status(404).end()
    }

    res.status(200).send()
})*/


/*app.post('/balances/deposit/:userId', getProfile ,async (req, res) =>{
    const {Contract} = req.app.get('models')
    const {Job} = req.app.get('models')
    const {Profile} = req.app.get('models')
    const client = req.profile
    const {userId} = req.params
    const {amount} = req.body
    const t = await sequelize.transaction({isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE});

 
    
    try {

        const jobs = await Contract.findAll({where: { ClientId: client.id },
            include:{
            model: Job,
            as: 'Jobs',
            where: { paymentDate:{[Op.is]:null}   }  
        }
        })
    
        client.totalToPay = 0
        jobs[0].Jobs.map((item) =>{
           client.totalToPay += item.price
        })
    
        client.maxDeposit = (25 * client.totalToPay) / 100
    
        const canDeposit = (client.balance >= client.maxDeposit) && (amount <= client.maxDeposit)
    
        if (!canDeposit) return res.status(400).json({message:`This profile can't deposit`})
        
        const clientDestination = await Profile.findByPk(userId)

          await clientDestination.increment('balance', {by: amount}, { transaction: t })
          await client.decrement('balance', {by: amount}, { transaction: t })
           
          await t.commit();
    } catch (error) {
        await t.rollback();
        res.status(404).end()
    }

    res.status(200).send()
})
ds*/
module.exports = app;
