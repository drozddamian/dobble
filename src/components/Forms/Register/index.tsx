import React from 'react'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import Form from '../FormWrapper'
import Input from '../Input'
import Button from '../../Button'
import VALIDATION from '../../../validation'
import { registerAccount } from '../../../redux/account'

const { REGISTER_FORM } = VALIDATION


const RegisterForm: React.FC = () => {
  const dispatch = useDispatch()

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
        label='Nickname'
        inputName='nick'
        inputType='text'
        value={formik.values.nick}
        onChange={formik.handleChange}
        error={formik.touched.nick && formik.errors.nick}
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
        text='Register'
        type='submit'
        uppercase
      />
    </Form>
  )
}

export default RegisterForm
