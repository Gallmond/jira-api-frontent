<script lang="ts">
	import { jiraColor } from "$lib/utils/utils";

    export let status: Status

    const colorHex = jiraColor(status.statusCategory.colorName)
</script>

<div style="background-color: {colorHex}">{status.name}</div>

<style>
    div{
        border-radius: 4px;
        padding: 4px;
        color: white
    }
</style>