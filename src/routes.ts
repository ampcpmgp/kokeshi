import Home from './routes/Home.svelte'
import Emotion from './routes/Emotion.svelte'

export const routes = {
    // Exact path
    '/': Home,
		"/emotion": Emotion,

    // Catch-all
    '*': Home,
}