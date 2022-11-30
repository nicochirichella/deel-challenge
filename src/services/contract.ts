import { Op } from "sequelize";
import Contract from "../db/models/Contract";

export const getContractById = async (
  contractId: number,
  profileId: number
) => {
  const contract = await Contract.findOne({
    where: {
      id: contractId,
      [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
    },
  });
  return contract;
};

export const getContracts = async (profileId: number) => {
  const contracts = await Contract.findAll({
    where: {
      [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
      status: {
        [Op.not]: "terminated",
      },
    },
  });
  return contracts;
};

// Active contracts are contracts in status 'in_progress'
export const getActiveContracts = async (profileId: number) => {
  const contracts = await Contract.findAll({
    where: {
      status: "in_progress",
      [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
    },
  });
  return contracts;
};

export const getActiveContractsForClient = async (profileId: number) => {
  const contracts = await Contract.findAll({
    where: {
      status: "in_progress",
      ClientId: profileId,
    },
  });
  return contracts;
};
