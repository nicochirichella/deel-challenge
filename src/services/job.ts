import { Op } from 'sequelize';
import Job from '../db/models/Job';
import * as ContractService from './contract';

export const getUnpaidJobs = async (profileId: number) => {
    const contracts = await ContractService.getActiveContracts(profileId);
    const contractIds = contracts.map((contract: any) => contract.id);
    const jobs = await Job.findAll({
        where: {
            ContractId: {
                [Op.in]: contractIds
            },
            paid: false
        }
    })
    return jobs
}

export const getJobById = async (jobId: number) => {
    const job = await Job.findOne({
        where: {
            id: jobId
        }
    })
    return job
}

export const payJob = async (jobId: number, profileId: number) => {
    const job = await getJobById(jobId);
    if(!job) return false;

    const contract = await ContractService.getContractById(job.ContractId, profileId);
    if(!contract) return false;

    job.paid = true;
    job.paymentDate = new Date();
    await job.save();

    return true;
}
