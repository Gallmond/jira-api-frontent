<script lang="ts">
    export let data

    const {
        access_token,
        refresh_token,
        expires_in,
        valid_until,
        headers,
    } = data

    let dateString = ''

    if(valid_until){
        console.log({valid_until})

        const now = new Date()
        const validUntilDate = new Date(parseInt(valid_until))

        const diffMilliseconds = Math.abs(now.valueOf() - validUntilDate.valueOf())
        const diffMinutes = Math.floor((diffMilliseconds / 1000) / 60)
        
        const validUntilDateString = validUntilDate.toISOString()

        dateString = `(${validUntilDateString} ie ${diffMinutes} minutes)`
    }
    
</script>
<textarea>
// cookiesTokens {dateString}
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