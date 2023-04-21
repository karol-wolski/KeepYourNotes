import { renderHook, act } from '@testing-library/react'
import useBoolean from './useBoolean'

describe('useBoolean', () => {
  test('should render the initial value equal false', () => {
    const { result } = renderHook(useBoolean)
    expect(result.current[0]).toBe(false)
  })

  test('should accept and render the same initial value', () => {
    const { result } = renderHook(useBoolean, {
      initialProps: true,
    })
    expect(result.current[0]).toBe(true)
  })

  test('should render true for setTrue', () => {
    const { result } = renderHook(useBoolean)
    act(() => result.current[1].setTrue())
    expect(result.current[0]).toBe(true)
  })

  test('should render false for setFalse', () => {
    const { result } = renderHook(useBoolean, {
      initialProps: true,
    })
    act(() => result.current[1].setFalse())
    expect(result.current[0]).toBe(false)
  })

  test('should render true when first time toggle is use and false when toggle is use second time', () => {
    const { result } = renderHook(useBoolean)
    act(() => result.current[1].toggle())
    expect(result.current[0]).toBe(true)
    act(() => result.current[1].toggle())
    expect(result.current[0]).toBe(false)
  })
})
