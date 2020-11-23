import React from 'react'
import styled, { css } from 'styled-components'
import CircleLoader from '../Loader/CircleLoader'
import theme from '../../utils/theme'

interface Props {
  text: string;
  type: 'button' | 'submit' | 'reset';
  uppercase?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  handleClick?: () => void;
  isSmallButton?: boolean;
  background?: string;
}

interface WrapperProps {
  uppercase?: boolean;
  isSmallButton?: boolean;
  isDisabled?: boolean;
  background?: string;
}

const Button: React.FC<Props> = (props: Props) => {
  const { text, type, uppercase, isLoading, handleClick, isDisabled, isSmallButton, background } = props

  return (
    <Wrapper
      type={type}
      uppercase={uppercase}
      onClick={!isDisabled ? handleClick : () => {}}
      isSmallButton={isSmallButton}
      background={background}
      isDisabled={isDisabled}
    >
      {isLoading
        ? <CircleLoader color={theme.colors.darkBlue} />
        : text
      }
    </Wrapper>
  )
}

export const Wrapper = styled.button`
  font-family: ${({ theme }) => theme.fonts.russo};
  font-size: ${({ theme }) => theme.fontSize.normalText};
  background-color: ${(props: WrapperProps) => props.background || theme.colors.darkBlue};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: center;
  min-width: 220px;
  border-radius: 8px;
  padding: 12px 24px;
  
  
  ${(props: WrapperProps) => props.isDisabled && css`
    opacity: 0.8;
    cursor: default;
  `};
  
  ${(props: WrapperProps) => props.uppercase && css`
    text-transform: uppercase;
  `};
  
  ${(props: WrapperProps) => props.isSmallButton && css`
    font-size: ${({ theme }) => theme.fontSize.smallText};
    min-width: 110px;
    padding: 8px 16px;
  `};
`


export default Button
