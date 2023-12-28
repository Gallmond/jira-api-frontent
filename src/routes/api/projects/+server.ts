/** @type {import('./$types').RequestHandler} */
export function GET({url}){
    const params = (url as URL).searchParams

    // make the api request to jira for this

    const sites = [
        {
            id: 'aaaa-bbbb-cccc-dddd',
            name: 'cool site',
            url: 'https://cool-domain.com'
        },
        {
            id: '1111-2222-3333-4444',
            name: 'awesome site',
            url: 'https://awesome-domain.com'
        },
        {
            id: '5555-6666-7777-8888',
            name: 'amazing site',
            url: 'https://amazing-domain.com'
        },
        {
            id: '9999-0000-1111-2222',
            name: 'fantastic site',
            url: 'https://fantastic-domain.com'
        }
    ]

    return new Response(JSON.stringify({sites}))
}