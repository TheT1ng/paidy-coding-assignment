export const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
export const NUMERIC_REGEX = /^\+?[\d-]*$/
export const PHONE_REGEX = /^(\+?8)?\d{3}-?\d{4}-?\d{4}$/

export const credentialsValidationSchema = {
  email: (value) => value.match(EMAIL_REGEX) ? null : 'Invalid email address',
  phone: (value) => value.match(PHONE_REGEX) ? null : 'Invalid phone number',
}