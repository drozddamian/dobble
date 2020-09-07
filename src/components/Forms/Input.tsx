import React from 'react'
import styled, { css } from 'styled-components'


interface Props {
  inputName: string;
  inputType: 'date' | 'email' | 'number' | 'password' | 'text';
  value: string | number;
  onChange;
  label?: string;
  error?: string | boolean;
}

interface InputContainerProps {
  hasError: undefined | boolean | string;
}

const Input: React.FC<Props> = (props: Props) => {
  const { label, inputName, inputType, value, onChange, error } = props

  return (
    <InputContainer hasError={error}>
      {label && (
        <Label htmlFor={inputName}>
          {label}
        </Label>
      )}

      <InputElement
        name={inputName}
        type={inputType}
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
  padding: 12px 16px;
  z-index: 5;
`

const Label = styled.label`
  font-family: ${({ theme }) => theme.fonts.russo};
  color: ${({ theme }) => theme.colors.text};
  padding: 0 0 4px 4px;
  transition: all .2s ease-out;
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
    
    ${(props: InputContainerProps) => props.hasError && css`
      background-color: ${({ theme }) => theme.colors.error};
      transform: translateY(5px);
    `};
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
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
  font-size: ${({ theme }) => theme.fontSize.s12};
  color: ${({ theme }) => theme.colors.error};
  position: absolute;
  bottom: -20px;
  left: 4px;
`


export default Input
