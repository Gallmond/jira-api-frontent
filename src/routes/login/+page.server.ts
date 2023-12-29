import { Tokens } from '$lib/client/Api.js';

export async function load({cookies}){

    // do we have valid tokens in the cookies?
    const tokens = Tokens.stored(cookies)

    const validTokens = tokens && !tokens.isExpired()

    const validUntil: Date | null = validTokens
        ? new Date(tokens.valid_until)
        : null

    return {
        validTokens,
        validUntil,
    }
}