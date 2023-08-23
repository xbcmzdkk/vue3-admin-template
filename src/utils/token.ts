export const setToken = (token:string) => {
    localStorage.setItem('k-token',token)
}

export const getToken = () => {
    return localStorage.getItem('k-token')
}

export const removeToken = () => {
    localStorage.removeItem('k-token')
}