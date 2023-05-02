import { render } from '@testing-library/react'
import Alert, { ALERT_TYPE } from './Alert'

describe('Alert', () => {
  test('render danger alert', () => {
    const alertElement = render(<Alert text='This is danger alert' type={ALERT_TYPE.DANGER} />)
    const text = alertElement.getByText('This is danger alert')
    expect(text.classList.contains('alert-danger')).toBe(true)
  })

  test('render success alert', () => {
    const alertElement = render(<Alert text='This is success alert' type={ALERT_TYPE.SUCCESS} />)
    const text = alertElement.getByText('This is success alert')
    expect(text.classList.contains('alert-success')).toBe(true)
  })

  test('render warning alert', () => {
    const alertElement = render(<Alert text='This is warning alert' type={ALERT_TYPE.WARNING} />)
    const text = alertElement.getByText('This is warning alert')
    expect(text.classList.contains('alert-warning')).toBe(true)
  })

  test('render info alert', () => {
    const alertElement = render(<Alert text='This is info alert' type={ALERT_TYPE.INFO} />)
    const text = alertElement.getByText('This is info alert')
    expect(text.classList.contains('alert-info')).toBe(true)
  })
})
