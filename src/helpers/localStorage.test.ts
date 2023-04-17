import { localStorageMock } from '../test/mocks/LocalStorageMock'
import { addToLocalStorage, clearLocalStorage, getFromLocalStorage, removeFromLocalStorage } from './localStorage'

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('localStorage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  test('addToLocalStorage', () => {
    const mockKey = 'name'
    const mockValue = 'John'
    addToLocalStorage(mockKey, mockValue)
    expect(localStorage.getItem(mockKey)).toEqual(mockValue)
  })

  test('getFromLocalStorage', () => {
    const mockKey = 'name'
    const mockValue = 'John'
    addToLocalStorage(mockKey, mockValue)
    expect(getFromLocalStorage(mockKey)).toEqual(mockValue)
  })

  test('removeFromLocalStorage', () => {
    const mockKey = 'name'
    const mockValue = 'John'
    const mockKey2 = 'surname'
    const mockValue2 = 'Doe'
    addToLocalStorage(mockKey, mockValue)
    addToLocalStorage(mockKey2, mockValue2)
    expect(removeFromLocalStorage(mockKey)).toEqual(undefined)
    expect(getFromLocalStorage(mockKey)).toEqual(undefined)
    expect(getFromLocalStorage(mockKey2)).toEqual(mockValue2)
  })

  test('clearLocalStorage', () => {
    const mockKey = 'name'
    const mockValue = 'John'
    const mockKey2 = 'surname'
    const mockValue2 = 'Doe'
    addToLocalStorage(mockKey, mockValue)
    addToLocalStorage(mockKey2, mockValue2)
    expect(clearLocalStorage()).toEqual(undefined)
    expect(getFromLocalStorage(mockKey)).toEqual(undefined)
    expect(getFromLocalStorage(mockKey2)).toEqual(undefined)
  })
})
