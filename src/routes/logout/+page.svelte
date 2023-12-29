<script lang="ts">
	import { goto } from '$app/navigation';
	import userState from '$lib/stores/UserState.js';
	import { onMount } from 'svelte';

    export let data

    onMount(() => {
        if(data.loggedOut){
            setTimeout(() => {
                goto('/debug')
            }, 1000)
        }
    })

    const {
        loggedOut
    } = data

    $userState.loggedIn = !loggedOut
</script>

<h1>You have {loggedOut ? 'DEFINITELY' : 'NOT'} logged out!</h1>