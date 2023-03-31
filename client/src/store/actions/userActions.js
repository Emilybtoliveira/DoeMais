export function profile(payload) {
    return { type: 'PROFILE', payload:payload };
}

export function IdLogged(payload) {
    return { type: 'Id_LOGGED', payload:payload };
}