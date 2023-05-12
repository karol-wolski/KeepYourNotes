import { IntlProvider } from 'react-intl'
import { AuthContext } from '../../context/AuthContext'
import localeEn from '../../lang/en.json'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RemindPasswordForm from './RemindPasswordForm'

let form: RenderResult

describe('RemindPasswordForm', () => {
  const validEmail = 'a@a.pl'
  const mockFn = jest.fn()

  beforeEach(() => {
    form = render(
      <IntlProvider messages={localeEn} locale='en' defaultLocale='en'>
        <AuthContext.Provider value={{ isLoggedIn: false, setIsLoggedIn: jest.fn() }}>
          <RemindPasswordForm onSubmit={mockFn} />
        </AuthContext.Provider>
        ,
      </IntlProvider>,
    )
  })

  test('render form properly', () => {
    expect(form.getByLabelText(/email/i)).toBeInTheDocument()
    expect(form.getByRole('textbox', { name: /email/i })).toBeInTheDocument()
    expect(form.getByRole('button', { name: /submit/i })).toBeInTheDocument()
  })

  test('button should be disabled for empty form', () => {
    const btn = form.getByRole('button', { name: /submit/i })
    expect(btn).toHaveAttribute('disabled')
  })

  test('button should be enabled for non-empty form', () => {
    const email = form.getByLabelText(/email/i)
    fireEvent.change(email, { target: { value: validEmail } })

    const btn = form.getByRole('button', { name: /submit/i })
    expect(btn).not.toHaveAttribute('disabled')
  })

  test('should display an error message for an email less than 6 characters long', () => {
    const wrongEmail = 'a@a'
    const email = form.getByLabelText(/email/i)
    fireEvent.change(email, { target: { value: wrongEmail } })
    const btn = form.getByRole('button', { name: /submit/i })
    userEvent.click(btn)
    expect(form.getByText('Email should have at least 6 characters.')).toBeInTheDocument()
  })

  test('should display an error message for the wrong email format', () => {
    const wrongEmail = 'email@'
    const email = form.getByLabelText(/email/i)
    fireEvent.change(email, { target: { value: wrongEmail } })
    const btn = form.getByRole('button', { name: /submit/i })
    userEvent.click(btn)
    expect(form.getByText('The email address is in the wrong format.')).toBeInTheDocument()
  })

  test('should send data', () => {
    const email = form.getByLabelText(/email/i)
    fireEvent.change(email, { target: { value: validEmail } })

    const btn = form.getByRole('button', { name: /submit/i })
    userEvent.click(btn)
  })
})
