import { IntlProvider } from 'react-intl'
import { AuthContext } from '../../context/AuthContext'
import LoginForm from './LoginForm'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import localeEn from '../../lang/en.json'
import userEvent from '@testing-library/user-event'

let form: RenderResult

describe('Login Form', () => {
  const mockFn = jest.fn()
  const validEmail = 'a@a.pl'
  const validPassword = 'Pa$$w0rd'
  beforeEach(() => {
    form = render(
      <IntlProvider messages={localeEn} locale='en' defaultLocale='en'>
        <AuthContext.Provider value={{ isLoggedIn: false, setIsLoggedIn: jest.fn() }}>
          <LoginForm onSubmit={mockFn} />
        </AuthContext.Provider>
        ,
      </IntlProvider>,
    )
  })

  test('render form properlu', () => {
    expect(form.getByLabelText(/email/i)).toBeInTheDocument()
    expect(form.getByRole('textbox', { name: /email/i })).toBeInTheDocument()
    expect(form.getByLabelText('Password')).toBeInTheDocument()
    expect(form.getByText(/submit/i)).toBeInTheDocument()
    expect(form.getByRole('button', { name: /submit/i })).toBeInTheDocument()
  })

  test('button should be disabled for empty form', () => {
    const btn = form.getByRole('button', { name: /submit/i })
    expect(btn).toHaveAttribute('disabled')
  })

  test('button should be enabled for non-empty form', () => {
    const email = form.getByLabelText(/email/i)
    fireEvent.change(email, { target: { value: validEmail } })

    const password = form.getByLabelText('Password')
    fireEvent.change(password, { target: { value: validPassword } })

    const btn = form.getByRole('button', { name: /submit/i })
    expect(btn).not.toHaveAttribute('disabled')
  })

  test('should display an error message for an email less than 6 characters long', () => {
    const wrongEmail = 'a@a'
    const email = form.getByLabelText(/email/i)
    fireEvent.change(email, { target: { value: wrongEmail } })
    const password = form.getByLabelText('Password')
    fireEvent.change(password, { target: { value: validPassword } })
    const btn = form.getByRole('button', { name: /submit/i })
    userEvent.click(btn)
    expect(form.getByText('Email should have at least 6 characters.')).toBeInTheDocument()
  })

  test('should display an error message for the wrong email format', () => {
    const wrongEmail = 'email@'
    const email = form.getByLabelText(/email/i)
    fireEvent.change(email, { target: { value: wrongEmail } })
    const password = form.getByLabelText('Password')
    fireEvent.change(password, { target: { value: validPassword } })
    const btn = form.getByRole('button', { name: /submit/i })
    userEvent.click(btn)
    expect(form.getByText('The email address is in the wrong format.')).toBeInTheDocument()
  })

  test('should display an error message for a password less than 8 characters long', () => {
    const wrongPassword = 'Pa$$'
    const email = form.getByLabelText(/email/i)
    fireEvent.change(email, { target: { value: validEmail } })
    const password = form.getByLabelText('Password')
    fireEvent.change(password, { target: { value: wrongPassword } })
    const btn = form.getByRole('button', { name: /submit/i })
    userEvent.click(btn)
    expect(form.getByText('Password should have at least 8 characters.')).toBeInTheDocument()
  })

  test('should display an error message for a password longer than 16 characters', () => {
    const wrongPassword = 'Pa$$w0rd1Pa$$w0rd1'
    const email = form.getByLabelText(/email/i)
    fireEvent.change(email, { target: { value: validEmail } })
    const password = form.getByLabelText('Password')
    fireEvent.change(password, { target: { value: wrongPassword } })
    const btn = form.getByRole('button', { name: /submit/i })
    userEvent.click(btn)
    expect(form.getByText('Password should have less than 16 characters.')).toBeInTheDocument()
  })

  test('should send data', () => {
    const email = form.getByLabelText(/email/i)
    fireEvent.change(email, { target: { value: validEmail } })

    const password = form.getByLabelText('Password')
    fireEvent.change(password, { target: { value: validPassword } })

    const btn = form.getByRole('button', { name: /submit/i })
    userEvent.click(btn)
    expect(mockFn).toBeCalledTimes(1)
    expect(mockFn).toBeCalledWith(validEmail, validPassword)
  })
})
