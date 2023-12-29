import { writable } from "svelte/store"
import { browser } from "$app/environment"

const defaultState = browser
    ? JSON.parse(localStorage.getItem('userState') ?? '{"loggedIn": false}')
    : {loggedIn: false}

const userState = writable<ClientUserState>(defaultState)

userState.subscribe(val => {
    console.log('userState changed', val)

    if(browser){
        console.log('writing to localStorage')
        localStorage.setItem('userState', JSON.stringify(val))
    } 
})

export default userState