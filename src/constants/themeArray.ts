interface IThemeObj {
  id: number
  value: string
  name: string
  translateId: string
}

export type themeArray = IThemeObj[]

const THEME_ARRAY: themeArray = [
  {
    id: 1,
    value: 'light',
    name: 'Light',
    translateId: 'app.light',
  },
  {
    id: 2,
    value: 'dark',
    name: 'Dark',
    translateId: 'app.dark',
  },
]

export { THEME_ARRAY }
