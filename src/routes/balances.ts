import { Router, Request, Response } from 'express';

const router = Router();

// define todo endpoints
router.post('/deposit/:userId', todoFunction);

async function todoFunction(req: Request, res: Response) {
    res.send('Hello World!');
}

export default router;