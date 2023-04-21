import { renderHook, act } from '@testing-library/react'
import useCategories from './useCategories'
import * as useFetchHook from './useFetch'

const mockDataObj = {
  _id: '1',
  name: 'travel',
}

const mockDataObj2 = {
  _id: '2',
  name: 'work',
}

const mockValue = {
  data: [mockDataObj],
  errors: '',
  isLoading: false,
  refresh: jest.fn(),
  fetchData: jest.fn(),
  successMsg: '',
  clearSuccessMsg: jest.fn(),
  statusCode: undefined,
}

const useFetchSpy = jest.spyOn(useFetchHook, 'default')

describe('useCategories', () => {
  beforeEach(() => {
    useFetchSpy.mockReturnValue(mockValue)
  })

  test('should render initial state', () => {
    const { result } = renderHook(useCategories)
    expect(result.current.categories).toStrictEqual([mockDataObj])
    expect(result.current.errors).toBe('')
    expect(result.current.isLoading).toBe(false)
  })

  test('should update categories', () => {
    const { result } = renderHook(useCategories)
    expect(result.current.categories).toStrictEqual([mockDataObj])
    act(() => result.current.update([mockDataObj, mockDataObj2]))
    expect(result.current.categories).toStrictEqual([mockDataObj, mockDataObj2])
    expect(result.current.errors).toBe('')
    expect(result.current.isLoading).toBe(false)
  })
})
