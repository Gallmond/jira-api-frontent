import { PUBLIC_ATLASSIAN_CLIENT_ID, PUBLIC_ATLASSIAN_AUTH_REDIRECT_URL } from "$env/static/public"
import type { Cookies } from "@sveltejs/kit"

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
    public valid_until: Date

    constructor(access_token: string, refresh_token: string, expires_in: string){
        this.access_token = access_token
        this.refresh_token = refresh_token
        this.expires_in = parseInt(expires_in)
        this.valid_until = new Date(Date.now() + (this.expires_in * 1000))
    }

    public isExpired = (): boolean => new Date() > this.valid_until

    public clear = (cookies: Cookies): this => {
        const opts = {secure: true, httpOnly: true, path: '/'}
        cookies.delete('access_token', opts)
        cookies.delete('refresh_token', opts)
        cookies.delete('expires_in', opts)
        cookies.delete('valid_until', opts)

        return this
    }

    public store = (cookies: Cookies): this => {
        console.log('Tokens.store')
        const opts = {secure: true, httpOnly: true, path: '/'}
        cookies.set('access_token', this.access_token, opts)
        cookies.set('refresh_token', this.refresh_token, opts)
        cookies.set('expires_in', this.expires_in.toString(), opts)
        cookies.set('valid_until', this.valid_until.valueOf().toString(), opts)

        return this
    }

    public static stored = (cookies: Cookies): Tokens | null => {
        const access_token = cookies.get('access_token')
        const refresh_token = cookies.get('refresh_token')
        const expires_in = cookies.get('expires_in')
        const valid_until = cookies.get('valid_until')
        
        if(!access_token || !refresh_token || !expires_in || !valid_until){
            return null
        }

        const inst = new this(access_token, refresh_token, expires_in)
        inst.valid_until = new Date(parseInt(valid_until))

        return inst
    }

    
}

const getAuthUrl = (state: string): string => {
    const scopes = [
        'read:me',
        'read:account',
        'read:jira-work',
        'read:jira-user',
        'read:workflow:jira', // required to read statuses
        'offline_access' // required for refresh tokens
    ]

    const params = new URLSearchParams({
        state,
        audience: 'api.atlassian.com',
        client_id: PUBLIC_ATLASSIAN_CLIENT_ID,
        scope: scopes.join(' '),
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