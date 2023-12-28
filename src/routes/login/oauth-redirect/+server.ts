import { getTokens } from '$lib/server/Api.js'
import { redirect } from '@sveltejs/kit'

export async function GET({url, cookies}) {
	const code = url.searchParams.get('code')
	const state = url.searchParams.get('state')

	let tokens = await getTokens(code as string)

	const cookieOpts = {
		path: '/',
		expires: new Date(tokens.valid_until),
	}
	cookies.set('access_token', tokens.access_token, cookieOpts)
	cookies.set('refresh_token', tokens.refresh_token, cookieOpts)
	cookies.set('expires_in', tokens.expires_in.toString(), cookieOpts)
	cookies.set('valid_until', tokens.valid_until.toString(), cookieOpts)

	// send them to the projects page
	redirect(300, '/projects')
}