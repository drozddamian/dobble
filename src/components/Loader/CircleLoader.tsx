import React from 'react'
import styled, { keyframes } from 'styled-components'

interface Props {
  color: string;
}

const LoadingComponent: React.FC<Props> = (props: Props) => (
  <Spinner color={props.color} />
)


const spinner = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  background-color: ${(props) => props.color};
  width: 25px;
  height: 25px;
  border-radius: 50%;
  position: relative;
  animation: ${spinner} 1.4s infinite linear;
  
  :before {
    width: 50%;
    height: 50%;
    background: ${({ theme }) => theme.colors.pink};
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;  
    content: '';
  }
  
  :after {
    background-color: ${(props) => props.color};
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`


export default LoadingComponent
