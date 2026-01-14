import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 값이 제대로 들어왔는지 확인을 위한 로그 (배포 후 브라우저 콘솔에서 확인)
console.log('URL Check:', supabaseUrl)

// Check if credentials are provided
export const hasSupabaseCredentials = !!(supabaseUrl && supabaseAnonKey)

if (!hasSupabaseCredentials) {
  console.error('Supabase URL and Anon Key must be provided')
}

// Create client only if credentials exist
export const supabase = hasSupabaseCredentials
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
