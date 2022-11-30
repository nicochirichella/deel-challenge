import { Router, Request, Response } from "express";
import * as balanceController from "../controllers/balance";

const router = Router();

// define todo endpoints
router.post("/deposit/:userId", balanceController.depositTo);

export default router;
