import { IntlProvider } from 'react-intl'
import { AuthContext } from '../../context/AuthContext'
import RegisterForm from './RegisterForm'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import localeEn from '../../lang/en.json'
import userEvent from '@testing-library/user-event'

let form: RenderResult

describe('Register Form', () => {
  const mockFn = jest.fn()
  const validUsername = 'user'
  const validEmail = 'a@a.pl'
  const validPassword = 'Pa$$w0rd'
  beforeEach(() => {
    form = render(
      <IntlProvider messages={localeEn} locale='en' defaultLocale='en'>
        <AuthContext.Provider value={{ isLoggedIn: false, setIsLoggedIn: jest.fn() }}>
          <RegisterForm onSubmit={mockFn} clearSuccessMsg={mockFn} />
        </AuthContext.Provider>
        ,
      </IntlProvider>,
    )
  })

  test('render form properly', () => {
    expect(form.getByLabelText(/username/i)).toBeInTheDocument()
    expect(form.getByRole('textbox', { name: /username/i })).toBeInTheDocument()
    expect(form.getByLabelText(/email/i)).toBeInTheDocument()
    expect(form.getByRole('textbox', { name: /email/i })).toBeInTheDocument()
    expect(form.getByLabelText('Password')).toBeInTheDocument()
    expect(form.getByLabelText(/Confirm Password/i)).toBeInTheDocument()
    expect(form.getByText(/submit/i)).toBeInTheDocument()
    expect(form.getByRole('button', { name: /submit/i })).toBeInTheDocument()
  })

  test('button should be disabled for empty form', () => {
    const btn = form.getByRole('button', { name: /submit/i })
    expect(btn).toHaveAttribute('disabled')
  })

  test('button should be enabled for non-empty form', () => {
    const username = form.getByLabelText(/username/i)
    fireEvent.change(username, { target: { value: validUsername } })

    const email = form.getByLabelText(/email/i)
    fireEvent.change(email, { target: { value: validEmail } })

    const password = form.getByLabelText('Password')
    fireEvent.change(password, { target: { value: validPassword } })

    const confirmPassword = form.getByLabelText(/Confirm Password/i)
    fireEvent.change(confirmPassword, { target: { value: validPassword } })

    const btn = form.getByRole('button', { name: /submit/i })
    expect(btn).not.toHaveAttribute('disabled')
  })

  test('should display an error message for a username less than 2 characters long', () => {
    const wrongUsername = 'a'

    const username = form.getByLabelText(/username/i)
    fireEvent.change(username, { target: { value: wrongUsername } })

    const email = form.getByLabelText(/email/i)
    fireEvent.change(email, { target: { value: validEmail } })

    const password = form.getByLabelText('Password')
    fireEvent.change(password, { target: { value: validPassword } })

    const confirmPassword = form.getByLabelText(/Confirm Password/i)
    fireEvent.change(confirmPassword, { target: { value: validPassword } })

    const btn = form.getByRole('button', { name: /submit/i })
    userEvent.click(btn)

    expect(form.getByText('Username should have at least 2 characters.')).toBeInTheDocument()
  })

  test('should display an error message for a username longer than 16 characters', () => {
    const wrongUsername = 'UserName1UserName1'

    const username = form.getByLabelText(/username/i)
    fireEvent.change(username, { target: { value: wrongUsername } })

    const email = form.getByLabelText(/email/i)
    fireEvent.change(email, { target: { value: validEmail } })

    const password = form.getByLabelText('Password')
    fireEvent.change(password, { target: { value: validPassword } })

    const confirmPassword = form.getByLabelText(/Confirm Password/i)
    fireEvent.change(confirmPassword, { target: { value: validPassword } })

    const btn = form.getByRole('button', { name: /submit/i })
    userEvent.click(btn)

    expect(form.getByText('Username should have less than 16 characters.')).toBeInTheDocument()
  })

  test('should display an error message for an email less than 6 characters long', () => {
    const wrongEmail = 'a@a'

    const username = form.getByLabelText(/username/i)
    fireEvent.change(username, { target: { value: validUsername } })

    const email = form.getByLabelText(/email/i)
    fireEvent.change(email, { target: { value: wrongEmail } })

    const password = form.getByLabelText('Password')
    fireEvent.change(password, { target: { value: validPassword } })

    const confirmPassword = form.getByLabelText(/Confirm Password/i)
    fireEvent.change(confirmPassword, { target: { value: validPassword } })

    const btn = form.getByRole('button', { name: /submit/i })
    userEvent.click(btn)

    expect(form.getByText('Email should have at least 6 characters.')).toBeInTheDocument()
  })

  test('should display an error message for the wrong email format', () => {
    const wrongEmail = 'email@'
    const username = form.getByLabelText(/username/i)
    fireEvent.change(username, { target: { value: validUsername } })

    const email = form.getByLabelText(/email/i)
    fireEvent.change(email, { target: { value: wrongEmail } })

    const password = form.getByLabelText('Password')
    fireEvent.change(password, { target: { value: validPassword } })

    const confirmPassword = form.getByLabelText(/Confirm Password/i)
    fireEvent.change(confirmPassword, { target: { value: validPassword } })

    const btn = form.getByRole('button', { name: /submit/i })
    userEvent.click(btn)

    expect(form.getByText('The email address is in the wrong format.')).toBeInTheDocument()
  })

  test('should display an error message for a password less than 8 characters long', () => {
    const wrongPassword = 'Pa$$'

    const username = form.getByLabelText(/username/i)
    fireEvent.change(username, { target: { value: validUsername } })

    const email = form.getByLabelText(/email/i)
    fireEvent.change(email, { target: { value: validEmail } })

    const password = form.getByLabelText('Password')
    fireEvent.change(password, { target: { value: wrongPassword } })

    const confirmPassword = form.getByLabelText(/Confirm Password/i)
    fireEvent.change(confirmPassword, { target: { value: validPassword } })

    const btn = form.getByRole('button', { name: /submit/i })
    userEvent.click(btn)

    expect(form.getByText('Password should have at least 8 characters.')).toBeInTheDocument()
  })

  test('should display an error message for a password longer than 16 characters', () => {
    const wrongPassword = 'Pa$$w0rd1Pa$$w0rd1'

    const username = form.getByLabelText(/username/i)
    fireEvent.change(username, { target: { value: validUsername } })

    const email = form.getByLabelText(/email/i)
    fireEvent.change(email, { target: { value: validEmail } })

    const password = form.getByLabelText('Password')
    fireEvent.change(password, { target: { value: wrongPassword } })

    const confirmPassword = form.getByLabelText(/Confirm Password/i)
    fireEvent.change(confirmPassword, { target: { value: validPassword } })

    const btn = form.getByRole('button', { name: /submit/i })
    userEvent.click(btn)

    expect(form.getByText('Password should have less than 16 characters.')).toBeInTheDocument()
  })

  test('should send data', () => {
    const username = form.getByLabelText(/username/i)
    fireEvent.change(username, { target: { value: validUsername } })

    const email = form.getByLabelText(/email/i)
    fireEvent.change(email, { target: { value: validEmail } })

    const password = form.getByLabelText('Password')
    fireEvent.change(password, { target: { value: validPassword } })

    const confirmPassword = form.getByLabelText(/Confirm Password/i)
    fireEvent.change(confirmPassword, { target: { value: validPassword } })

    const btn = form.getByRole('button', { name: /submit/i })
    userEvent.click(btn)

    expect(mockFn).toBeCalledTimes(1)
    expect(mockFn).toBeCalledWith(validUsername, validEmail, validPassword)
  })
})
