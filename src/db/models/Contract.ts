import { Model, TEXT, ENUM } from 'sequelize';
import sequelize from '../dbSetup';

class Contract extends Model {
    declare id: number;
    declare ClientId: number;
    declare ContractorId: number;
    declare status: string;
    declare terms: string;
    declare createdAt: Date;
    declare updatedAt: Date;

    static associate(models: any) {
        Contract.belongsTo(models.Profile, {as: 'Contractor'});
        Contract.belongsTo(models.Profile, {as: 'Client'})
        Contract.hasMany(models.Job);
    }
}

Contract.init(
    {
      terms: {
        type: TEXT,
        allowNull: false
      },
      status:{
        type: ENUM('new','in_progress','terminated')
      }
    },
    {
      sequelize,
      modelName: 'Contract'
    }
);

export default Contract;