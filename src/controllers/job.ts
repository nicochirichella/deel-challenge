import { Request, Response } from "express";
import * as jobService from "../services/job";

export const unpaidJobs = async (req: Request, res: Response) => {
    try {
        const profile = req.app.get("profile");
        const jobs = await jobService.getUnpaidJobs(profile.id);
        res.status(200).json(jobs);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

export const payJob = async (req: Request, res: Response) => {
    try {
        const profile = req.app.get("profile");
        const id = Number(req.params.job_id);
        const job = await jobService.payJob(id, profile.id);
        if (!job) return res.status(404).end();
        res.status(200).json(job);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
