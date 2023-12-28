<script lang="ts">
    export let issue: ProjectIssue

    const updatedString = new Date(issue.updatedAt)
        .toUTCString()
    
    let barExpanded = true
    const expandBar = () => {
        console.log({barExpanded})
        barExpanded = !barExpanded
    }
</script>

<div class="container">
    <div class="top-bar">
        <button on:click={expandBar}>expand</button> | 
        <div class="key">{issue.key}</div> | 
        <div class="summary">{issue.summary}</div> | 
        <div class="status">{issue.status}</div> | 
        <div class="updated">{updatedString}</div>
        <div class="subtask-count">subtasks: {issue.subtasks.length}</div>
    </div>

    {#if barExpanded}
        <div class="main-stuff">
            Main stuff
        </div>
        <div>
            Sub issue list
        </div>
    {/if}

</div>


<style>
    .container{
        padding: 4px;
        border: 1px solid black;
        border-radius: 4px;
    }

    .top-bar{
        display: flex;
        flex-direction: row;
        gap: 4px;
        align-items: center;
    }

    .subtask-count{
        margin-left: auto;
    }
</style>