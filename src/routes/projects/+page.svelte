<script lang="ts">
	import { goto } from '$app/navigation';

    export let data

    let {projectUrls} = data

    const projectChanged = (e: Event) => {
        const target = e.target as HTMLSelectElement

        goto(target.value)
    }
</script>

<h1>This is the projects page</h1>

<select on:change={projectChanged}>
    {#each projectUrls as projectUrl}
    <option value="{projectUrl.url}">{projectUrl.name}</option>
    {/each}
</select>