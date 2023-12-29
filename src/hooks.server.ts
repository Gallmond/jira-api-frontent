import { Tokens } from '$lib/client/Api'
import { refreshTokens } from '$lib/server/Api'
import type { RequestEvent } from '@sveltejs/kit'

/**
 * User must have valid tokens to reach these routes
 */
const protectedRoutes = [
    '/projects',
    '/jira'
]


/** @type {import('@sveltejs/kit').Handle} */
export async function handle({event, resolve}){

    /**
     * Add tokens to local. If they exist but are expired, attempt to refresh 
     */
    await addTokensToLocal(event)

    /**
     * check if we're trying to access a protected route while the user has no
     * tokens
     */
    if(shouldRedirect(event)){
        return new Response(null, {
            status: 300,
            headers: {location: '/login'}
        })
    }

    /**
     * For convenience add the slugs to locals //TODO maybe remove this
     */
    addSlugsToLocal(event)

    return await resolve(event)
}

const addSlugsToLocal = (event: RequestEvent) => {
    if(event.params['siteId']){
        event.locals.siteId = event.params['siteId']
    }
    if(event.params['projectKey']){
        event.locals.projectKey = event.params['projectKey']
    }
}

const addTokensToLocal = async (event: RequestEvent) => {
    let tokens = Tokens.stored(event.cookies)
    if(tokens !== null && tokens.isExpired()){
        tokens = await refreshTokens(tokens.refresh_token)
        tokens.store(event.cookies)
    }
    event.locals.tokens = tokens ?? undefined
}

const shouldRedirect = (event: RequestEvent) => {
    if(event.locals.tokens) return false

    for(const protectedRoute of protectedRoutes){
        if(event.url.pathname.startsWith(protectedRoute)){
            return true
        }
    }

    return false
}