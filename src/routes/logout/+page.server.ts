import { revokeToken } from '$lib/server/Api.js';

export async function load({cookies}){
    return {
        loggedOut: await revokeToken(cookies)
    }
}