import { Request, Response } from "express";
import * as jobService from "../services/job";

export const unpaidJobs = async (req: Request, res: Response) => {
  const profile = req.app.get("profile");
  const jobs = await jobService.getUnpaidJobs(profile.id);

  res.json(jobs);
};

export const payJob = async (req: Request, res: Response) => {
  const profile = req.app.get("profile");
  const id = Number(req.params.job_id);
  const job = await jobService.payJob(id, profile.id);
  if (!job) return res.status(404).end();
  res.json(job);
};
