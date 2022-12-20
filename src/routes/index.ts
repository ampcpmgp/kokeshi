import Home from './Home.svelte'
import Emotion from './Emotion.svelte'
import Free from './Free.svelte'

export const routes = {
    // Exact path
    '/': Home,
		"/emotion": Emotion,
		"/free": Free,

    // Catch-all
    '*': Home,
}