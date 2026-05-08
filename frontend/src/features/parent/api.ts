import { createClient } from '@/lib/supabase/client'

export interface ChildRow {
  child_profile_id: string
  display_name: string
  created_at: string
}

export async function createParentProfile(email: string, displayName: string) {
  const supabase = createClient()
  return supabase.rpc('create_parent_profile', {
    parent_email:        email,
    parent_display_name: displayName,
  })
}

export async function listMyChildren(): Promise<ChildRow[]> {
  const supabase = createClient()
  const { data, error } = await supabase.rpc('list_my_children')
  if (error || !data) return []
  return data as ChildRow[]
}

export async function createChildProfile(displayName: string, plainCode: string) {
  const supabase = createClient()
  return supabase.rpc('create_child_profile', {
    child_display_name: displayName,
    plain_code:         plainCode,
  })
}
