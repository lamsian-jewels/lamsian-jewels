import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

const emptyQuery = () => {
  const query: any = {
    select: () => query,
    order: () => query,
    eq: () => query,
    single: () => query,
    limit: () => query,
    then: (resolve: any) => Promise.resolve({ data: [], error: null }).then(resolve),
    catch: (fn: any) => Promise.resolve({ data: [], error: null }).catch(fn),
  }

  return query
}

const emptyFrom = () => emptyQuery()

const emptyAuth = {
  getSession: async () => ({ data: { session: null }, error: null }),
  signOut: async () => ({ error: null }),
  signInWithPassword: async () => ({ data: { session: null }, error: null }),
}

export const supabase: any = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : {
      from: emptyFrom,
      auth: emptyAuth,
    }

export type Product = {
  id: string
  name: string
  slug: string
  description: string
  price: number
  category: 'rings' | 'necklaces' | 'earrings' | 'bracelets' | 'anklets' | 'sets' | 'watches'
  images: string[]
  in_stock: boolean
  is_new: boolean
  is_featured: boolean
  material: string
  created_at: string
}

export type Order = {
  id: string
  customer_name: string
  customer_phone: string
  customer_location: string
  product_id: string
  product_name: string
  quantity: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  notes: string
  created_at: string
}
