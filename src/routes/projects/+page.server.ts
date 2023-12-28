/** @type {import('./$types').PageLoad} */
export async function load() {

    const sites = [
        {
            id: 'aaaa-bbbb-cccc-dddd',
            name: 'cool-site',
            siteUrl: 'https://cool-site.com',
            projects: [
                {id: 'pppp-11111', key: 'PROJ-100', name: 'cool project', url: 'https://jira.coolsite.com/proje'},
                {id: 'pppp-22222', key: 'PROJ-200', name: 'awesome project', url: 'https://jira.coolsite.com/proje'},
                {id: 'pppp-33333', key: 'PROJ-300', name: 'fantastic project', url: 'https://jira.coolsite.com/proje'},
                {id: 'pppp-44444', key: 'PROJ-400', name: 'amazing project', url: 'https://jira.coolsite.com/proje'},
                {id: 'pppp-55555', key: 'PROJ-500', name: 'excellent project', url: 'https://jira.coolsite.com/proje'},
                {id: 'pppp-66666', key: 'PROJ-600', name: 'super project', url: 'https://jira.coolsite.com/proje'},
            ],
        },
        {
            id: '1111-2222-3333-4444',
            name: 'another-site',
            siteUrl: 'https://another-site.com',
            projects: [
                {id: 'pppp-77777', key: 'PROJ-700', name: 'another project', url: 'https://jira.anothersite.com/proje'},
                {id: 'pppp-88888', key: 'PROJ-800', name: 'different project', url: 'https://jira.anothersite.com/proje'},
            ],
        },
        {
            id: '5555-6666-7777-8888',
            name: 'third-site',
            siteUrl: 'https://third-site.com',
            projects: [
                {id: 'pppp-99999', key: 'PROJ-900', name: 'third project', url: 'https://jira.thirdsite.com/proje'},
                {id: 'pppp-00000', key: 'PROJ-000', name: 'final project', url: 'https://jira.thirdsite.com/proje'},
            ],
        }
    ]

    const projectUrls = []
    for(const site of sites){
        for(const project of site.projects){
            projectUrls.push({
                name: project.name,
                url: `/jira/${site.id}/${project.key}`,
            })
        }
    }
    
    return {projectUrls};
}
