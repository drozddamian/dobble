import React from 'react'
import styled, { css } from 'styled-components'

interface Props {
  text: string;
  type: 'button' | 'submit' | 'reset';
  uppercase?: boolean;
}

interface WrapperProps {
  uppercase?: boolean;
}

const Button: React.FC<Props> = (props: Props) => {
  const { text, type, uppercase } = props

  return (
    <Wrapper
      type={type}
      uppercase={uppercase}
    >
      {text}
    </Wrapper>
  )
}

const Wrapper = styled.button`
  font-family: ${({ theme }) => theme.fonts.russo};
  font-size: ${({ theme }) => theme.fontSize.normalText};
  background-color: ${({ theme }) => theme.colors.darkBlue};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  padding: 12px 24px;
  
  ${(props: WrapperProps) => props.uppercase && css`
    text-transform: uppercase;
  `};
`


export default Button
