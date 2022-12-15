export const getFromLocalStorage = (key: string) => localStorage.getItem(key)
export const addToLocalStorage = (key: string, value: string) => localStorage.setItem(key, value)
export const removeFromLocalStorage = (key: string) => localStorage.removeItem(key)
export const clearLocalStorage = () => localStorage.clear()
