export const getFromLocalStorage = (key: string) => localStorage.getItem(key)
export const addToLocalStorage = (key: string, value: number | string) =>
  localStorage.setItem(key, JSON.stringify(value))
export const removeFromLocalStorage = (key: string) => localStorage.removeItem(key)
export const clearLocalStorage = () => localStorage.clear()
