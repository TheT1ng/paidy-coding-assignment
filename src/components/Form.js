import { useCallback, useState } from "react";
import { getNumberCharactersInString } from "../utils/helpers";
import { credentialsValidationSchema, NUMERIC_REGEX } from "../utils/validation";
import '../styles/_form.scss'

// Forms would usually be handled either by library or existing helpers/component
// In scope of this assignment i am not allowed to use library, and don't see the point to abstract the logic
// So i made something to resemble the way default Formik works manually
// If there would be other forms to handle most of this would be in a Context
export const Form = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [values, setValues] = useState({
    email: '',
    phone: '',
    shouldSkip: false,
  })
  const [errors, setErrors] = useState({
    email: null,
    phone: null,
    shouldSkip: null,
  })

  const isFormValid = Object.values(errors).some((value) => value !== null)

  // This validates whatever fields are passed, here types would be great to verify that all values/errors/schema have same keys
  // Can also be a pure function-helper
  const validateForm = (partialFormValues) => {
    return Object.entries(partialFormValues).reduce((acc, [key, value]) => {
      // If the field is not required or doesn't need to be validated we skip it
      if(!credentialsValidationSchema.hasOwnProperty(key)) return acc

      return {
        ...acc,
        [key]: credentialsValidationSchema[key](value)
      }
    }, {})
  }

  // Memoize it since it has no deps and controlled form components usually render a lot
  const handleFieldChange = useCallback((event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value.trim(),
    }))
  }, [])

  const handlePhoneInputChange = (event) => {
    let { value } = event.target;
    value = value.trim()

    const numbersInInput = getNumberCharactersInString(value)
    // A separate regex to filer out unwanted characters
    // A corner case when clearing input
    // Validation for maximum amount of characters \w or \wo country code
    if(
      (NUMERIC_REGEX.test(value) ||
      value === '') &&
      numbersInInput.length <= (numbersInInput[0] === '8' ? 12 : 11)
    ) {
      handleFieldChange(event)
    }
  }

  const handleFieldBlur = (event) => {
    const validationErrors = validateForm({
      [event.target.name]: event.target.value,
    })

    setErrors((prevErrors) => ({
      ...prevErrors,
      ...validationErrors,
    }))
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()

    const validationErrors = validateForm(values)

    if(Object.values(validationErrors).some((error) => error !== null)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ...validationErrors,
      }))

      return;
    }

    setIsSubmitting(true)

    try {
      // Fake an API request for visual purposes
      // const response = await request(values)
      await new Promise((resolve) => {
        setTimeout(() => {resolve()}, 1000)
      })
    } catch (error) {
      // Would set errors from API to display in the form
      // Or notify user via toast, alert etc.
      setErrors({
        email: error.email || null,
        phone: error.phone || null,
        shouldSkip: null,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className='form' noValidate>
      <div>
        <label className='label'>
          メールアドレス
          <input
            type='email'
            name='email'
            placeholder='placeholder@email.com'
            value={values.email}
            onChange={handleFieldChange}
            className={`input ${errors.email ? 'field-error' : ''}`}
            onBlur={handleFieldBlur}
          />
          {errors.email && (
            <span className='field-error-message'>
              {errors.email}
            </span>
          )}
        </label>
        <label className='label'>
          携帯電話番号
          <input
            type='tel'
            name='phone'
            placeholder='070-1234-5678'
            value={values.phone}
            onChange={handlePhoneInputChange}
            className={`input ${errors.phone ? 'field-error' : ''}`}
            onBlur={handleFieldBlur}
          />
          {errors.phone && (
            <span className='field-error-message'>
              {errors.phone}
            </span>
          )}
        </label>
        <label className='checkbox-label'>
          <input
            name='shouldSkip'
            type='checkbox'
            className='checkbox'
            checked={values.shouldSkip}
            onChange={(event) => setValues((prevValues) => ({
              ...prevValues,
              shouldSkip: event.target.checked
            }))}
          />
          次回から入力を省略
        </label>
      </div>
      <div className='form-controls'>
        <p className='usage-terms'>
          <a href='/tos' target='_blank' rel='noopener noreferrer'>Paidyの利用規約・個人情報取扱条項</a>
          に同意して
        </p>
        <button
          type='submit'
          className='form-submit-button'
          disabled={isSubmitting || isFormValid}
          data-testid='credentials-submit-button'
        >
          次へ
        </button>
      </div>
    </form>
  )
}