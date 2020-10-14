export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
    return true
}

export const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

export const removeLocalStorage = (key) => {
    localStorage.removeItem(key)
    return true
}

export const clearLocalStorage = () => {
    localStorage.clear()
}