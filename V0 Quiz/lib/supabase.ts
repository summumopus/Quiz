import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export type Facility = {
  id: number
  name: string
  location: string
  country: string
  region: string
  specialty: string
  rating: number
  review_count: number
  accreditation: string[]
  price_range: string
  estimated_cost: number
  languages: string[]
  wait_time: string
  description: string
  contact_phone: string
  contact_email: string
  contact_website: string
  address: string
  established: string
  beds: string
  departments: string[]
  created_at: string
  updated_at: string
}

export type Treatment = {
  id: number
  facility_id: number
  name: string
  price_range: string
  duration: string
  recovery: string
  description: string
  created_at: string
  updated_at: string
}

export type Doctor = {
  id: number
  facility_id: number
  name: string
  specialty: string
  experience: string
  education: string
  languages: string[]
  image_url: string
  created_at: string
  updated_at: string
}

// Database functions
export const getFacilities = async (filters?: {
  treatment?: string
  budget?: number
  region?: string[]
  country?: string
}) => {
  let query = supabase.from("facilities").select("*")

  if (filters?.budget) {
    query = query.lte("estimated_cost", filters.budget * 1.2)
  }

  if (filters?.region && filters.region.length > 0) {
    query = query.in("region", filters.region)
  }

  if (filters?.country) {
    query = query.eq("country", filters.country)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching facilities:", error)
    return []
  }

  return data || []
}

export const getFacilityById = async (id: number) => {
  const { data, error } = await supabase.from("facilities").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching facility:", error)
    return null
  }

  return data
}

export const getTreatmentsByFacility = async (facilityId: number) => {
  const { data, error } = await supabase.from("treatments").select("*").eq("facility_id", facilityId)

  if (error) {
    console.error("Error fetching treatments:", error)
    return []
  }

  return data || []
}

export const getDoctorsByFacility = async (facilityId: number) => {
  const { data, error } = await supabase.from("doctors").select("*").eq("facility_id", facilityId)

  if (error) {
    console.error("Error fetching doctors:", error)
    return []
  }

  return data || []
}

export const searchFacilities = async (searchTerm: string) => {
  const { data, error } = await supabase
    .from("facilities")
    .select("*")
    .or(`name.ilike.%${searchTerm}%,specialty.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)

  if (error) {
    console.error("Error searching facilities:", error)
    return []
  }

  return data || []
}
