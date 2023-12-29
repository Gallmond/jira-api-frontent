<script lang="ts">
	import IssueBar from '../../../../components/IssueBar.svelte';
	export let data

    const {
        parentIssues,
    } = data

    let sortedIssues = parentIssues.issues.sort((a, b) => new Date(a.fields.created) > new Date(b.fields.created) ? 1 : -1)

    console.log({parentIssues})
</script>

<h1>Issues</h1>
<p>These are issues with no parent</p>
<p>
    TODO: Need to update the api call to account for 'linked' issues, not just child issues / subtasks
    How to distinguish between an 'inbound' issue and an 'outbound' issue?
</p>

<div class="issues-holder">
    {#each sortedIssues as issue}
        <IssueBar issue={issue} />
    {/each}
</div>

<style>
    .issues-holder{
        display: flex;
        flex-direction: column;
        gap: 4px;
        background-color: grey;
    }
</style>

