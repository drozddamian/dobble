import React from 'react'
import styled from 'styled-components'
import Input from '../Input'
import { useFormik } from 'formik'
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
    <form onSubmit={formik.handleSubmit}>
      <Input
        label='Username'
        inputName='username'
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.touched.username && formik.errors.username}
      />

      <Input
        label='Nickname'
        inputName='nickname'
        value={formik.values.nickname}
        onChange={formik.handleChange}
        error={formik.touched.nickname && formik.errors.nickname}
      />

      <Input
        label='Password'
        inputName='password'
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && formik.errors.password}
      />
    </form>
  )
}


export default RegisterForm
