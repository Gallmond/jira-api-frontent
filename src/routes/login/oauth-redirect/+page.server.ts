import { Tokens } from '$lib/client/Api.js'
import { getTokens } from '$lib/server/Api.js'

export async function load({url, cookies}){
    const code = url.searchParams.get('code')
	const state = url.searchParams.get('state')

	//TODO how do we error handle this? The error call wasn't working.
	// fails to compile as it thinks it continues on after it
	let tokens = await getTokens(code as string)

	tokens.store(cookies)

    return {
        state, code, loggedIn: !tokens.isExpired()
    }
}