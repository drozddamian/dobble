import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import Form from '../FormWrapper'
import Input, { InputProps } from '../Input'
import Button from '../../Button'
import FormError from '../FormError'
import VALIDATION from '../../../validation'
import { loginAccount } from '../../../redux/authentication'

const { LOGIN_FORM } = VALIDATION


const LoginForm: React.FC = () => {
  const dispatch = useDispatch()

  const { isLoading, error } = useSelector(state => state.authentication)

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: ({ username, password }) => {
      dispatch(loginAccount(username, password))
    },
    validationSchema: LOGIN_FORM,
  })

  const usernameInputProps: InputProps = {
    type: 'text',
    value: formik.values.username,
    onChange: formik.handleChange,
  }

  const passwordInputProps: InputProps = {
    type: 'password',
    value: formik.values.password,
    onChange: formik.handleChange,
  }

  return (
    <Form onSubmit={formik.handleSubmit} error={error}>
      <Input
        label='Username'
        inputName='username'
        error={formik.touched.username && formik.errors.username}
        inputProps={usernameInputProps}
      />

      <Input
        label='Password'
        inputName='password'
        error={formik.touched.password && formik.errors.password}
        inputProps={passwordInputProps}
      />

      <FormError text={error} />

      <Button
        text='Log in'
        type='submit'
        isLoading={isLoading}
        uppercase
      />
    </Form>
  )
}


export default LoginForm
