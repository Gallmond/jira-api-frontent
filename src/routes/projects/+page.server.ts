import { getAccessibleResources, getProjects } from '$lib/server/Api.js';

/** @type {import('./$types').PageLoad} */
export async function load({cookies}) {

    const accessibleResources = await getAccessibleResources(cookies)

    const resources = []
    for(const r of accessibleResources){
        const resourceProjects = await getProjects(cookies, r.id)

        resources.push({
            name: r.name,
            url: r.url,
            id: r.id,
            projects: resourceProjects.values.map(p => {
                return {key: p.key, name: p.name, id: p.id}
            }),
        })
    }

    return {
        resources
    }
}
