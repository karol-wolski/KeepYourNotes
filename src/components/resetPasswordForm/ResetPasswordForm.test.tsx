import { IntlProvider } from 'react-intl'
import { AuthContext } from '../../context/AuthContext'
import localeEn from '../../lang/en.json'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ResetPasswordForm from './ResetPasswordForm'
import { BrowserRouter } from 'react-router-dom'

let form: RenderResult

describe('ResetPasswordForm', () => {
  const validPassword = 'Pa$$w0rd'
  const mockFn = jest.fn()

  beforeEach(() => {
    form = render(
      <IntlProvider messages={localeEn} locale='en' defaultLocale='en'>
        <AuthContext.Provider value={{ isLoggedIn: false, setIsLoggedIn: jest.fn() }}>
          <BrowserRouter>
            <ResetPasswordForm onSubmit={mockFn} />
          </BrowserRouter>
        </AuthContext.Provider>
        ,
      </IntlProvider>,
    )
  })

  test('render form properly', () => {
    expect(form.getByLabelText('Password')).toBeInTheDocument()
    expect(form.getByLabelText(/Confirm password/i)).toBeInTheDocument()
    expect(form.getByRole('button', { name: /submit/i })).toBeInTheDocument()
  })

  test('button should be disabled for empty form', () => {
    const btn = form.getByRole('button', { name: /submit/i })
    expect(btn).toHaveAttribute('disabled')
  })

  test('button should be enabled for non-empty form', () => {
    const password = form.getByLabelText('Password')
    fireEvent.change(password, { target: { value: validPassword } })

    const confirmPassword = form.getByLabelText(/Confirm password/i)
    fireEvent.change(confirmPassword, { target: { value: validPassword } })

    const btn = form.getByRole('button', { name: /submit/i })
    expect(btn).not.toHaveAttribute('disabled')
  })

  test('should display an error message for a password less than 8 characters long', () => {
    const wrongPassword = 'Pa$$'
    const password = form.getByLabelText('Password')
    fireEvent.change(password, { target: { value: wrongPassword } })

    const confirmPassword = form.getByLabelText('Confirm password')
    fireEvent.change(confirmPassword, { target: { value: validPassword } })

    const btn = form.getByRole('button', { name: /submit/i })
    userEvent.click(btn)
    expect(form.getByText('Password should have at least 8 characters.')).toBeInTheDocument()
  })

  test('should display an error message for a password longer than 16 characters', () => {
    const wrongPassword = 'Pa$$w0rd1Pa$$w0rd1'
    const password = form.getByLabelText('Password')
    fireEvent.change(password, { target: { value: wrongPassword } })

    const confirmPassword = form.getByLabelText('Confirm password')
    fireEvent.change(confirmPassword, { target: { value: validPassword } })
    const btn = form.getByRole('button', { name: /submit/i })
    userEvent.click(btn)
    expect(form.getByText('Password should have less than 16 characters.')).toBeInTheDocument()
  })

  test('should display an error message for non indentical passwords', () => {
    const wrongPassword = 'Pa$$'
    const password = form.getByLabelText('Password')
    fireEvent.change(password, { target: { value: validPassword } })

    const confirmPassword = form.getByLabelText('Confirm password')
    fireEvent.change(confirmPassword, { target: { value: wrongPassword } })

    const btn = form.getByRole('button', { name: /submit/i })
    userEvent.click(btn)
    expect(form.getByText('The passwords are not identical.')).toBeInTheDocument()
  })

  test('should send data', () => {
    const password = form.getByLabelText('Password')
    fireEvent.change(password, { target: { value: validPassword } })

    const confirmPassword = form.getByLabelText('Confirm password')
    fireEvent.change(confirmPassword, { target: { value: validPassword } })

    const btn = form.getByRole('button', { name: /submit/i })
    userEvent.click(btn)
    expect(mockFn).toBeCalledTimes(1)
    expect(mockFn).toBeCalledWith(validPassword, '')
  })
})
