import React from 'react'
import styled from 'styled-components'


interface Props {
  inputName: string;
  value: string | number;
  onChange;
  label?: string;
  error?: string | boolean;
}

const Input: React.FC<Props> = (props: Props) => {

  const { label, inputName, value, onChange, error } = props

  return (
    <InputContainer>
      {label && (
        <Label htmlFor={inputName}>
          {label}
        </Label>
      )}

      <InputElement
        name={inputName}
        onChange={onChange}
        value={value}
      />

      {error && (
        <Error>{error}</Error>
      )}
    </InputContainer>
  )
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`

const InputElement = styled.input`
  border-radius: 5px;
`

const Label = styled.label`
  padding-bottom: 4px;
`

const Error = styled.span`

`


export default Input
