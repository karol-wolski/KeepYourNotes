import { isEqual } from './isEqual'

describe('isEqual', () => {
  test('should return true for 2 and 2', () => {
    expect(isEqual(2, 2)).toBe(true)
  })

  test('should return false for 2 and 3', () => {
    expect(isEqual(2, 3)).toBe(false)
  })

  test('should return true for test and test', () => {
    expect(isEqual('test', 'test')).toBe(true)
  })

  test('should return false for test and tester', () => {
    expect(isEqual('test', 'tester')).toBe(false)
  })
})
