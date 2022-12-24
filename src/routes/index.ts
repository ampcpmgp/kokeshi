import Home from './Home.svelte'
import Emotion from './Emotion.svelte'
import Free from './Free.svelte'
import EmailAuth from './EmailAuth.svelte'
import Law from './Law.svelte'
import About from './About.svelte'

export const routes = {
    // Exact path
    '/': Home,
		"/emotion": Emotion,
		"/free": Free,
		"/email-auth": EmailAuth,
		"/law": Law,
		"/about": About,

    // Catch-all
    '*': Home,
}