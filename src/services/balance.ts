import { Op } from "sequelize";
import sequelize from "../db/dbSetup";
import * as ContractService from "./contract";
import Job from "../db/models/Job";
import Profile from "../db/models/Profile";

export const getClientDebt = async (profileId: number) => {
  const contracts = await ContractService.getActiveContractsForClient(
    profileId
  );
  const contractIds = contracts.map((contract: any) => contract.id);

  const debt = await Job.sum("price", {
    where: {
      ContractId: {
        [Op.in]: contractIds,
      },
      paid: false,
    },
  });
  return debt;
};

function validateDepositLimit(deposit: number, debt: number) {
  const depositLimit = 0.25 * debt;
  if (deposit > depositLimit) {
    throw new Error(`Deposit limit exceeded. Max deposit is ${depositLimit}`);
  }
}

export const updateBalance = async (
  depositorProfile: Profile,
  userId: number,
  amount: number
) => {
  if (depositorProfile.type === "client") {
    console.log("client deposit");
    const debt = await getClientDebt(depositorProfile.id);
    console.log("the debt is ", debt);
    validateDepositLimit(amount, debt);
  }

  const t = await sequelize.transaction();
  const options = { transaction: t, lock: t.LOCK.UPDATE };

  try {
    const receiverProfile = await Profile.findByPk(userId, options);
    if (!receiverProfile) return false;

    const updatedProfile = await receiverProfile.update(
      {
        balance: receiverProfile.balance + amount,
      },
      options
    );

    await t.commit();
    return updatedProfile.balance;
  } catch (error) {
    console.log("unlocking db for error: ", error);
    await t.rollback();
    throw error;
  }
};
