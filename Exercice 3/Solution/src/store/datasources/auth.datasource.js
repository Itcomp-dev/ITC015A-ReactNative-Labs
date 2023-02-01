import { HttpClient } from ".";


export function signin(email, password) {
    return HttpClient.post('/api/auth/login', {email, password})
}

export function singup(email, password, firstName, lastName) {
    return HttpClient.post('/api/auth/register', {email, password, firstName, lastName})
}