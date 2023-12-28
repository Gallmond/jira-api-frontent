import { redirect } from "@sveltejs/kit"

const errorRedirect = (message: string): void => {
    const qs = new URLSearchParams({message}).toString()

    redirect(300, `/error?${qs}`)
}

export {
    errorRedirect
}