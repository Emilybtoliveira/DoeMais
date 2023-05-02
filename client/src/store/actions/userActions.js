export function profile(payload) {
    return { type: 'PROFILE', payload:payload };
}

export function IdLogged(payload) {
    return { type: 'Id_LOGGED', payload:payload };
}

export function Location(payload) {
    return { type: 'LOCATION', payload:payload };
}


export function share(payload) {
    return { type: 'SHARE_SOLICITATION', payload:payload };
}