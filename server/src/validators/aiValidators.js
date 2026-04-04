import { z } from 'zod';

export const weeklyInsightSchema = z.object({
  child_name: z.string().optional(),
  age_in_days: z.number().min(0).optional(),
  height_cm: z.union([z.string(), z.number()]).optional(),
  weight_kg: z.union([z.string(), z.number()]).optional(),
  mood: z.string().optional(),
  sleep_hours: z.union([z.string(), z.number()]).optional(),
  sleep_quality: z.string().optional(),
  motor_milestone: z.string().optional(),
  new_skills: z.string().optional(),
  feeding_notes: z.string().optional(),
  concerns: z.string().optional(),
});
