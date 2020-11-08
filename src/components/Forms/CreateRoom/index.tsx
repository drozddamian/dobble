import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { useTypedSelector } from "../../../redux/rootReducer";
import Form from '../FormWrapper'
import Input, { InputProps } from '../Input'
import Button from '../../Button'
import VALIDATION from '../../../validation'
import theme from '../../../utils/theme'
import NumberChangerInput from '../NumberChangerInput'
import { newRoom } from '../../../redux/rooms'
import {
  useCurrentAccount,
  useNumberChanger,
} from '../../../hooks'
import {
  MIN_PLAYERS_IN_ROOM,
  MAX_PLAYERS_IN_ROOM,
} from '../../../constants'


const { CREATE_ROOM_FORM } = VALIDATION

interface Props {
  handleCancelClick: () => void;
}

const CreateRoomForm: React.FC<Props> = (props: Props) => {
  const { handleCancelClick } = props
  const dispatch = useDispatch()
  const { currentUserId } = useCurrentAccount()
  const { value: availableSeats, increase, decrease } = useNumberChanger(MIN_PLAYERS_IN_ROOM, MAX_PLAYERS_IN_ROOM)

  const { isLoading } = useTypedSelector(state => state.rooms)

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: ({ name }) => {
      if (!currentUserId) {
        return
      }
      dispatch(newRoom(currentUserId, name, availableSeats, handleCancelClick))
    },
    validationSchema: CREATE_ROOM_FORM,
  })

  const roomNameInputProps: InputProps = {
    type: 'text',
    value: formik.values.name,
    onChange: formik.handleChange,
  }

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Input
        label='Room name'
        inputName='name'
        error={formik.touched.name && formik.errors.name}
        inputProps={roomNameInputProps}
      />

      <NumberChangerInput
        label='Available seats'
        inputName='availableSeats'
        value={availableSeats}
        increaseValue={increase}
        decreaseValue={decrease}
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
