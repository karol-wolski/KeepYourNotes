const isEmailValidate = (email: string) => {
  let isValidate = false
  let errorMsg = ''

  if (email.length < 6) {
    errorMsg = 'Email should have at least 6 characters.'
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errorMsg = 'The email address is in the wrong format.'
  } else {
    isValidate = true
  }

  return {
    isValidate,
    errorMsg,
  }
}

const isPasswordValidate = (password: string) => {
  let isValidate = false
  let errorMsg = ''

  if (password.length < 8) {
    errorMsg = 'Password should have at least 6 characters.'
  } else if (password.length > 16) {
    errorMsg = 'Password should have less than 100 characters.'
  } else {
    isValidate = true
  }
  return {
    isValidate,
    errorMsg,
  }
}

const isUsernameValidate = (username: string) => {
  let isValidate = false
  let errorMsg = ''

  if (username.length < 2) {
    errorMsg = 'Username should have at least 2 characters.'
  } else if (username.length > 64) {
    errorMsg = 'Username should have less than 16 characters.'
  } else {
    isValidate = true
  }

  return {
    isValidate,
    errorMsg,
  }
}

export default {
  isEmailValidate,
  isPasswordValidate,
  isUsernameValidate,
}
