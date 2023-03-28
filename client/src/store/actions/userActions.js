export function profile(payload) {
    return { type: 'PROFILE', payload:payload };
}

export function emailLogged(payload) {
    return { type: 'EMAIL_LOGGED', payload:payload };
}