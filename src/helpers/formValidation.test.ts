import formValidation from './formValidation'

describe('formValidation', () => {
  describe('isEmailValidate', () => {
    test('should return object {isValidate: true, error: undefined} for email: a@a.pl', () => {
      const email = 'a@a.pl'
      expect(formValidation.isEmailValidate(email)).toStrictEqual({
        isValidate: true,
        error: undefined,
      })
    })

    test('should return error object for email address length less than 5 chars', () => {
      const email = 'a@a'
      expect(formValidation.isEmailValidate(email)).toStrictEqual({
        isValidate: false,
        error: {
          translateId: 'app.emailMinChars',
          errorMsg: 'Email should have at least 6 characters.',
        },
      })
    })

    test('should return error object for wrong email address', () => {
      const email = 'email@a'
      expect(formValidation.isEmailValidate(email)).toStrictEqual({
        isValidate: false,
        error: {
          translateId: 'app.emailWrongFormat',
          errorMsg: 'The email address is in the wrong format.',
        },
      })
    })
  })

  describe('isPasswordValidate', () => {
    test('should return object {isValidate: true, error: undefined}', () => {
      const pass = 'P@$$w0rd'
      expect(formValidation.isPasswordValidate(pass)).toStrictEqual({
        isValidate: true,
        error: undefined,
      })
    })

    test('should return error object for password with number of chars less than 8', () => {
      const pass = 'test123'
      expect(formValidation.isPasswordValidate(pass)).toStrictEqual({
        isValidate: false,
        error: {
          translateId: 'app.passwordMinChars',
          errorMsg: 'Password should have at least 8 characters.',
        },
      })
    })

    test('should return error object for password with number of chars greater than 16', () => {
      const pass = 'thisIsTooLongPassword'
      expect(formValidation.isPasswordValidate(pass)).toStrictEqual({
        isValidate: false,
        error: {
          translateId: 'app.passwordMaxChars',
          errorMsg: 'Password should have less than 16 characters.',
        },
      })
    })
  })

  describe('isConfirmPasswordValidate', () => {
    test('should return object {isValidate: true, error: undefined}', () => {
      const pass = 'P@$$w0rd'
      const passConfirm = 'P@$$w0rd'
      expect(formValidation.isConfirmPasswordValidate(pass, passConfirm)).toStrictEqual({
        isValidate: true,
        error: undefined,
      })
    })

    test('should return error object for not the same password', () => {
      const pass = 'P@$$w0rd'
      const passConfirm = 'P@$$w0rd1'
      expect(formValidation.isConfirmPasswordValidate(pass, passConfirm)).toStrictEqual({
        isValidate: false,
        error: {
          translateId: 'app.passwordsNotTheSame',
          errorMsg: 'The passwords are not identical.',
        },
      })
    })
  })

  describe('isUsernameValidate', () => {
    test('should return object {isValidate: true, error: undefined} for email: a@a.pl', () => {
      const userName = 'John'
      expect(formValidation.isUsernameValidate(userName)).toStrictEqual({
        isValidate: true,
        error: undefined,
      })
    })

    test('should return error object for username length less than 2 chars', () => {
      const userName = 'J'
      expect(formValidation.isUsernameValidate(userName)).toStrictEqual({
        isValidate: false,
        error: {
          translateId: 'app.usernameMinChars',
          errorMsg: 'Username should have at least 2 characters.',
        },
      })
    })

    test('should return error object for username length greater than 16 chars', () => {
      const userName = 'MyUserNameIsJohnDoe'
      expect(formValidation.isUsernameValidate(userName)).toStrictEqual({
        isValidate: false,
        error: {
          translateId: 'app.usernameMaxChars',
          errorMsg: 'Username should have less than 16 characters.',
        },
      })
    })
  })
})
