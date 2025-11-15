import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import { Database } from './types/supabase'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // Check if Supabase is configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Only initialize Supabase if properly configured
  if (supabaseUrl && supabaseAnonKey && 
      supabaseUrl !== 'your-supabase-url' && 
      supabaseAnonKey !== 'your-supabase-anon-key') {
    try {
      const supabase = createMiddlewareClient<Database>({ req, res })
      await supabase.auth.getSession()
    } catch (error) {
      // If Supabase fails, just continue without it
      console.warn('Supabase middleware failed, continuing without auth:', error)
    }
  }
  
  return res
}