<script lang="ts">
    import AtlassianDocResolver from "./AtlassianDocResolver.svelte";
    import KeyBlock from "./KeyBlock.svelte";
    import StatusBlock from "./StatusBlock.svelte";
    import PersonBlock from "./PersonBlock.svelte";
	import LabelBlock from "./LabelBlock.svelte";

    export let asSubtask: boolean = false
    export let issue: IssueSearchResult

    console.log('rendering issue bar', {issue})

    const {
        key,
        fields,
    } = issue

    const {
        summary,
        status,
    } = fields

    let subtasks = asSubtask
        ? []
        : issue.fields.subtasks

    let descriptionDoc = issue.fields.description ?? null

    let expanded = true
    const expandClicked = () => {
        expanded = !expanded
    }

    let subTasksExpanded = false
    const expandSubtasks = () => {
        subTasksExpanded = !subTasksExpanded
    }

</script>


<div class="container {asSubtask ? 'subtask-container' : ''}">
    <div class="basic-info">
        <KeyBlock key={key} />
        <div>{summary}</div>
        <StatusBlock status={status} />
        <button on:click={expandClicked}>{expanded ? 'Collapse' : 'Expand'}</button>
        {#if subtasks.length > 0}
            <div class="subtask-count">({subtasks.length})</div>
        {/if}
    </div>

    {#if expanded && !asSubtask}
        <div class="expanded-zone">
            <div class="info">
                <div class="description">
                    <h3>Description</h3>
                    {#if descriptionDoc === null}
                        <div>No description</div>
                    {:else}
                        <AtlassianDocResolver doc={descriptionDoc} />
                    {/if}
                </div>
                <div class="meta-info">
                    <h3>Additional</h3>
                    <div class="meta-holder">
                        <div>Assignee: </div>
                        {#if issue.fields.assignee}
                            <PersonBlock user={issue.fields.assignee} />
                        {/if}
                    </div>
                    <div class="meta-holder">
                        <div>Reporter: </div>
                        {#if issue.fields.reporter}
                            <PersonBlock user={issue.fields.reporter} />
                        {/if}
                    </div>
                    <div class="meta-holder">
                        <div>labels: </div>
                        {#each issue.fields.labels as label}
                            <LabelBlock label={label} />
                        {/each}
                    </div>
                </div>
            </div>
            <div class="subtasks">
                <h3>Subtasks <button on:click={expandSubtasks}>{subTasksExpanded ? 'collapse' : 'expand'}</button></h3>
                {#if subTasksExpanded}
                    {#each subtasks as subtask}
                        <svelte:self asSubtask={true} issue={subtask} />
                    {/each}
                {/if}
            </div>
        </div>
    {/if}
</div>

<style>
    .subtasks{
        border-left: 1px solid gray;
        padding-left: 4px
    }

    .meta-holder{
        padding-bottom: 4px;
        border-bottom: 1px solid gray;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 4px;
        justify-content: space-between;
    }

    .info{
        display: flex;
        flex-direction: row;
    }
    .description{
        flex: 2;
        padding: 4px;
    }
    .meta-info{
        flex: 1;
        padding: 4px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        
    }

    .subtask-count{
        margin-left: auto
    }

    .basic-info{
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: left;
        align-items: center;
        gap: 14px
    }

    .container{
        display: flex;
        flex-direction: column;
        background-color: aliceblue;
        padding: 8px;
        border-radius: 8px;
    }

    .subtask-container{
        background-color: #e7f0f7;
    }
</style>