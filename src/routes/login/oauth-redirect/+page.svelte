<script lang="ts">
	import { goto } from '$app/navigation';
	import userState from '$lib/stores/UserState.js';

    export let data

    const { state, loggedIn } = data

    $userState.loggedIn = loggedIn

    console.log({state})
</script>

<h1>You are logged in. Check out debug or projects</h1>
<button on:click={() => goto('/debug')}>Debug</button>
<button on:click={() => goto('/projects')}>Project</button>