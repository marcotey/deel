
const {Sequelize, Model} = require('sequelize');

class Profile extends Model {
  static init(sequelize){
    super.init(
      {
        firstName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        profession: {
          type: Sequelize.STRING,
          allowNull: false
        },
        balance:{
          type:Sequelize.DECIMAL(12,2)
        },
        type: {
          type: Sequelize.ENUM('client', 'contractor')
        }
      },
      {
        sequelize,
        modelName: 'Profile'
      }
    );
    
 
  }

  static associate(models){
    this.hasMany(models.Contract, {as :'Contractor',foreignKey:'ContractorId'})
    this.hasMany(models.Contract, {as : 'Client', foreignKey:'ClientId'})
  }
}



module.exports = {Profile};