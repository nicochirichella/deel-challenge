import { Router, Request, Response } from "express";
import { getContract, getContracts } from "../controllers/contract";

const router = Router();

router.get("/", getContracts);
router.get("/:id", getContract);

export default router;
