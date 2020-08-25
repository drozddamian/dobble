import React from 'react'
import { useFormik } from 'formik'
import Form from '../FormWrapper'
import Input from '../Input'
import Button from '../../Button'
import VALIDATION from '../../../validation'

const { LOGIN_FORM } = VALIDATION


const LoginForm: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: LOGIN_FORM,
  })

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Input
        label='Username'
        inputName='username'
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.touched.username && formik.errors.username}
      />

      <Input
        label='Password'
        inputName='password'
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && formik.errors.password}
      />

      <Button
        text='Log in'
        type='submit'
        uppercase
      />
    </Form>
  )
}


export default LoginForm
