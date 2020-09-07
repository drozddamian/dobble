import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import Form from '../FormWrapper'
import Input from '../Input'
import Button from '../../Button'
import VALIDATION from '../../../validation'
import theme from '../../../utils/theme'
import { useCurrentAccount } from '../../../hooks'
import { newRoom } from '../../../redux/rooms'

const { CREATE_ROOM_FORM } = VALIDATION

interface Props {
  handleCancelClick: () => void;
}

const CreateRoomForm: React.FC<Props> = (props: Props) => {
  const { handleCancelClick } = props
  const dispatch = useDispatch()
  const { currentUserId } = useCurrentAccount()

  const { isLoading } = useSelector(state => state.rooms)

  const formik = useFormik({
    initialValues: {
      name: '',
      availableSeats: 2,
    },
    onSubmit: ({ name, availableSeats }) => {
      if (!currentUserId) {
        return
      }
      dispatch(newRoom(currentUserId, name, availableSeats, handleCancelClick))
    },
    validationSchema: CREATE_ROOM_FORM,
  })

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Input
        label='Room name'
        inputName='name'
        inputType='text'
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && formik.errors.name}
      />

      <Input
        label='Available seats'
        inputName='availableSeats'
        inputType='number'
        value={formik.values.availableSeats}
        onChange={formik.handleChange}
        error={formik.touched.availableSeats && formik.errors.availableSeats}
      />

      <ButtonContainer>
        <Button
          text='Create'
          type='submit'
          isLoading={isLoading}
          uppercase
          isSmallButton
        />

        <Button
          text='Cancel'
          type='button'
          handleClick={handleCancelClick}
          isSmallButton
          background={theme.colors.inputBorder}
        />
      </ButtonContainer>
    </Form>
  )
}

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export default CreateRoomForm
