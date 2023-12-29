import { getIssues, getUser } from '$lib/server/Api.js'

export async function load({params, cookies}) {
    const siteId = params['siteId'] as string
    const projectKey = params['projectKey'] as string

    const user = await getUser(cookies, siteId)

    const issues = await getIssues(cookies, siteId, projectKey)

    return {siteId, projectKey}
}