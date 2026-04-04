import { createClient } from '@supabase/supabase-js';
import { config } from './env.js';

export const supabase = createClient(
  config.supabase.url || 'https://placeholder.supabase.co',
  config.supabase.serviceRoleKey || config.supabase.anonKey || 'placeholder-key'
);
