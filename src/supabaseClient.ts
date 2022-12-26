import { createClient } from '@supabase/supabase-js'
import { push } from "svelte-spa-router";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function authenticate () {
	const {data, error} = await supabase.auth.getSession()
	
	if (error || !data.session) {
		console.info(error);
		console.info(data);
		
		push("/")
		return;
	}
}