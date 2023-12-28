<script lang="ts">
    import { getAuthUrl } from "$lib/client/Api";
    import { goto } from "$app/navigation";

    const authClick = () => {
        const now = new Date().valueOf().toString()
        window.localStorage.setItem('state', now)
        goto(getAuthUrl(now))
    }

</script>
<p>
    Click here to authorise with Atlassian
</p>
<button on:click={authClick}>Auth</button>