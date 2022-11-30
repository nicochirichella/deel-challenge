import { Request, Response } from "express";
import * as balanceService from "../services/balance";
import logger from "../logger";

export const depositTo = async (req: Request, res: Response) => {
  const profile = req.app.get("profile");
  const userId = Number(req.params.userId);
  const amount = Number(req.body.amount);
  try {
    const balance = await balanceService.updateBalance(profile, userId, amount);

    res.status(200).json(balance);
  } catch (err) {
    logger.error(
      `Error in depositTo: ${err} for profile ${profile.id} and user ${userId}`
    );
    res.status(500).json(err);
  }
};
