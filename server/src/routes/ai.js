import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { postWeeklyInsight, postAskAi } from '../controllers/aiController.js';

const router = Router();

router.post('/weekly-insight', authenticateToken, postWeeklyInsight);
router.post('/ask', authenticateToken, postAskAi);

export default router;
