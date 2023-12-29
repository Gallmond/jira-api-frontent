<script lang="ts">
	import { timeBetween } from '$lib/utils/utils.js';

    export let data

    const {
        tokens,
        headers,
    } = data

    let validUntilString = ''
    let timeRemainingString = ''
    if(tokens){
        validUntilString = tokens.valid_until.toLocaleString()
        timeRemainingString = timeBetween(tokens.valid_until)
    }
</script>

{#if tokens}
<h2>Tokens {validUntilString} ({timeRemainingString})</h2>

<textarea>
    {JSON.stringify(tokens, null, 2)}
</textarea>
{/if}

<h2>AuthHeaders</h2>
<textarea>
{JSON.stringify(headers, null, 2)}
</textarea>

<style>
    textarea {
        flex: 1
    }
</style>