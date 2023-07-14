import { renderHook, act } from '@testing-library/react'
import * as useFetchHook from './useFetch'
import useNotes from './useNotes'
import { Note } from '../components/notes/Notes'

const mockDataObj = {
  _id: '1',
  title: 'Note',
  desc: 'This is first note.',
  pinIt: false,
  list: [],
}

const mockDataObj2 = {
  _id: '2',
  title: 'Note 2',
  desc: 'This is another note.',
  pinIt: false,
  list: [],
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
    const { result } = renderHook(useNotes<Note[]>, { initialProps: undefined })
    expect(result.current.notes).toStrictEqual([mockDataObj])
    expect(result.current.errors).toBe('')
    expect(result.current.isLoading).toBe(false)
  })

  test('should update categories', () => {
    const { result } = renderHook(useNotes<Note[]>, { initialProps: undefined })
    expect(result.current.notes).toStrictEqual([mockDataObj])
    act(() => result.current.update([mockDataObj, mockDataObj2]))
    expect(result.current.notes).toStrictEqual([mockDataObj, mockDataObj2])
    expect(result.current.errors).toBe('')
    expect(result.current.isLoading).toBe(false)
  })
})
