<script lang="ts">
    import projectIssues from '$lib/stores/projectIssues.js';
	export let data

    const siteId = data.siteId
    const projectKey = data.projectKey

    let pageIssues = $projectIssues

    const getTopIssues = (issues: ProjectIssues): ProjectIssues => {
        return Object.entries(issues).reduce((carry, [key, data]) => {
            if(data.parent){
                return carry
            }

            carry[key] = data
            return carry
        }, {} as ProjectIssues)
    }

    $: topIssues = getTopIssues($projectIssues)
</script>

<p>
    This is the dynamic page that should list issues for this project. We have recieved:
</p>
<ul>
    <li>siteId: {siteId}</li>
    <li>projectKey: {projectKey}</li>
</ul>
<p>
    Note that if the projectkey gets encoded it will look like:
</p>
<h1>All issues</h1>
{#each Object.entries(pageIssues) as [key, data]}
    <div>
        key: {key}
        id: {data.id}
        status: {data.status}
        summary: {data.summary}
        subtasks: {data.subtasks.length}
    </div>
{/each}
<h1>Only issues with no parent (ie, top level)</h1>
{#each Object.entries(topIssues) as [key, data]}
    <div>
        key: {key}
        id: {data.id}
        status: {data.status}
        summary: {data.summary}
        subtasks: {data.subtasks.length}
    </div>
{/each}
