
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          name: string
          role: 'company' | 'interviewer' | 'candidate' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          role: 'company' | 'interviewer' | 'candidate' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: 'company' | 'interviewer' | 'candidate' | 'admin'
          updated_at?: string
        }
      }
      resumes: {
        Row: {
          id: string
          user_id: string
          file_name: string
          file_path: string
          parsed_data: any
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          file_name: string
          file_path: string
          parsed_data?: any
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          file_name?: string
          file_path?: string
          parsed_data?: any
        }
      }
      interviews: {
        Row: {
          id: string
          candidate_id: string
          interviewer_id: string
          company_id: string
          scheduled_at: string
          status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
          interview_data: any
          created_at: string
        }
        Insert: {
          id?: string
          candidate_id: string
          interviewer_id: string
          company_id: string
          scheduled_at: string
          status?: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
          interview_data?: any
          created_at?: string
        }
        Update: {
          id?: string
          candidate_id?: string
          interviewer_id?: string
          company_id?: string
          scheduled_at?: string
          status?: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
          interview_data?: any
        }
      }
    }
  }
}
