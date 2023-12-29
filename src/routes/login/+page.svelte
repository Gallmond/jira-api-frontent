<script lang="ts">
    import { getAuthUrl } from "$lib/client/Api";
    import { goto } from "$app/navigation";
	import { timeBetween } from "$lib/utils/utils.js";

    export let data

    const authClick = () => {
        const now = new Date().valueOf().toString()
        window.localStorage.setItem('state', now)
        goto(getAuthUrl(now))
    }

    

</script>
<p>
    Click here to authorise with Atlassian
</p>

{#if data.validTokens && data.validUntil}
    <p>You are already logged in. Valid until {data.validUntil.toISOString()} ({timeBetween(data.validUntil)})</p>
{/if}

<button on:click={authClick}>Auth</button>