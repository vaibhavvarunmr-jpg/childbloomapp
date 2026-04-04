import { generateWeeklyInsight, generateAskAiResponse } from '../services/aiService.js';
import { weeklyInsightSchema } from '../validators/aiValidators.js';
import { z } from 'zod';

const askSchema = z.object({
  question: z.string().min(1).max(1000),
  child_name: z.string().optional().nullable(),
  age_in_days: z.number().optional().nullable(),
  gender: z.string().optional().nullable(),
});

export async function postWeeklyInsight(req, res, next) {
  try {
    const parsed = weeklyInsightSchema.parse(req.body);
    const insight = await generateWeeklyInsight(parsed);

    res.json({ data: { insight } });
  } catch (err) {
    if (err.name === 'ZodError') {
      return res.status(400).json({
        error: { message: 'Invalid request data', details: err.errors },
      });
    }
    next(err);
  }
}

export async function postAskAi(req, res, next) {
  try {
    const parsed = askSchema.parse(req.body);
    const answer = await generateAskAiResponse(parsed);

    res.json({ answer });
  } catch (err) {
    if (err.name === 'ZodError') {
      return res.status(400).json({
        error: { message: 'Invalid request data', details: err.errors },
      });
    }
    next(err);
  }
}
