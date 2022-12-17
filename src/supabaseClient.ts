import { createClient } from '@supabase/supabase-js'
import { push } from "svelte-spa-router";
import { dataset_dev } from 'svelte/internal'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export const tokenP = supabase.auth.getSession().then(({ data, error }) => {
	if (error) throw error
	if (!data.session) {
		push("/")
	}
	return data.session.access_token
})
