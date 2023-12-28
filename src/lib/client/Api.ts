import { PUBLIC_ATLASSIAN_CLIENT_ID, PUBLIC_ATLASSIAN_AUTH_REDIRECT_URL } from "$env/static/public"

/**
 * things in here are safe to use on .svelte files 
 * 
 * ie. on the client-side
 * 
 * If they need to communicate to the backend for private 
 * stuff they should make fetch calls to the backend api routes
 */

const urls = {
    api: 'https://api.atlassian.com/ex/jira',
    authorize: 'https://auth.atlassian.com/authorize',
    sites: 'https://api.atlassian.com/oauth/token/accessible-resources',
    tokens: 'https://auth.atlassian.com/oauth/token',
}

class Tokens {
    public readonly access_token: string
    public readonly refresh_token: string
    public readonly expires_in: number
    public readonly valid_until: number

    constructor(access_token: string, refresh_token: string, expires_in: string){
        this.access_token = access_token
        this.refresh_token = refresh_token
        this.expires_in = parseInt(expires_in)
        this.valid_until = Date.now() + this.expires_in
    }

    public isExpired = (): boolean => Date.now() > this.valid_until
}

const getAuthUrl = (state: string): string => {
    const params = new URLSearchParams({
        state,
        audience: 'api.atlassian.com',
        client_id: PUBLIC_ATLASSIAN_CLIENT_ID,
        scope: 'read:me read:account read:jira-work read:jira-user offline_access',
        redirect_uri: PUBLIC_ATLASSIAN_AUTH_REDIRECT_URL,
        response_type: 'code',
        prompt: 'consent',
    })

    return `${urls.authorize}?${params.toString()}`
}

export {
    getAuthUrl,
    Tokens
}