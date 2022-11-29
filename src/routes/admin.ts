import { Router, Request, Response } from 'express';

const router = Router();

// define todo endpoints
router.get('/best-profession', todoFunction); // ?start=<date>&end=<date>
router.get('/admin/best-clients', todoFunction); // ?start=<date>&end=<date>&limit=<integer>

async function todoFunction(req: Request, res: Response) {
    res.send('Hello World!');
}

export default router;