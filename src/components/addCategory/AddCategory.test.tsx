import { IntlProvider } from 'react-intl'
import { AuthContext } from '../../context/AuthContext'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import localeEn from '../../lang/en.json'
import userEvent from '@testing-library/user-event'
import AddCategory from './AddCategory'

let form: RenderResult

describe('Add Category', () => {
  const mockFn = jest.fn()
  const categories = [{ _id: '01', name: 'test' }]
  beforeEach(() => {
    form = render(
      <IntlProvider messages={localeEn} locale='en' defaultLocale='en'>
        <AuthContext.Provider value={{ isLoggedIn: false, setIsLoggedIn: jest.fn() }}>
          <AddCategory onSubmit={mockFn} categories={categories} />
        </AuthContext.Provider>
        ,
      </IntlProvider>,
    )
  })

  test('render form properly', () => {
    expect(form.getByLabelText(/Add new category/i)).toBeInTheDocument()
    expect(form.getByRole('textbox', { name: /Add new category/i })).toBeInTheDocument()
    expect(form.getByRole('button', { name: /add/i })).toBeInTheDocument()
  })

  test('button should be disabled for empty form', () => {
    const btn = form.getByRole('button', { name: /add/i })
    expect(btn).toHaveAttribute('disabled')
  })

  test('button should be enabled for non-empty form', () => {
    const email = form.getByLabelText(/Add new category/i)
    fireEvent.change(email, { target: { value: 'test' } })

    const btn = form.getByRole('button', { name: /add/i })
    expect(btn).not.toHaveAttribute('disabled')
  })

  test('should display an error message when category exist', () => {
    const email = form.getByLabelText(/Add new category/i)
    fireEvent.change(email, { target: { value: 'test' } })

    const btn = form.getByRole('button', { name: /add/i })
    userEvent.click(btn)
    expect(form.getByText('The category name exists.')).toBeInTheDocument()
  })

  test('should send data', () => {
    const email = form.getByLabelText(/Add new category/i)
    fireEvent.change(email, { target: { value: 'test2' } })

    const btn = form.getByRole('button', { name: /add/i })
    userEvent.click(btn)
    expect(mockFn).toBeCalledTimes(1)
    expect(mockFn).toBeCalledWith('test2')
  })
})
