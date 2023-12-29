import { getTokens } from '$lib/server/Api.js'

export async function load({url, cookies}){
    const code = url.searchParams.get('code')
	const state = url.searchParams.get('state')

	//TODO how do we error handle this? The error call wasn't working.
	// fails to compile as it thinks it continues on after it
	let tokens = await getTokens(code as string)

	const opts = {secure: true, httpOnly: true, path: '/'}
	cookies.set('access_token', tokens.access_token, opts)
	cookies.set('refresh_token', tokens.refresh_token, opts)
	cookies.set('expires_in', tokens.expires_in.toString(), opts)
	cookies.set('valid_until', tokens.valid_until.toString(), opts)

    return {
        state, code
    }
}