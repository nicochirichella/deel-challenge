import { Request, Response } from 'express';
import * as contractService from '../services/contract';

export const getContract = async (req: Request, res: Response) => {
    const profile = req.app.get('profile');
    const id =  Number(req.params.id);
    const contract = await contractService.getContractById(id, profile.id)
    if(!contract) return res.status(404).end()
    res.json(contract)
}

export const getContracts = async (req: Request, res: Response) => {
    const profile = req.app.get('profile');
    const contracts = await contractService.getContracts(profile.id)
    res.json(contracts)
}
