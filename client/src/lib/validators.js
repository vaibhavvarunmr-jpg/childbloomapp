import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signupSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const profileSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().optional(),
});

export const childSchema = z.object({
  name: z.string().min(1, 'Please enter a name'),
  date_of_birth: z.string().min(1, 'Please enter date of birth'),
  gender: z.enum(['male', 'female', 'other']),
});

export const pregnancySchema = z.object({
  name: z.string().optional(),
  due_date: z.string().min(1, 'Please enter due date'),
});

export const weeklyUpdateSchema = z.object({
  height_cm: z.number().positive().optional().nullable(),
  weight_kg: z.number().positive().optional().nullable(),
  mood: z.string().optional(),
  sleep_hours: z.number().min(0).max(24).optional().nullable(),
  sleep_quality: z.string().optional(),
  motor_milestone: z.string().optional(),
  new_skills: z.string().optional(),
  feeding_notes: z.string().optional(),
  concerns: z.string().optional(),
});

export const foodLogSchema = z.object({
  meal_type: z.string().min(1, 'Select meal type'),
  food_name: z.string().min(1, 'Enter food name'),
  quantity_ml: z.number().optional().nullable(),
  quantity_g: z.number().optional().nullable(),
  calories_approx: z.number().optional().nullable(),
  notes: z.string().optional(),
});

export const growthRecordSchema = z.object({
  record_date: z.string().min(1, 'Select a date'),
  height_cm: z.number().positive().optional().nullable(),
  weight_kg: z.number().positive().optional().nullable(),
  head_circumference_cm: z.number().positive().optional().nullable(),
  notes: z.string().optional(),
});

export const healthRecordSchema = z.object({
  record_type: z.string().min(1, 'Select record type'),
  record_date: z.string().min(1, 'Select a date'),
  title: z.string().min(1, 'Enter a title'),
  description: z.string().optional(),
  doctor_name: z.string().optional(),
  next_due_date: z.string().optional(),
});
