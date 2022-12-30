const {Sequelize, Model} = require('sequelize');

class Job extends Model {
  static init(sequelize){
    super.init(
      {
        description: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        price:{
          type: Sequelize.DECIMAL(12,2),
          allowNull: false
        },
        paid: {
          type: Sequelize.BOOLEAN,
          default:false
        },
        paymentDate:{
          type: Sequelize.DATE
        }
      },
      {
        sequelize,
        modelName: 'Job'
      }
    );
  }

  static associate(models){
    this.belongsTo(models.Contract)
  }
}


module.exports = {Job};