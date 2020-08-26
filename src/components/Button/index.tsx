import React from 'react'
import styled, { css } from 'styled-components'
import CircleLoader from '../Loader/CircleLoader'
import theme from '../../utils/theme'

interface Props {
  text: string;
  type: 'button' | 'submit' | 'reset';
  uppercase?: boolean;
  isLoading?: boolean;
}

interface WrapperProps {
  uppercase?: boolean;
}

const Button: React.FC<Props> = (props: Props) => {
  const { text, type, uppercase, isLoading } = props

  return (
    <Wrapper
      type={type}
      uppercase={uppercase}
    >
      {isLoading
        ? <CircleLoader color={theme.colors.darkBlue} />
        : text
      }
    </Wrapper>
  )
}

const Wrapper = styled.button`
  font-family: ${({ theme }) => theme.fonts.russo};
  font-size: ${({ theme }) => theme.fontSize.normalText};
  background-color: ${({ theme }) => theme.colors.darkBlue};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: center;
  min-width: 220px;
  border-radius: 8px;
  padding: 12px 24px;
  
  ${(props: WrapperProps) => props.uppercase && css`
    text-transform: uppercase;
  `};
`


export default Button
