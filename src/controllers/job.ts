import { Request, Response } from "express";
import * as jobService from "../services/job";
import logger from "../logger";

export const unpaidJobs = async (req: Request, res: Response) => {
  const profile = req.app.get("profile");
  try {
    const jobs = await jobService.getUnpaidJobs(profile.id);
    res.status(200).json(jobs);
  } catch (err) {
    logger.error(`Error in unpaidJobs: ${err} for profile ${profile.id}`);
    res.status(500).json(err);
  }
};

export const payJob = async (req: Request, res: Response) => {
  const profile = req.app.get("profile");
  const id = Number(req.params.job_id);
  try {
    const job = await jobService.payJob(id, profile.id);
    if (!job) return res.status(404).end();
    res.status(200).json(job);
  } catch (err) {
    logger.error(
      `Error in payJob: ${err} for profile ${profile.id} and job ${id}`
    );
    res.status(500).json(err);
  }
};
