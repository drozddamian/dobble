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

const InputElement = styled.input`
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  font-size: ${({ theme }) => theme.fontSize.smallText};
  border-radius: 5px;
  padding: 16px;
  z-index: 5;
  
  @media (min-width: ${({ theme }) => theme.rwd.mobile.m}) {
    font-size: ${({ theme }) => theme.fontSize.normalText};
  }
`

const Label = styled.label`
  font-family: ${({ theme }) => theme.fonts.russo};
  color: ${({ theme }) => theme.colors.text};
  padding: 0 0 4px 4px;
  transition: all .2s ease-out;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  position: relative;
  
  :after {
    content: '';
    position: absolute;
    width: 100%;
    bottom: 5px;
    left: 0;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.darkBlue};
    filter: blur(2px);
    border-radius: 50%;
    transition: all .2s ease-out;
    z-index: 1;
  }
  
  :focus-within {
    ${Label} {
      color: ${({ theme }) => theme.colors.darkBlue};
    }
    :after {
      transform: translateY(5px);
    }
  }
  
  @media (min-width: ${({ theme }) => theme.rwd.mobile.m}) {
    margin-bottom: 40px;
  }
`

const Error = styled.span`

`


export default Input
