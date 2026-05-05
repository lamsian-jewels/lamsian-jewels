import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
