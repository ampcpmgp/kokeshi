import { writable } from "svelte/store"

export function resolved (promise) {
	const resolved = writable(false)
	
	promise.finally(() => resolved.set(true))
	
	return resolved
}