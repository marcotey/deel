'use strict';
const CommonRepository = require('./CommomRepository');

module.exports = class AdminRepository extends CommonRepository {
    constructor() { 
        super();
    }

    async get(start, end, models) {
        try {
          var timestamp = Date.parse(start);
          var timestamp2 = Date.parse(end);

          if (isNaN(timestamp) || isNaN(timestamp2) ) {
              return res.status(404).send({message: 'Invalid date'});       
} 

      if ( timestamp > timestamp2)
          return res.status(404).send({message: 'final date must be higher than initial date'});


          const result = await this._sequelize.query(` SELECT Profiles.profession, SUM(price) total
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
      return result
          } catch (err) {
             throw new Error('get /admin: ' +  err.message);
          }
      }



      async getClients(start, end, limit, models) {
        try {
          var timestamp = Date.parse(start);
          var timestamp2 = Date.parse(end);

    if (isNaN(timestamp) || isNaN(timestamp2) ) {
        return res.status(404).send({message: 'Invalid date'});       
}

    if ( timestamp > timestamp2)
        return res.status(404).send({message: 'final date must be higher than initial date'});


        const result = await this._sequelize.query(` SELECT Profiles.id, Profiles.firstName || ' ' || Profiles.lastName fullName, SUM(price) paid
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
    
      return result

      } catch (error) {
        throw new Error('getClients admin: ' +  error.message);
      }
   }
    
}