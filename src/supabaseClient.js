import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if credentials are provided
export const hasSupabaseCredentials = !!(supabaseUrl && supabaseAnonKey)

// Create client only if credentials exist, otherwise use null
export const supabase = hasSupabaseCredentials 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
