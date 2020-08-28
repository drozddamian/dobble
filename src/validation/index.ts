import * as Yup from 'yup'

const fieldsSchema = {
  username: Yup.string()
    .required('Please provide username')
    .min(5, 'Please provide username')
    .max(30, "This field can't be longer than 30 characters"),
  password: Yup.string()
    .min(6, 'Password must contain at least 6 characters')
    .required('Please provide password'),
  nickname: Yup.string()
    .min(3, "Nickname must contain at least 3 characters")
    .max(14, "Nickname can't be longer than 14 characters"),
}


export default {
  LOGIN_FORM: Yup.object().shape({
    username: fieldsSchema.username,
    password: fieldsSchema.password,
  }),
  REGISTER_FORM: Yup.object().shape({
    username: fieldsSchema.username,
    password: fieldsSchema.password,
    nickname: fieldsSchema.nickname,
  })
}
