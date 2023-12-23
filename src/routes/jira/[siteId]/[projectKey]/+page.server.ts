export async function load({params}) {
    const siteId = params['siteId'] as string
    const projectKey = params['projectKey'] as string

    return {siteId, projectKey}
}