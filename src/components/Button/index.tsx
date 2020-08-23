import React from 'react'
import styled from 'styled-components'

interface Props {
  text: string;
}

const Button: React.FC<Props> = (props: Props) => {
  const { text } = props

  return (
    <Wrapper>
      {text}
    </Wrapper>
  )
}

const Wrapper = styled.button`

`


export default Button
