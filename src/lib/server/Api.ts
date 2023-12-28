/**
 * Anything that deals with sensitive information or external
 * API requests must go in here.
 * 
 * The /api/something/+server.ts pages can use this
 */

import { PUBLIC_ATLASSIAN_AUTH_REDIRECT_URL, PUBLIC_ATLASSIAN_CLIENT_ID } from "$env/static/public"
import { PRIVATE_ATLASSIAN_SECRET } from "$env/static/private"
import { Tokens } from "$lib/client/Api"
import { error } from "@sveltejs/kit"

const urls = {
    api: 'https://api.atlassian.com/ex/jira',
    authorize: 'https://auth.atlassian.com/authorize',
    sites: 'https://api.atlassian.com/oauth/token/accessible-resources',
    tokens: 'https://auth.atlassian.com/oauth/token',
}

const jsonHeaders = {accept: 'application/json', 'Content-Type': 'application/json'}

class AuthError extends Error{}

const getTokens = async (code: string): Promise<Tokens> => {
    const bodyParams: Record<string, string> = {
        client_id: PUBLIC_ATLASSIAN_CLIENT_ID,
        client_secret: PRIVATE_ATLASSIAN_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: PUBLIC_ATLASSIAN_AUTH_REDIRECT_URL,
        code
    }

    const res = await fetch(urls.tokens, {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify(bodyParams)
    })

    console.debug('getTokens ', {ok: res.ok, status: res.status, statusText: res.statusText})

    // if(!res.ok) throw new AuthError('Failed to get tokens')
    if(!res.ok) error(401, 'Failed to get tokens')

    const { access_token, refresh_token, expires_in } = await res.json()

    return new Tokens(access_token, refresh_token, expires_in)
}

export {
    getTokens
}