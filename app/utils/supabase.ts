import { createClient } from '@supabase/supabase-js'

let supabaseClient: ReturnType<typeof createClient> | null = null

export function useSupabase() {
  if (supabaseClient) {
    return supabaseClient
  }

  const config = useRuntimeConfig()
  const supabaseUrl = config.public.supabaseUrl as string
  const supabaseKey = config.public.supabasePublishableKey as string

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL and key are required')
  }

  supabaseClient = createClient(supabaseUrl, supabaseKey)
  return supabaseClient
}

export async function uploadImage(file: File, bucket: string = 'images'): Promise<string> {
  const supabase = useSupabase()

  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
  const filePath = `${fileName}`

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    throw error
  }
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path)

  return publicUrl
}
