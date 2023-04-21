import { renderHook, act } from '@testing-library/react'
import useObject from './useObject'

describe('useBoolean', () => {
  test('should accept and render the same initial value', () => {
    const { result } = renderHook(useObject, {
      initialProps: {
        name: '',
        surname: '',
      },
    })
    expect(result.current[0]).toStrictEqual({
      name: '',
      surname: '',
    })
  })

  test('should be able to update object', () => {
    const { result } = renderHook(useObject, {
      initialProps: {
        name: '',
        surname: '',
      },
    })

    act(() => result.current[1]({ ...result.current[0], name: 'John' }))

    expect(result.current[0]).toStrictEqual({
      name: 'John',
      surname: '',
    })
  })

  test('should be able to clear current data', () => {
    const { result } = renderHook(useObject, {
      initialProps: {
        name: '',
        surname: '',
      },
    })

    act(() => result.current[1]({ ...result.current[0], name: 'John' }))

    expect(result.current[0]).toStrictEqual({
      name: 'John',
      surname: '',
    })

    act(() => result.current[2]())

    expect(result.current[0]).toStrictEqual({
      name: '',
      surname: '',
    })
  })
})
