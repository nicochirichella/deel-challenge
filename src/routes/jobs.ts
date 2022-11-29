import { Router, Request, Response } from 'express';
import * as jobController from '../controllers/job';

const router = Router();

// define todo endpoints
router.get('/unpaid', jobController.unpaidJobs);
router.post('/:job_id/pay', jobController.payJob);

export default router;