import { Request, Response } from "express";
import * as contractService from "../services/contract";

export const getContract = async (req: Request, res: Response) => {
    try {
        const profile = req.app.get("profile");
        const id = Number(req.params.id);
        const contract = await contractService.getContractById(id, profile.id);
        if (!contract) return res.status(404).end();
        res.status(200).json(contract);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

export const getContracts = async (req: Request, res: Response) => {
    try {
        const profile = req.app.get("profile");
        const contracts = await contractService.getContracts(profile.id);
        res.status(200).json(contracts);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
