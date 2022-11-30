import { Model, STRING, DECIMAL, ENUM } from "sequelize";
import sequelize from "../dbSetup";

class Profile extends Model {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare profession: string;
  declare balance: number;
  declare type: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  static associate(models: any) {
    Profile.hasMany(models.Contract, { as: "Client", foreignKey: "ClientId" });
    Profile.hasMany(models.Contract, {
      as: "Contractor",
      foreignKey: "ContractorId",
    });
  }
}

Profile.init(
  {
    firstName: {
      type: STRING,
      allowNull: false,
    },
    lastName: {
      type: STRING,
      allowNull: false,
    },
    profession: {
      type: STRING,
      allowNull: false,
    },
    balance: {
      type: DECIMAL(12, 2),
    },
    type: {
      type: ENUM("client", "contractor"),
    },
  },
  {
    sequelize,
    modelName: "Profile",
  }
);

export default Profile;
