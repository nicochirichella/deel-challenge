import { Op } from "sequelize";
import sequelize from "../db/dbSetup";
import Job from "../db/models/Job";
import Profile from "../db/models/Profile";
import * as ContractService from "./contract";

export const getUnpaidJobs = async (profileId: number) => {
  const contracts = await ContractService.getActiveContracts(profileId);
  const contractIds = contracts.map((contract: any) => contract.id);
  const jobs = await Job.findAll({
    where: {
      ContractId: {
        [Op.in]: contractIds,
      },
      paid: false,
    },
  });
  return jobs;
};

export const getJobById = async (jobId: number, options: any = {}): Promise<Job|null>=> {
  const job = await Job.findOne({
    where: {
      id: jobId,
    },
    ...options,
  });
  return job;
};

export const payJob = async (jobId: number, profileId: number) => {
  const t = await sequelize.transaction();
  const options = { transaction: t, lock: t.LOCK.UPDATE };

  const job = await getJobById(jobId, options);
  if (!job) return false;

  const contract = await ContractService.getContractById(
    job.ContractId,
    profileId
  );
  if (!contract) return false;

  try {
    const client = await Profile.findByPk(contract.ClientId, options);
    const contractor = await Profile.findByPk(contract.ContractorId, options);

    if (!client || !contractor || client.balance < job.price) {
      await t.rollback();
      return false;
    }

    await job.update(
      {
        paid: true,
        paymentDate: new Date(),
      },
      { transaction: t }
    );

    await client.update(
      {
        balance: client.balance - job.price,
      },
      { transaction: t }
    );

    await contractor.update(
      {
        balance: contractor.balance + job.price,
      },
      { transaction: t }
    );

    await t.commit();
    return true;
  } catch (error) {
    await t.rollback();
    return false;
  }
};
