/**
 * Anything that deals with sensitive information or external
 * API requests must go in here.
 * 
 * The /api/something/+server.ts pages can use this
 */
import { PUBLIC_ATLASSIAN_AUTH_REDIRECT_URL, PUBLIC_ATLASSIAN_CLIENT_ID } from "$env/static/public"
import { PRIVATE_ATLASSIAN_SECRET } from "$env/static/private"
import { Tokens } from "$lib/client/Api"
import { error, type Cookies } from "@sveltejs/kit"
import type { throwIf } from "$lib/utils/utils"

class TokensExpiredError extends Error{}
class TokensRequiredError extends Error{}

const urls = {
    api: 'https://api.atlassian.com/ex/jira',
    authorize: 'https://auth.atlassian.com/authorize',
    sites: 'https://api.atlassian.com/oauth/token/accessible-resources',
    tokens: 'https://auth.atlassian.com/oauth/token',
    revoke: 'https://auth.atlassian.com/oauth/token/revoke'
}

const jsonHeaders = {accept: 'application/json', 'Content-Type': 'application/json'}

const tokenRequest = async (bodyParams: Record<string, string>): Promise<Tokens> => {
    const res = await fetch(urls.tokens, {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify(bodyParams)
    })

    if(!res.ok) error(401, 'Failed to get tokens')

    const { access_token, refresh_token, expires_in } = await res.json()

    return new Tokens(access_token, refresh_token, expires_in)
}

const revokeToken = async (cookies: Cookies): Promise<boolean> => {
    console.log('revokeTokens')
    const tokens = Tokens.stored(cookies)

    if(tokens === null) return true

    tokens.clear(cookies)

    return true
}

const refreshTokens = async (refresh_token: string): Promise<Tokens> => {
    console.debug('refreshTokens')
    return await tokenRequest({
        refresh_token,
        grant_type: 'refresh_token',
        client_id: PUBLIC_ATLASSIAN_CLIENT_ID,
        client_secret: PRIVATE_ATLASSIAN_SECRET,
    })
}

const getTokens = async (code: string): Promise<Tokens> => {
    console.debug('getTokens')
    return await tokenRequest({
        code,
        client_id: PUBLIC_ATLASSIAN_CLIENT_ID,
        client_secret: PRIVATE_ATLASSIAN_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: PUBLIC_ATLASSIAN_AUTH_REDIRECT_URL,
    })
}

const authHeaders = async (cookies: Cookies, allowRefresh = true) => {
    let tokens = Tokens.stored(cookies)

    if(tokens === null) throw new TokensRequiredError('No tokens in cookies')

    if(tokens.isExpired()){
        if(!allowRefresh) throw new TokensExpiredError('Tokens exist but are expired')

        tokens = await refreshTokens(tokens.refresh_token)
        tokens.store(cookies)
    }

    return {
        ...jsonHeaders,
        authorization: `Bearer ${tokens.access_token}`
    }
}

export {
    getTokens,
    revokeToken,
    refreshTokens,
    authHeaders,
}