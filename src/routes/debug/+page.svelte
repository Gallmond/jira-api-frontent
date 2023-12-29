<script lang="ts">
    export let data

    const {
        access_token,
        refresh_token,
        expires_in,
        valid_until,
        headers,
    } = data

    const now = new Date()
    const validUntilDate = new Date(parseInt(valid_until ?? '0'))

    const diffMilliseconds = Math.abs(now.valueOf() - validUntilDate.valueOf())
    const diffMinutes = Math.floor((diffMilliseconds / 1000) / 60)
    
    const validUntilDateString = validUntilDate.toISOString()
</script>
<textarea>
// cookiesTokens ({validUntilDateString} ie {diffMinutes} minutes)
{JSON.stringify({
    access_token,
    refresh_token,
    expires_in,
    valid_until,
}, null, 2)}
// headers
{JSON.stringify(headers, null, 2)}
</textarea>

<style>
    textarea {
        flex: 1
    }
</style>