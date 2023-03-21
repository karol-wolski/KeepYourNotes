import translation from '../lang/en.json'

const isEmailValidate = (email: string) => {
  let isValidate = false
  let error

  if (email.length < 5) {
    error = {
      translateId: 'app.emailMinChars',
      errorMsg: translation['app.emailMinChars'],
    }
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    error = {
      translateId: 'app.emailWrongFormat',
      errorMsg: translation['app.emailWrongFormat'],
    }
  } else {
    isValidate = true
  }

  return {
    isValidate,
    error,
  }
}

const isPasswordValidate = (password: string) => {
  let isValidate = false
  let error

  if (password.length < 8) {
    error = {
      translateId: 'app.passwordMinChars',
      errorMsg: translation['app.passwordMinChars'],
    }
  } else if (password.length >= 16) {
    error = {
      translateId: 'app.passwordMaxChars',
      errorMsg: translation['app.passwordMaxChars'],
    }
  } else {
    isValidate = true
  }
  return {
    isValidate,
    error,
  }
}

const isConfirmPasswordValidate = (password: string, confirmPassword: string) => {
  let isValidate = false
  let error

  if (confirmPassword.length < 8) {
    error = {
      translateId: 'app.confirmPassword8chars',
      errorMsg: translation['app.confirmPassword8chars'],
    }
  } else if (password !== confirmPassword) {
    error = {
      translateId: 'app.passwordsNotTheSame',
      errorMsg: translation['app.passwordsNotTheSame'],
    }
  } else {
    isValidate = true
  }
  return {
    isValidate,
    error,
  }
}

const isUsernameValidate = (username: string) => {
  let isValidate = false
  let error

  if (username.length < 2) {
    error = {
      translateId: 'app.usernameMinChars',
      errorMsg: translation['app.usernameMinChars'],
    }
  } else if (username.length > 16) {
    error = {
      translateId: 'app.usernameMaxChars',
      errorMsg: translation['app.usernameMaxChars'],
    }
  } else {
    isValidate = true
  }

  return {
    isValidate,
    error,
  }
}

export default {
  isEmailValidate,
  isPasswordValidate,
  isConfirmPasswordValidate,
  isUsernameValidate,
}
