const isEmailValidate = (email: string) => {
  let isValidate = false
  let errorMsg = ''

  if (email.length < 5) {
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

  if (password.length < 7) {
    errorMsg = 'Password should have at least 8 characters.'
  } else if (password.length >= 16) {
    errorMsg = 'Password should have less than 16 characters.'
  } else {
    isValidate = true
  }
  return {
    isValidate,
    errorMsg,
  }
}

const isConfirmPasswordValidate = (password: string, confirmPassword: string) => {
  let isValidate = false
  let errorMsg = ''

  if (confirmPassword.length < 7) {
    errorMsg = 'Confirm Password should have at least 8 characters.'
  } else if (password !== confirmPassword) {
    errorMsg = 'The passwords are not identical.'
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
  } else if (username.length > 16) {
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
  isConfirmPasswordValidate,
  isUsernameValidate,
}
