import type { SupabaseClient } from '@supabase/supabase-js'

export type LeadUpsertPayload = {
  email: string
  name?: string | null
  organization?: string | null
  organization_type?: string | null
  lead_source: string
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
  ip_address?: string | null
  phone?: string | null
  notes?: string | null
}

export async function upsertLead(
  supabase: SupabaseClient,
  payload: LeadUpsertPayload
): Promise<{ id: string }> {
  const row: Record<string, unknown> = {
    email: payload.email.trim().toLowerCase(),
    lead_source: payload.lead_source,
  }
  if (payload.name != null && payload.name !== '') row.name = payload.name.trim()
  if (payload.organization != null) row.organization = payload.organization.trim() || null
  if (payload.organization_type != null) row.organization_type = payload.organization_type
  if (payload.utm_source != null) row.utm_source = payload.utm_source
  if (payload.utm_medium != null) row.utm_medium = payload.utm_medium
  if (payload.utm_campaign != null) row.utm_campaign = payload.utm_campaign
  if (payload.ip_address != null) row.ip_address = payload.ip_address
  if (payload.phone != null) row.phone = payload.phone.trim() || null
  if (payload.notes != null) row.notes = payload.notes

  const { data, error } = await supabase
    .from('leads')
    .upsert(row, { onConflict: 'email', ignoreDuplicates: false })
    .select('id')
    .single()

  if (error) throw error
  if (!data?.id) throw new Error('Lead upsert did not return id')
  return { id: data.id as string }
}

export async function getLeadIdByEmail(
  supabase: SupabaseClient,
  email: string
): Promise<string | null> {
  const { data, error } = await supabase
    .from('leads')
    .select('id')
    .eq('email', email.trim().toLowerCase())
    .maybeSingle()
  if (error) throw error
  return data?.id ?? null
}
