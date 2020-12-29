import React from 'react'
import styled, { keyframes } from 'styled-components'
import turtle from '../../assets/icons/turtle.svg'


interface DotProps {
  timingIndex: number;
}

const LoadingBar: React.FC = () => (
  <Wrapper>
    <Turtle src={turtle} />

    <LoadingText>
      Loading

      {[...Array(3)].map((_, index) => {
        return (
          <Dot key={index} timingIndex={index + 1}>.</Dot>
        )
      })}
    </LoadingText>
  </Wrapper>
)

const loading = keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(212px);
  }
  100% {
    transform: translateX(0);
  }
`

const dotAnimation = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

export const Wrapper = styled.div`
  width: 260px;
  padding: 8px;
  display: flex;
  flex-direction: column;
`

const Turtle = styled.img`
  animation: ${loading} 3s infinite linear;
  height: 48px;
  align-self: flex-start;
  animation: ${loading} 5s infinite linear;
`

const LoadingText = styled.span`
  font-family: ${({ theme }) => theme.fonts.russo};
  align-self: center;
`

const Dot = styled.span`
  opacity: 0;
  font-family: ${({ theme }) => theme.fonts.russo};
  animation: ${dotAnimation} .5s infinite ease-out;
  animation-delay: ${(props: DotProps) => `${props.timingIndex}s`};
  :first-of-type {
    margin-left: 3px;
  }
`

export default LoadingBar
