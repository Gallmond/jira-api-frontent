import { getParentIssues } from '$lib/server/Api.js'

export async function load({params, cookies}) {
    const siteId = params['siteId'] as string
    const projectKey = params['projectKey'] as string

    const parentIssues = await getParentIssues(cookies, siteId, projectKey)

    return {siteId, projectKey, parentIssues}
}