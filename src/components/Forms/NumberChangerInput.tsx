import React from 'react'
import styled, { css } from 'styled-components'
import Input from './Input'

interface ButtonProps {
  isPlusButton?: boolean;
}

interface Props {
  label?: string;
  inputName: string;
  value: number;
  increaseValue: () => void;
  decreaseValue: () => void;
}

const NumberChangerInput: React.FC<Props> = (props: Props) => {
  const { label, inputName, value, increaseValue, decreaseValue } = props

  const getCustomInput = () => {
    return (
      <Wrapper>
        <NumberText>
          {value}
        </NumberText>

        <ValueManipulationContainer>
          <ChangeNumberButton
            type='button'
            isPlusButton
            onClick={increaseValue}
          />

          <ChangeNumberButton
            type='button'
            onClick={decreaseValue}
          />
        </ValueManipulationContainer>
      </Wrapper>
    )
  }

  const customInput = getCustomInput()

  return (
    <Input
      label={label}
      inputName={inputName}
      customInput={customInput}
    />
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 4px 0 4px;
`

const NumberText = styled.span`
  font-family: ${({ theme }) => theme.fonts.russo};
  font-size: ${({ theme }) => theme.fontSize.s23};
  width: 20px;
  
  @media (min-width: ${({ theme }) => theme.rwd.tablet.s}) {
    font-size: ${({ theme }) => theme.fontSize.s30};
  }
`

const ValueManipulationContainer = styled.div`
  display: flex;
  padding-left: 20px;
  
  @media (min-width: ${({ theme }) => theme.rwd.tablet.s}) {
    flex-direction: column;
  }
`

const ChangeNumberButton = styled.button`
  position: relative;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  border-radius: 3px;
  padding: 13px;
  
  :first-of-type {
    margin-right: 16px;
    
    @media (min-width: ${({ theme }) => theme.rwd.tablet.s}) {
      margin: 0 0 8px 0;
    }
  }

  :before, :after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 3px;
    width: 10px;
    background: white;
  }

  ${(props: ButtonProps) => props.isPlusButton && css`
    :after {
      width: 3px;
      height: 10px;
    }
  `};
`

export default NumberChangerInput
