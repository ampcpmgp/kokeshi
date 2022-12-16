import Home from './routes/Home.svelte'

export const routes = {
    // Exact path
    '/': Home,

    // Catch-all
    '*': Home,
}