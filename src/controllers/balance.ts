import { Request, Response } from "express";
import * as balanceService from "../services/balance";

export const depositTo = async (req: Request, res: Response) => {
    try { 
        const profile = req.app.get("profile");
        const userId = Number(req.params.userId);
        const amount = Number(req.body.amount);
        const balance = await balanceService.updateBalance(profile, userId, amount);
        
        res.status(200)
            .json(balance);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};