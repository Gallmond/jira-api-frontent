import { Tokens } from '$lib/client/Api.js'
import { authHeaders } from '$lib/server/Api.js'
import type { Cookies } from '@sveltejs/kit'

export async function load({cookies}){

    const tokens = Tokens.stored(cookies)

    const headers = tokens === null
        ? {}
        : await authHeaders(cookies)
    
    const access_token = cookies.get('access_token') ?? null
    const refresh_token = cookies.get('refresh_token') ?? null
    const expires_in = cookies.get('expires_in') ?? null
    const valid_until = cookies.get('valid_until') ?? null

    return {
        access_token,
        refresh_token,
        expires_in,
        valid_until,
        headers,
    }
}