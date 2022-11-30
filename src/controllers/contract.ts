import { Request, Response } from "express";
import * as contractService from "../services/contract";
import logger from "../logger";

export const getContract = async (req: Request, res: Response) => {
  const profile = req.app.get("profile");
  const id = Number(req.params.id);
  try {
    const contract = await contractService.getContractById(id, profile.id);
    if (!contract) return res.status(404).end();
    res.status(200).json(contract);
  } catch (err) {
    logger.error(
      `Error in getContract: ${err} for profile ${profile.id} and contract ${id}`
    );
    res.status(500).json(err);
  }
};

export const getContracts = async (req: Request, res: Response) => {
  try {
    const profile = req.app.get("profile");
    const contracts = await contractService.getContracts(profile.id);
    res.status(200).json(contracts);
  } catch (err) {
    logger.error(`Error in getContracts: ${err}`);
    res.status(500).json(err);
  }
};
