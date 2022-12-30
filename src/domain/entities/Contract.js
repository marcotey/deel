const {Sequelize, Model} = require('sequelize');

class Contract extends Model {
  static init(sequelize){
    super.init(
    {
      terms: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      status:{
        type: Sequelize.ENUM('new','in_progress','terminated')
      }
    },
    {
      sequelize,
      modelName: 'Contract'
    }
  );

  }
  static associate(models){
    this.belongsTo(models.Profile, {as: 'Contractor'})
    this.belongsTo(models.Profile, {as: 'Client'})
    this.hasMany(models.Job)
}
}







module.exports = {Contract};