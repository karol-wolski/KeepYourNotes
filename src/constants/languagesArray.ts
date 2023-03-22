interface ILanguageObj {
  id: number
  value: string
  name: string
  translateId: string
}

export type languageArray = ILanguageObj[]

const LANGUAGE_ARRAY: languageArray = [
  {
    id: 1,
    value: 'pl',
    name: 'Polish',
    translateId: 'app.polish',
  },
  {
    id: 2,
    value: 'en',
    name: 'English',
    translateId: 'app.english',
  },
]

export { LANGUAGE_ARRAY }
