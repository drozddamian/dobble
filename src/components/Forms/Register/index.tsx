import React from 'react'
import { useFormik } from 'formik'
import Form from '../FormWrapper'
import Input from '../Input'
import Button from '../../Button'
import VALIDATION from '../../../validation'

const { REGISTER_FORM } = VALIDATION


const RegisterForm: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      nickname: '',
      password: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
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
        inputName='nickname'
        inputType='text'
        value={formik.values.nickname}
        onChange={formik.handleChange}
        error={formik.touched.nickname && formik.errors.nickname}
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
