<script lang="ts">
	import { goto } from '$app/navigation';

    export let data

    console.log({data})

    const projectLink = (siteId: string, projectKey: string) => {
        goto(`/jira/${siteId}/${projectKey}`)
    }

</script>

<h1>Resources & Projects</h1>

{#each data.resources as resource }
    <h2>{resource.name} | <a href={resource.url}>link</a></h2>
    <ul>
        {#each resource.projects as project}
        <li>{project.key} | {project.name} | {project.id} | <button on:click={() => projectLink(resource.id, project.key)}>open</button></li>            
        {/each}
    </ul>
{/each}
