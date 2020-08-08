import React from 'react'
import styled from 'styled-components'


interface Props {
  name: string;
  icon: string;
}

const Symbol: React.FC<Props> = (props: Props) => {
  const { name, icon } = props

  return (
    <Wrapper>
      <SymbolIcon src={icon} alt={name} />
    </Wrapper>
  )
}


export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const SymbolIcon = styled.img`
  width: 100%;
`


export default Symbol
