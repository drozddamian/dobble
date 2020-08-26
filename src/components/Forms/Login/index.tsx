import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import Form from '../FormWrapper'
import Input from '../Input'
import Button from '../../Button'
import VALIDATION from '../../../validation'
import { loginAccount } from '../../../redux/account'

const { LOGIN_FORM } = VALIDATION


const LoginForm: React.FC = () => {
  const dispatch = useDispatch()

  const { isLoading, error } = useSelector(state => state.account)

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

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Input
        label='Username'
        inputName='username'
        inputType='text'
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.touched.username && formik.errors.username}
      />

      <Input
        label='Password'
        inputName='password'
        inputType='password'
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && formik.errors.password}
      />

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
