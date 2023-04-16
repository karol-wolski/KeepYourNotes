import { localStorageMock } from '../test/mocks/LocalStorageMock'
import { isAuthorized } from './isAuthorized'
import { addToLocalStorage } from './localStorage'

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('isAuthorized', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  test('should return true', () => {
    addToLocalStorage('token', 'h54dergf')
    expect(isAuthorized()).toEqual(true)
  })

  test('should return false', () => {
    expect(isAuthorized()).toEqual(false)
  })
})
