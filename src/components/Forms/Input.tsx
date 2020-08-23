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

`

const InputElement = styled.input`

`

const Label = styled.label`

`

const Error = styled.span`

`


export default Input
