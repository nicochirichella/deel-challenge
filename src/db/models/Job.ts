import { Model, TEXT, DECIMAL, BOOLEAN, DATE } from 'sequelize';
import sequelize from '../dbSetup';

class Job extends Model {
    declare id: number;
    declare ContractId: number;
    declare price: number;
    declare paid: boolean;
    declare paymentDate: Date;
    declare createdAt: Date;
    declare updatedAt: Date;

    static associate(models: any) {
        Job.belongsTo(models.Contract);
    }
}

Job.init(
    {
      description: {
        type: TEXT,
        allowNull: false
      },
      price:{
        type: DECIMAL(12,2),
        allowNull: false
      },
      paid: {
        type: BOOLEAN,
        defaultValue: false
      },
      paymentDate:{
        type: DATE
      }
    },
    {
      sequelize,
      modelName: 'Job'
    }
  );

export default Job;