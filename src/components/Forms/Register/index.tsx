import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import Form from '../FormWrapper'
import Input, {InputProps} from '../Input'
import Button from '../../Button'
import FormError from '../FormError'
import VALIDATION from '../../../validation'
import { registerAccount } from '../../../redux/authentication'

const { REGISTER_FORM } = VALIDATION


const RegisterForm: React.FC = () => {
  const dispatch = useDispatch()

  const { isLoading, error } = useSelector(state => state.authentication)

  const formik = useFormik({
    initialValues: {
      username: '',
      nick: '',
      password: '',
    },
    onSubmit: ({ username, nick, password }) => {
      dispatch(registerAccount(username, nick, password))
    },
    validationSchema: REGISTER_FORM,
  })

  const usernameInputProps: InputProps = {
    type: 'text',
    value: formik.values.username,
    onChange: formik.handleChange,
  }

  const nickInputProps: InputProps = {
    type: 'text',
    value: formik.values.nick,
    onChange: formik.handleChange,
  }

  const passwordInputProps: InputProps = {
    type: 'password',
    value: formik.values.password,
    onChange: formik.handleChange,
  }

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Input
        label='Username'
        inputName='username'
        error={formik.touched.username && formik.errors.username}
        inputProps={usernameInputProps}
      />

      <Input
        label='Nickname'
        inputName='nick'
        error={formik.touched.nick && formik.errors.nick}
        inputProps={nickInputProps}
      />

      <Input
        label='Password'
        inputName='password'
        error={formik.touched.password && formik.errors.password}
        inputProps={passwordInputProps}
      />

      <FormError text={error} />

      <Button
        text='Register'
        type='submit'
        isLoading={isLoading}
        uppercase
      />
    </Form>
  )
}

export default RegisterForm
