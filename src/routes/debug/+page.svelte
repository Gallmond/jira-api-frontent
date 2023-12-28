<script lang="ts">

    const getSites = async () => {
        const res = await fetch('/api/sites')
        const json = await res.json()

        console.log({json})
    }

</script>

<button on:click={getSites}>Get sites</button>