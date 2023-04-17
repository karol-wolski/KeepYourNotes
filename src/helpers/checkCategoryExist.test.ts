import { checkCategoryExist } from './checkCategoryExist'

describe('checkCategoryExist', () => {
  const array = [
    { _id: '1', name: 'travel' },
    { _id: '2', name: 'cooking' },
  ]
  test('should return true, because category exist in array', () => {
    expect(checkCategoryExist(array, { name: 'travel' })).toBe(true)
  })

  test('should return false, because category does not exist in array', () => {
    expect(checkCategoryExist(array, { name: 'all' })).toBe(false)
  })
})
