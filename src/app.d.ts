// See https://kit.svelte.dev/docs/types#app

import type { Tokens } from "$lib/client/Api";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			tokens?: Tokens
			siteId?: string
			projectKey?: string
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
