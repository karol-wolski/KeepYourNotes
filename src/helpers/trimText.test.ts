import trimText from './trimText'

describe('trimText', () => {
  const txt = 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.'
  test('should return Neque...', () => {
    expect(trimText(txt, 10, ' ')).toBe('Neque...')
  })
})
