import { Tokens } from '$lib/client/Api.js'
import { authHeaders, getStatuses } from '$lib/server/Api.js'

export async function load({cookies, request}){



    const tokens = Tokens.stored(cookies)

    const headers = tokens === null
        ? {}
        : await authHeaders(cookies)
    

    return {
        tokens: tokens === null ? null : {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expires_in: tokens.expires_in,
            valid_until: tokens.valid_until
        },
        headers,
    }
}