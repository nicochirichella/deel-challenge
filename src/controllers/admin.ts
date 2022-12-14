import { Request, Response } from "express";
import * as adminService from "../services/admin";
import logger from "../logger";

export const getClientsThayPaidMost = async (req: Request, res: Response) => {
  try {
    const start = String(req.query.start);
    const end = String(req.query.end);
    const limit = Number(req.query.limit);
    const clients = await adminService.clientsThatPaidTheMost(
      start,
      end,
      limit
    );

    res.json(clients);
  } catch (err) {
    logger.error(`Error in getClientsThayPaidMost: ${err}`);
    res.status(500).json(err);
  }
};

export const getBestProfession = async (req: Request, res: Response) => {
  try {
    const start = String(req.query.start);
    const end = String(req.query.end);
    const profession = await adminService.bestProfession(start, end);

    res.json(profession);
  } catch (err) {
    logger.error(`Error in getBestProfession: ${err}`);
    res.status(500).json(err);
  }
};
