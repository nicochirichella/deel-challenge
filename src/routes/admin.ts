import { Router, Request, Response } from 'express';
import * as adminController from '../controllers/admin';

const router = Router();

// define todo endpoints
router.get('/best-profession', adminController.getBestProfession); // ?start=<date>&end=<date>
router.get('/best-clients', adminController.getClientsThayPaidMost); // ?start=<date>&end=<date>&limit=<integer>

export default router;