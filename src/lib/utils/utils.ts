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

const jiraColor = (colorName: string): string => {
    const colors: Record<string, string> = {
        'blue-gray': '#0052CC',
        'green': '#36B37E',
        'yellow': '#FFAB00',
    }

    const hex = colors[colorName] ?? null

    if(hex === null) throw new Error(`Unknown color name: ${colorName}`)
    
    return hex
}


export {
    errorRedirect, timeBetween, jiraColor
}