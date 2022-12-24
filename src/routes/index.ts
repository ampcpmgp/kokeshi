import Home from './Home.svelte'
import Emotion from './Emotion.svelte'
import Free from './Free.svelte'
import EmailAuth from './EmailAuth.svelte'

export const routes = {
    // Exact path
    '/': Home,
		"/emotion": Emotion,
		"/free": Free,
		"/email-auth": EmailAuth,

    // Catch-all
    '*': Home,
}