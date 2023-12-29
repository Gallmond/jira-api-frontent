import { Tokens } from "$lib/client/Api"
import { redirect, type Cookies } from "@sveltejs/kit"

const errorRedirect = (message: string): void => {
    const qs = new URLSearchParams({message}).toString()

    redirect(300, `/error?${qs}`)
}

const timeBetween = (a: Date, b?: Date): string => {
    const diffMilliseconds = Math.abs(a.valueOf() - (b ?? new Date()).valueOf());
    const mm = Math.floor(diffMilliseconds / 60000).toString().padStart(2, '0')
    const ss = Math.floor((diffMilliseconds % 60000) / 1000).toString().padStart(2, '0')
    
    return `${mm}m ${ss}s`;
}


export {
    errorRedirect, timeBetween
}